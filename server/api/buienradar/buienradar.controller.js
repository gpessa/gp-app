'use strict';

import _ from 'lodash';
import request from 'request';

function parseResponse(response){
  var result = {};
  result.data = [];

  response = response.split(/\n/);

  response.forEach((r) => {
    r = r.trim().split('|');

    if(r[1]){
      let rainfall = parseFloat(r[0]);
      let label = r[1];
      rainfall = Math.pow(10, ((rainfall -109) / 32)) ;

      result.data.push({
        'time' : label,
        'rainfall' : rainfall
      })
    }
  });

  return result;
}

// Gets a list of Cigarettes
exports.index = function(req, res) {
  var urlrequest = "http://gps.buienradar.nl/getrr.php?lat=" + req.body.lat + "&lon=" + req.body.lon;

  request({
    json:false,
    url: urlrequest, //URL to hit
    method: 'GET'
  }, function(error, response, body){

    if(error)
      res.status(404).send({
        'message' : 'Service not available'
      });

    response.body = parseResponse(response.body);
    res.status(response.statusCode).json(response.body);
  });
};
