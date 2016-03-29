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


function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity.toObject());
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {

    var updated = _.merge(entity, updates, function(oldVal, newVal, key){
      if(key == 'children'){

        newVal = newVal.map(function(item){
          if(!item._id){
            var item = new Item(item);
            item.save();
          }

          return item;
        })
      }
      return newVal;
    });

    return updated
      .saveAsync()
      .spread(function(updated) {
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

function handleEntityNotFoundCreateOne(req, res) {
  return function(entity) {
    if (!entity) {
      req.body = {
        '_id' : req.params._id
      }
      exports.create(req, res);
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

// Gets a list of Items
export function index(req, res) {
  Item.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Item from the DB
export function show(req, res) {
  var _id = req.params._id ? new mongoose.mongo.ObjectID(req.params._id) : undefined;

  Item
    .findOne({
      '_id': _id
    })
    .populate('children')
    .execAsync()
    .then(handleEntityNotFoundCreateOne(req, res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Item in the DB
export function create(req, res) {
  Item
    .createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Item in the DB
export function update(req, res) {
  var _id = req.params._id ? new mongoose.mongo.ObjectID(req.params._id) : undefined;

  if (req.body._id) {
    delete req.body._id;
  }
  Item
    .findOne({
      '_id': _id
    })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(function(){
      exports.show(req, res);
    })
}

// Deletes a Item from the DB
export function destroy(req, res) {
  var _id = req.params._id ? new mongoose.mongo.ObjectID(req.params._id) : undefined;

  Item
    .findOne({
      '_id': _id
    })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
