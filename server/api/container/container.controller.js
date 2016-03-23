/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/containers              ->  index
 * POST    /api/containers              ->  create
 * GET     /api/containers/:id          ->  show
 * PUT     /api/containers/:id          ->  update
 * DELETE  /api/containers/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Container = require('./container.model');
var Widget = require('../widget/widget.model');
var mongoose = require('mongoose');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
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

function saveUpdates(updates) {
  return function(entity) {
    entity.children = updates.children;
    entity.dimension = updates.dimension;

    return entity
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
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity.toObject());
    }
  };
}

// Creates a new Container in the DB
exports.create = function(req, res) {
  req.body.user = req.user._id;
  
  Container
    .createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Gets a single Container from the DB
exports.show = function(req, res) {
  var _id = req.params._id ? new mongoose.mongo.ObjectID(req.params._id) : undefined;

  Container
    .findOne({
      'user' : req.user,
      '_id': _id
    })
    .populate('children')
    .execAsync()
    .then(handleEntityNotFoundCreateOne(req, res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Updates an existing Container in the DB
exports.update = function(req, res) {
  var _id = req.params._id ? new mongoose.mongo.ObjectID(req.params._id) : undefined;

  Container
    .findOne({
      'user' : req.user,
      '_id': _id
    })
    .execAsync()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(function(){
      exports.show(req, res);
    })
};

// Deletes a Container from the DB
exports.destroy = function(req, res) {
  var _id = req.params._id ? new mongoose.mongo.ObjectID(req.params._id) : undefined;

  Container
    .findOne({
      'user' : req.user,
      '_id': _id
    })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
