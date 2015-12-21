/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/cigarettes              ->  index
 * POST    /api/cigarettes              ->  create
 * GET     /api/cigarettes/:id          ->  show
 * PUT     /api/cigarettes/:id          ->  update
 * DELETE  /api/cigarettes/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Cigarette = require('./cigarette.model');

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
    var updated = _.merge(entity, updates);
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

// Gets a list of Cigarettes
exports.index = function(req, res) {
  var end = new Date();
  var start = new Date(end.getTime() - (60*60*24*7*1000));

  Cigarette.aggregate([
    {
        "$match": {
            "date": {
                "$gt": start,
                "$lt": end
            }
        }
    }, {
        "$project": {
            "date": "$date",
            "_id": 0,
            "h": {
                "$hour": "$date"
            },
            "m": {
                "$minute": "$date"
            },
            "s": {
                "$second": "$date"
            },
            "ml": {
                "$millisecond": "$date"
            }
        }
    }, {
        "$project": {
            "date": {
                "$subtract": [
                    "$date", {
                        "$add": [
                            "$ml", {
                                "$multiply": [
                                    "$s",
                                    1000
                                ]
                            }, {
                                "$multiply": [
                                    "$m",
                                    60,
                                    1000
                                ]
                            }, {
                                "$multiply": [
                                    "$h",
                                    60,
                                    60,
                                    1000
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    }, {
        "$group": {
            "_id": "$date",
            "count": {
                "$sum": 1
            }
        }
    }, {
        "$sort": {
            "_id": -1
        }
    }
  ], function (err, result) {
    if(err) { return handleError(res, err); }
    if(!result) { return res.status(404).send('Not Found'); }
    return res.json(result);
  })


};

// Gets a single Cigarette from the DB
exports.show = function(req, res) {
  Cigarette.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Cigarette in the DB
exports.create = function(req, res) {
  Cigarette.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Cigarette in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Cigarette.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Cigarette from the DB
exports.destroy = function(req, res) {
  Cigarette.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
