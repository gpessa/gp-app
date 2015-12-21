/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/cigarettes              ->  index
 * POST    /api/cigarettes              ->  create
 * GET     /api/cigarettes/:id          ->  show
 * PUT     /api/cigarettes/:id          ->  update
 * DELETE  /api/cigarettes/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var request = require('request');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

// Gets a list of Cigarettes
exports.index = function(req, res) {
  var urlrequest = "http://gps.buienradar.nl/getrr.php?lat=" + req.body.params.lat + "&lon=" + req.body.params.lon;

  request({
    json:false,
    url: urlrequest, //URL to hit
    method: 'GET'
  }, function(error, response, body){
    var labels =[];
    var rainfalls = [];

    var result = response.body.split(/\n/);

    _.each(result, function(element){
      var element = element.trim().split('|');

      if(element[1]){
        var rainfall = parseFloat(element[0]);
        var label = element[1];

        rainfall = Math.pow(10, ((rainfall -109) / 32)) ;

        labels.push( label );
        rainfalls.push( rainfall );
      }
    });

    res.status(response.statusCode).json({
      "rainfalls": rainfalls,
      "labels": labels
    });

  });

};

