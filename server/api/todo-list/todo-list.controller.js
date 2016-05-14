'use strict';

import _ from 'lodash';
import TodoList from './todo-list.model';
import * as defaultHandlers from '../handlers';



// Gets a list of todoList
export function index(req, res) {
  return TodoList
    .find({'user' : req.user._id})
    .exec()
    .then(defaultHandlers.respondWithResult(res))
    .catch(defaultHandlers.handleError(res));
}



// Creates a new todoList in the DB.
export function create(req, res) {
  req.body.user = req.user._id;

  return TodoList
    .create(req.body)
    .then(defaultHandlers.respondWithResult(res, 201))
    .catch(defaultHandlers.handleError(res));
};



// Deletes a todoList from the DB
export function destroy(req, res) {
  return TodoList
    .findById(req.params.id)
    .exec()
    .then(defaultHandlers.handleEntityNotFound(res))
    .then(defaultHandlers.removeEntity(res))
    .catch(defaultHandlers.handleError(res));
}



// Updates an existing todoList in the DB.
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return TodoList
    .findById(req.params.id)
    .exec()
    .then(defaultHandlers.handleEntityNotFound(res))
    .then(defaultHandlers.saveUpdates(req.body))
    .then(defaultHandlers.respondWithResult(res))
    .catch(defaultHandlers.handleError(res));
};
