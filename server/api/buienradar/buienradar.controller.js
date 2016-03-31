'use strict';

import _ from 'lodash';
var request = require('request');

function parseResponse(response){
  var labels =[];
  var rainfalls = [];

  var results = response.split(/\n/);

  results.forEach((result) => {
    result = result.trim().split('|');

    if(result[1]){
      let rainfall = parseFloat(result[0]);
      let label = result[1];

      rainfall = Math.pow(10, ((rainfall -109) / 32)) ;

      labels.push( label );
      rainfalls.push( rainfall );
    }
  });

  return {
    rainfalls,
    labels
  }
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
