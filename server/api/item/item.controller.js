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

  var toupdate = [];

  req.body.children = req.body.children.map(function(child){
    if(child._id){
      toupdate.push(child);
      return child._id;
    } else {
      child = new Item(child);
      child.save();
      return child._id;
    }
  });

  var update = function(child){
    return Item
      .findOneAndUpdate({
          '_id' : child._id
        }, child ,{
          'new' : true,   // return new doc if one is upserted
          'upsert' : true // insert the document if it does not exist
      })
  };

  var actions = toupdate.map(update);
  var results = Promise.all(actions);

  results.then(data =>{
      return Item
        .findOneAndUpdate({
            '_id' : req.body._id
          }, req.body ,{
            'new' : true,   // return new doc if one is upserted
            'upsert' : true // insert the document if it does not exist
        })
        .exec(function(err, model){
          if (err){
            res.status(500).send(err);
          } else{
            res.status(200).send(model);
          }
        });
  });
}

// Deletes a Item from the DB
export function destroy(req, res) {
  return Item
    .findOne({ '_id': req.params._id })
    .then(defaultHandlers.handleEntityNotFound(res))
    .then(defaultHandlers.removeEntity(res))
    .catch(defaultHandlers.handleError(res));
}
