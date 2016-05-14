'use strict';

import _ from 'lodash';
import WithingsService from './withings.service';


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

      measures = _.map(measures, function(measure) {
        measure.date = new Date(new Date(measure.date * 1000).toString().substring(0,15));
        return measure;
      });

      var endDate = _.first(measures).date;
      var startDate = _.last(measures).date;

      while (startDate.valueOf() <= endDate.valueOf()){
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

      res.status(200).json(result);

    })
    .catch(function(){
      res.status(404).send({
        'message' : 'Service not available'
      });
    });

  } else {
    res.status(412).send({
      'message' : 'Withings account not configured'
    });
  }
};
