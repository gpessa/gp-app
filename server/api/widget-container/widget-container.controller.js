/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/widget-containers              ->  index
 * POST    /api/widget-containers              ->  create
 * GET     /api/widget-containers/:id          ->  show
 * PUT     /api/widget-containers/:id          ->  update
 * DELETE  /api/widget-containers/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var WidgetContainer = require('./widget-container.model');

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

// Gets a list of WidgetContainers
exports.index = function(req, res) {
  WidgetContainer.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single WidgetContainer from the DB
exports.show = function(req, res) {
  WidgetContainer.findById(req.params.id)
                 .populate('widgets')
                 .execAsync()
                 .then(handleEntityNotFound(res))
                 .then(responseWithResult(res))
                 .catch(handleError(res));
};

// Creates a new WidgetContainer in the DB
exports.create = function(req, res) {
  WidgetContainer.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing WidgetContainer in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  
  WidgetContainer.findById(req.params.id)
                 .populate('widgets')
                 .execAsync()
                 .then(handleEntityNotFound(res))
                 .then(saveUpdates(req.body))
                 .then(responseWithResult(res))
                 .catch(handleError(res));
};

// Deletes a WidgetContainer from the DB
exports.destroy = function(req, res) {
  WidgetContainer.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
