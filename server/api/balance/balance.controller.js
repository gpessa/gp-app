/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/balances              ->  index
 * POST    /api/balances              ->  create
 * GET     /api/balances/:id          ->  show
 * PUT     /api/balances/:id          ->  update
 * DELETE  /api/balances/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Balance = require('./balance.model');

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
    updated.reports =  updates.reports;

    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

// Gets a list of Balances
export function index(req, res) {
  Balance.findOne({
      'user' : req.user._id
    })
    .then(handleEntityNotFoundCreateOne(req, res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Balance in the DB
export function create(req, res) {
  req.body.user = req.user._id;
  
  Balance.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Balance in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Balance.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}
