/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pages              ->  index
 * POST    /api/pages              ->  create
 * GET     /api/pages/:id          ->  show
 * PUT     /api/pages/:id          ->  update
 * DELETE  /api/pages/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Page from './page.model';
import Item from '../item/item.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {

    var updated = _.merge(entity, updates, function(oldVal, newVal, key){
      return newVal;
    });

    updated.pages.forEach(function(page){
      var id = page.title.toLowerCase().replace(/ /g,"-");
      page.set('id', id);
      if(!page.child){
        var item = new Item({
          'type' : 'container',
          'subtype' : 'base',
          'children' : []
        });
        item.save();
        page.set('child', item._id);
      }
    })

    return updated.saveAsync()
      .spread(updated => {
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

// Gets a single Page from the DB
export function show(req, res) {
  Page
    .findOne({
      'user' : req.user
    })
    .populate('pages.child')
    .execAsync()
    .then(handleEntityNotFoundCreateOne(req, res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Page in the DB
export function create(req, res) {
  req.body.user = req.user._id;

  Page
    .createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Page in the DB
export function update(req, res) {
  console.log(req.params.id);

  Page
    .findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Page from the DB
export function destroy(req, res) {
  Page.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
