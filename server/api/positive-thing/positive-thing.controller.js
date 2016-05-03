/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/positive-things              ->  index
 * POST    /api/positive-things              ->  create
 * GET     /api/positive-things/:id          ->  show
 * PUT     /api/positive-things/:id          ->  update
 * DELETE  /api/positive-things/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import PositiveThing from './positive-thing.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.extend(entity, updates);
    console.log(updates);
    console.log(entity);

    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
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

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of PositiveThings
export function index(req, res) {
  var limit = req.params.limit || 5;

  PositiveThing.find()
    .limit(limit)
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single PositiveThing from the DB
export function show(req, res) {
  PositiveThing.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new PositiveThing in the DB
export function create(req, res) {
  PositiveThing.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing PositiveThing in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  PositiveThing.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a PositiveThing from the DB
export function destroy(req, res) {
  PositiveThing.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
