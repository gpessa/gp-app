/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/forecasts              ->  index
 * POST    /api/forecasts              ->  create
 * GET     /api/forecasts/:id          ->  show
 * PUT     /api/forecasts/:id          ->  update
 * DELETE  /api/forecasts/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import config from '../../config/environment';
import Forecast from 'forecast';
import Geocoder from 'geocoder';


var forecast = new Forecast({
  service: 'forecast.io',
  key: config.forecast.clientSecret,
  units: 'celcius', // Only the first letter is parsed
  cache: true,      // Cache API requests?
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
    minutes: 27,
    seconds: 45
    }
});

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Forecasts
export function index(req, res) {
  Geocoder.reverseGeocode(req.body.lat, req.body.lon, function ( err, data ) {
    var city = data.results[4].formatted_address;

    forecast.get([req.body.lat, req.body.lon], function(err, weather) {
      if(err) res.status(500).send(err);

      weather.city = city;
      res.status(200).json(weather);
    });

  });
}
