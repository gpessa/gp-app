/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ShoppingList = require('./shopping-list.model');

exports.register = function(socket) {
  ShoppingList.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ShoppingList.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('shopping-list:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('shopping-list:remove', doc);
}