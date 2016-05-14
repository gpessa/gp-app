'use strict';

import _ from 'lodash';

export function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
      return entity;
    }
  };
}


export function removeEntity(res) {
  return (entity) => {
    if (entity) {
      return entity
        .remove()
        .then(() => {
          res.status(204).end();
          return entity;
        });
    }
  };
}


export function saveUpdates(updates) {
  return function(entity) {
    var updated = _.mergeWith(entity, updates, function(oldVal, newVal){
      return newVal;
    });

    return updated
      .save()
      .then(updated => {
        return updated;
      });
  };
}


export function handleEntityNotFound(res) {
  return (entity) => {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}


export function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return (err) => {
    console.log(err);
    res
      .status(statusCode)
      .send(err);
  };
}
