/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pages              ->  index
 * POST    /api/pages              ->  create
 * GET     /api/pages/:id          ->  show
 * PUT     /api/pages/:id          ->  update
 * DELETE  /api/pages/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Page from './page.model';
import Item from '../item/item.model';
import * as defaultHandlers from '../handlers';

function handleEntityNotFoundCreateOne(req, res) {
  return function(entity) {
    if (!entity) {
      exports.create(req, res);
    }
    return entity;
  };
}

// Gets a list of Pages
export function index(req, res) {
  return Page
    .find()
    .exec()
    .then(defaultHandlers.respondWithResult(res))
    .catch(defaultHandlers.handleError(res));
}

// Gets a single Page from the DB
export function show(req, res) {
  return Page
    .findOne({
      'user' : req.user
    })
    .populate('pages.child')
    .exec()
    .then(handleEntityNotFoundCreateOne(req, res))
    .then(defaultHandlers.respondWithResult(res))
    .catch(defaultHandlers.handleError(res));
}

// Creates a new Page in the DB
export function create(req, res) {
  req.body.user = req.user._id;

  return Page
    .create(req.body)
    .then(defaultHandlers.respondWithResult(res, 201))
    .catch(defaultHandlers.handleError(res));
}

// Updates an existing Page in the DB
export function update(req, res) {
  return Page
    .findById(req.params.id)
    .exec()
    .then(defaultHandlers.handleEntityNotFound(res))
    .then(defaultHandlers.saveUpdates(req.body))
    .then(defaultHandlers.respondWithResult(res))
    .catch(defaultHandlers.handleError(res));
}

// Deletes a Page from the DB
export function destroy(req, res) {
  return Page
    .findById(req.params.id)
    .exec()
    .then(defaultHandlers.handleEntityNotFound(res))
    .then(defaultHandlers.removeEntity(res))
    .catch(defaultHandlers.handleError(res));
}
