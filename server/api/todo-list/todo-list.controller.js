'use strict';

var _ = require('lodash');
var TodoList = require('./todo-list.model');

// Get list of todoLists
exports.index = function(req, res) {
  TodoList.find({}).sort('-date').exec(function (err, todoLists) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(todoLists);
  });
};

// Get a single todoList
exports.show = function(req, res) {
  TodoList.findById(req.params.id, function (err, todoList) {
    if(err) { return handleError(res, err); }
    if(!todoList) { return res.status(404).send('Not Found'); }
    return res.json(todoList);
  });
};

// Creates a new todoList in the DB.
exports.create = function(req, res) {
  req.body.lastupdate = new Date();
  TodoList.create(req.body, function(err, todoList) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(todoList);
  });
};

// Updates an existing todoList in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  TodoList.findById(req.params.id, function (err, todoList) {
    if (err) { return handleError(res, err); }
    if(!todoList) { return res.status(404).send('Not Found'); }

    // var updated = _.merge(todoList, req.body);
    todoList.name = req.body.name;
    todoList.list = req.body.list;
    todoList.lastupdate = new Date();

    todoList.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(todoList);
    });
  });
};

// Deletes a todoList from the DB.
exports.destroy = function(req, res) {
  TodoList.findById(req.params.id, function (err, todoList) {
    if(err) { return handleError(res, err); }
    if(!todoList) { return res.status(404).send('Not Found'); }
    todoList.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
