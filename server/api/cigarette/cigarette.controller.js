/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/cigarettes              ->  index
 * POST    /api/cigarettes              ->  create
 * GET     /api/cigarettes/:id          ->  show
 * PUT     /api/cigarettes/:id          ->  update
 * DELETE  /api/cigarettes/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import * as defaultHandlers from '../handlers';
import Cigarette from './cigarette.model';

function handleEntityNotFoundCreateOne(req, res) {
  return function(entity) {
    if (!entity) {
      exports.create(req, res);
    }
    return entity;
  };
}


function smokeCigarette(updates) {
  return function(entity) {
    var date = new Date(new Date().setHours(0,0,0,0));
    var dateItem = _.find(entity.days , function(o) {
      return o.date.toString() === date.toString();
    });

    if (dateItem){
      var index = entity.days.indexOf(dateItem);
      entity.days[index].count += 1;
    } else {
      entity.days.unshift({
        'date' : date,
        'count'  : 1
      });
    }

    return entity
      .save()
      .then(updated => {
        return updated;
      });
  }
}


function reorder(){
  return function(entity){
    var e = entity.toObject();
    e.days.sort(function(m1, m2) {
      return m1.date < m2.date;
    });
    return e;
  }
}


// Gets a list of Cigarettes
export function index(req, res) {
  return Cigarette
    .findOne({'user' : req.user._id})
    .then(handleEntityNotFoundCreateOne(req, res))
    .then(defaultHandlers.respondWithResult(res))
    .catch(defaultHandlers.handleError(res));
};



// Creates a new Cigarette in the DB
export function create(req, res) {
  req.body.user = req.user._id;
  req.body.days = [];

  return Cigarette
    .create(req.body)
    .then(defaultHandlers.respondWithResult(res, 201))
    .catch(defaultHandlers.handleError(res));
}


// Gets a single Cigarette from the DB
export function smoke(req, res) {
  return Cigarette
    .findById(req.params.id)
    .then(defaultHandlers.handleEntityNotFound(res))
    .then(smokeCigarette(res))
    .then(defaultHandlers.respondWithResult(res))
    .catch(defaultHandlers.handleError(res));
};
