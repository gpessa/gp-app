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
      var FIELDS = ['n', 'c6', 'c1', 'c', 'p2', 'b', 'v', 'a2', 't1', 'g', 'h', 'b3'];
      var SYMBOLS = entity.map((stock) => { return stock.symbol; })
                          .filter((stock) => { return stock != undefined; });

      if(SYMBOLS.length == 0){
        res.status(200).json(entity);
        return null;
      }

      yahooFinance.snapshot({
        fields: FIELDS,
        symbols: SYMBOLS
      }, function (err, result) {

        if(!result){
          res.status(404).json({
            'message' : 'Service not available'
          });
          return null;
        }

        entity = entity.map(function(stock, index){
          stock = stock.toObject();
          stock.data = result.find(function(s){
            return s.symbol == stock.symbol;
          });
          return stock;
        })

        res.status(200).json(entity);
      });

    }
  };
}

// Gets a list of Stocks
export function index(req, res) {
  Stock
    .findAsync({
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
