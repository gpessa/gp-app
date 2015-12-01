'use strict';

var _ = require('lodash');
var ShoppingList = require('./shopping-list.model');

// Get list of shoppinglists
exports.index = function(req, res) {
  ShoppingList.find({}).sort('-date').exec(function (err, shoppinglists) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(shoppinglists);
  });
};

// Get a single shoppinglist
exports.show = function(req, res) {
  ShoppingList.findById(req.params.id, function (err, shoppinglist) {
    if(err) { return handleError(res, err); }
    if(!shoppinglist) { return res.status(404).send('Not Found'); }
    return res.json(shoppinglist);
  });
};

// Creates a new shoppinglist in the DB.
exports.create = function(req, res) {
  req.body.lastupdate = new Date();
  ShoppingList.create(req.body, function(err, shoppinglist) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(shoppinglist);
  });
};

// Updates an existing shoppinglist in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ShoppingList.findById(req.params.id, function (err, shoppinglist) {
    if (err) { return handleError(res, err); }
    if(!shoppinglist) { return res.status(404).send('Not Found'); }

    // var updated = _.merge(shoppinglist, req.body);
    shoppinglist.name = req.body.name;
    shoppinglist.list = req.body.list;
    shoppinglist.lastupdate = new Date();

    shoppinglist.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(shoppinglist);
    });
  });
};

// Deletes a shoppinglist from the DB.
exports.destroy = function(req, res) {
  ShoppingList.findById(req.params.id, function (err, shoppinglist) {
    if(err) { return handleError(res, err); }
    if(!shoppinglist) { return res.status(404).send('Not Found'); }
    shoppinglist.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}