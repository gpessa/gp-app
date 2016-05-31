/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/items              ->  index
 * POST    /api/items              ->  create
 * GET     /api/items/:id          ->  show
 * PUT     /api/items/:id          ->  update
 * DELETE  /api/items/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Item from './item.model';
import mongoose from 'mongoose';
import * as defaultHandlers from '../handlers';

// Gets a list of Items
export function index(req, res) {
  return Item
    .find()
    .then(defaultHandlers.respondWithResult(res))
    .catch(defaultHandlers.handleError(res));
}

// Gets a single Item from the DB
export function show(req, res) {
  return Item
    .findOne({ '_id': req.params._id })
    .exec()
    .then(defaultHandlers.handleEntityNotFound(req, res))
    .then(defaultHandlers.respondWithResult(res))
    .catch(defaultHandlers.handleError(res));
}

// Creates a new Item in the DB
export function create(req, res) {
  return Item
    .create(req.body)
    .then(defaultHandlers.respondWithResult(res, 201))
    .catch(defaultHandlers.handleError(res));
}

// Updates an existing Item in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Item
    .findOne({ '_id': req.params._id })
    .then(defaultHandlers.handleEntityNotFound(res))
    .then(defaultHandlers.saveUpdates(req.body))
    .then(defaultHandlers.respondWithResult(res))
}

// Deletes a Item from the DB
export function destroy(req, res) {
  return Item
    .findOne({ '_id': req.params._id })
    .then(defaultHandlers.handleEntityNotFound(res))
    .then(defaultHandlers.removeEntity(res))
    .catch(defaultHandlers.handleError(res));
}
