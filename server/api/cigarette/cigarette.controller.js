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
var Cigarette = require('./cigarette.model');

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

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleEntityNotFoundCreateOne(req, res) {
  return function(entity) {
    if (!entity) {
      exports.create(req, res);
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function addCigarette() {
  return function(entity) {
    var updates =  _.clone(entity.toObject());
    var date = new Date(new Date().setHours(0,0,0,0));
    var dateItem = _.find(updates.days , function(o) { return o.date.toString() === date.toString(); });


    if (dateItem){
      var index = updates.days.indexOf(dateItem);
      updates.days[index].count = updates.days[index].count + 1;
    } else {
      updates.days.push({
        'date' : date,
        'count'  : 1
      });
    }

    var updated = _.merge(entity, updates);

    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

// Gets a list of Cigarettes
exports.index = function(req, res) {
  Cigarette.findOne({
      'user' : req.user._id
    })
    .then(handleEntityNotFoundCreateOne(req, res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};



// Creates a new Cigarette in the DB
export function create(req, res) {
  req.body = {
    'user' : req.user._id,
    'days' : []
  }

  Cigarette
    .createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}


// Gets a single Cigarette from the DB
exports.smoke = function(req, res) {
  Cigarette.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(addCigarette(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};
