'use strict';

import _ from 'lodash';
import config from '../../config/environment';
import Stock from './stock.model';
import yahooFinance from 'yahoo-finance';



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
    // var updated = _.merge(entity, updates);
    entity.transactions = updates.transactions;
    var updated = entity;

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

function responseWithDecoratedResult(res, statusCode){
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {

      var SYMBOLS = entity.map(function(stock){
        return stock.symbol
      })

      var FIELDS = _.flatten([
        ['a', 'b', 'b2', 'b3', 'p', 'o'], // Pricing
        ['y', 'd', 'r1', 'q'], // Dividends
        ['c1', 'c', 'c6', 'k2', 'p2', 'd1', 'd2', 't1'], // Date
        ['c8', 'c3', 'g', 'h', 'k1', 'l', 'l1', 't8', 'm5', 'm6', 'm7', 'm8', 'm3', 'm4'], // Averages
        ['i', 'j1', 'j3', 'f6', 'n', 'n4', 's1', 'x', 'j2'], // System
        ['v', 'a5', 'b6', 'k3', 'a2'], // Volume
        ['e', 'e7', 'e8', 'e9', 'b4', 'j4', 'p5', 'p6', 'r', 'r2', 'r5', 'r6', 'r7', 's7'], // Ratio
        ['t7', 't6', 'i5', 'l2', 'l3', 'v1', 'v7', 's6', 'e1'] // Misc
      ]);

      yahooFinance.snapshot({
        fields: FIELDS,
        symbols: SYMBOLS
      }, function (err, result) {
        if (err) {
          res.status(404).send({
            'message' : 'Service not available'
          });
        } else {

          entity = entity.map(function(stock, index){
            stock = stock.toObject();
            stock.data = result[index];
            return stock;
          })

          res.status(200).json(entity);
        }
      });
    }
  };
}

// Gets a list of Stocks
export function index(req, res) {
  Stock.findAsync({
      'user' : req.user._id
    })
    .then(responseWithDecoratedResult(res))
    .catch(handleError(res));
}

// Gets a single Stock from the DB
export function show(req, res) {
  Stock.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Stock in the DB
export function create(req, res) {
  req.body.user = req.user._id;

  Stock.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Stock in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  Stock.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Stock from the DB
export function destroy(req, res) {
  Stock.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
