'use strict';

var WithingsService = require('./withings.service');
var _ = require('lodash');



var getMeasure = function(measures, type) {
    var result = _.filter(measures.measures, {
        "type": type
    });

    if (result.length) {
        result = result[0].value * Math.pow(10, result[0].unit);
        result = _.floor(result, 2);
    } else {
        result = undefined;
    }
    return result;
}

var getLastUpdateDate = function() {
    var start = new Date();
    start.setDate(start.getDate() - 180);
    return start.getTime() / 1000
}



// Get list of withings/measures
exports.index = function(req, res) {
  if(req.user.withings){

    WithingsService.getData({
      "oauth_token" : req.user.withings.accessToken,
      "userid" : req.user.withings.id,
      "refresh_token" : req.user.withings.refreshToken
    })
    .then(function(r){

      var measures = r.body.measuregrps;

      var result = {
        measures : {
          weights : [],
          fats : []
        },
        labels : []
      };

      _.forEach(measures, function(measure) {
        var date = new Date(measure.date * 1000);
        date.setHours(0);
        date.setSeconds(0);
        date.setMinutes(0);

        measure.date = date;
      });


      var endDate = measures[0].date;
      var startDate = measures[measures.length - 1].date;

      while (startDate.valueOf() !== endDate.valueOf()){
        result.labels.push( new Date(startDate.valueOf()) );

        var measure = _.filter(measures, {date : startDate});

        if(measure.length){
          var weight = getMeasure(measure[0], 1);
          result.measures.weights.push(weight);

          var fat = getMeasure(measure[0], 8);
          result.measures.fats.push(fat);
        } else {
          result.measures.weights.push(undefined);
          result.measures.fats.push(undefined);
        }

        startDate.setDate(startDate.getDate() + 1);
      }


      // var prev = result.measures.weights[0];
      // _.forEach(result.measures.weights, function(measure, index) {
      //   var prevTemp = result.measures.weights[index - 1];
      //   var actual = measure;

      //     result.measures.weights[index] = (measure + prev) / 2;
          
      // })

      res.status(200).json(result);

    })

  }
};


