'use strict';

import _ from 'lodash';
import WithingsService from './withings.service';


var getMeasure = function(measures, type) {
    var result = _.filter(measures, {"type": type});
    if (result.length) {
        result = result[0].value * Math.pow(10, result[0].unit);
        result = _.floor(result, 2);
    } else {
        result = undefined;
    }
    return result;
}


// Get list of withings/measures
exports.index = function(req, res) {
  if(req.user.withings){

    WithingsService.getData({
      "oauth_token" : req.user.withings.accessToken,
      "userid" : req.user.withings.id,
      "refresh_token" : req.user.withings.refreshToken
    }, req.params.limit)
    .then(function(r){
      r.body.measuregrps = _.map(r.body.measuregrps, function(measure) {
        measure.date = new Date(new Date(measure.date * 1000).toString().substring(0,15));
        measure.weight = getMeasure(measure.measures, 1);
        measure.fat = getMeasure(measure.measures, 8);
        return measure;
      });

      r.body.min = {
        'weight' : _.minBy(r.body.measuregrps, function(o) { return o.weight; }),
        'fat' : _.minBy(r.body.measuregrps, function(o) { return o.fat; })
      }

      r.body.max = {
        'weight' : _.maxBy(r.body.measuregrps, function(o) { return o.weight; }),
        'fat' : _.maxBy(r.body.measuregrps, function(o) { return o.fat; })
      }

      res.status(200).json(r.body);
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
