/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/widgets              ->  index
 * POST    /api/widgets              ->  create
 * GET     /api/widgets/:id          ->  show
 * PUT     /api/widgets/:id          ->  update
 * DELETE  /api/widgets/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Widget = require('./widget.model');

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

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.extend(entity, updates);
    return updated.saveAsync()
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

// Gets a list of Widgets
exports.index = function(req, res) {
  Widget.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Widget from the DB
exports.show = function(req, res) {
  Widget.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Widget in the DB
exports.create = function(req, res) {
  Widget.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Widget in the DB
exports.update = function(req, res) {
  Widget.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Widget from the DB
exports.destroy = function(req, res) {
  Widget.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
