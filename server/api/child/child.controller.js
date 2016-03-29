/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/childs              ->  index
 * POST    /api/childs              ->  create
 * GET     /api/childs/:id          ->  show
 * PUT     /api/childs/:id          ->  update
 * DELETE  /api/childs/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Child from './child.model';
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

    console.log(entity);
    console.log(updates);

    var updated = _.merge(entity, updates, function(oldVal, newVal, key){
      if(key == 'children'){

        newVal = newVal.map(function(child){
          if(!child._id){
            var child = new Child(child);
            child.save();
          }
          console.log('child');
          console.log(child);


          return child;
        })
      }
      return newVal;
    });

    console.log(updated);

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
      console.log('handleEntityNotFound');
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

// Gets a list of Childs
export function index(req, res) {
  Child.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Child from the DB
export function show(req, res) {
  var _id = req.params._id ? new mongoose.mongo.ObjectID(req.params._id) : undefined;

  Child
    .findOne({
      '_id': _id
    })
    .populate('children')
    .execAsync()
    .then(handleEntityNotFoundCreateOne(req, res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Child in the DB
export function create(req, res) {
  Child
    .createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Child in the DB
export function update(req, res) {
  var _id = req.params._id ? new mongoose.mongo.ObjectID(req.params._id) : undefined;

  console.log(_id);

  if (req.body._id) {
    delete req.body._id;
  }
  Child
    .findOne({
      '_id': _id
    })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(function(){
      exports.show(req, res);
    })
}

// Deletes a Child from the DB
export function destroy(req, res) {
  var _id = req.params._id ? new mongoose.mongo.ObjectID(req.params._id) : undefined;

  Child
    .findOne({
      '_id': _id
    })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
