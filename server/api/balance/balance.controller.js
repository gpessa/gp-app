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
import * as defaultHandlers from '../handlers';
import Balance from './balance.model';

function handleEntityNotFoundCreateOne(req, res) {
  return function(entity) {
    if (!entity) {
      exports.create(req, res);
    }
    return entity;
  };
}


// Gets a list of Balances
export function index(req, res) {
  return Balance
    .findOne({'user' : req.user._id})
    .then(handleEntityNotFoundCreateOne(req, res))
    .then(defaultHandlers.respondWithResult(res))
    .catch(defaultHandlers.handleError(res));
}


// Creates a new Balance in the DB
export function create(req, res) {
  req.body.user = req.user._id;

  return Balance
    .create(req.body)
    .then(defaultHandlers.respondWithResult(res, 201))
    .catch(defaultHandlers.handleError(res));
}


// Updates an existing Balance in the DB
export function update(req, res) {
  return Balance
    .findOneAndUpdate({
        '_id' : req.body._id
      }, req.body ,{
        'new' : true,   // return new doc if one is upserted
        'upsert' : true // insert the document if it does not exist
    })
    .then(function(model){
      res.status(200).send(model);
      return model;
    })

  // if (req.body._id) {
  //   delete req.body._id;
  // }
  // return Balance
  //   .findById(req.params.id)
  //   .then(defaultHandlers.handleEntityNotFound(res))
  //   .then(defaultHandlers.saveUpdates(req.body))
  //   .then(defaultHandlers.respondWithResult(res))
  //   .catch(defaultHandlers.handleError(res));
}
