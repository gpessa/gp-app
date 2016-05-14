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
import * as defaultHandlers from '../handlers';
import PositiveThing from './positive-thing.model';


// Gets a list of PositiveThings
export function index(req, res) {
  var limit = req.params.limit || 5;

  return PositiveThing
    .find()
    .limit(limit)
    .then(defaultHandlers.respondWithResult(res))
    .catch(defaultHandlers.handleError(res));
}

// Gets a single PositiveThing from the DB
export function show(req, res) {
  return PositiveThing
    .findById(req.params.id)
    .then(defaultHandlers.handleEntityNotFound(res))
    .then(defaultHandlers.respondWithResult(res))
    .catch(defaultHandlers.handleError(res));
}

// Creates a new PositiveThing in the DB
export function create(req, res) {
  return PositiveThing
    .create(req.body)
    .then(defaultHandlers.respondWithResult(res, 201))
    .catch(defaultHandlers.handleError(res));
}

// Updates an existing PositiveThing in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return PositiveThing
    .findById(req.params.id)
    .then(defaultHandlers.handleEntityNotFound(res))
    .then(defaultHandlers.saveUpdates(req.body))
    .then(defaultHandlers.respondWithResult(res))
    .catch(defaultHandlers.handleError(res));
}

// Deletes a PositiveThing from the DB
export function destroy(req, res) {
  return PositiveThing
    .findById(req.params.id)
    .then(defaultHandlers.handleEntityNotFound(res))
    .then(defaultHandlers.removeEntity(res))
    .catch(defaultHandlers.handleError(res));
}
