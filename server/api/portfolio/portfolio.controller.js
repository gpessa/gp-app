/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/portfolios              ->  index
 * POST    /api/portfolios              ->  create
 * GET     /api/portfolios/:id          ->  show
 * PUT     /api/portfolios/:id          ->  update
 * DELETE  /api/portfolios/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Portfolio = require('./portfolio.model');
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

function responseWithDecoratedResult(res, statusCode){
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {

      var transactions = _.flattenDeep(entity.map(function(portfolio){
        return portfolio.transactions;
      }));

      var SYMBOLS = _.uniq(transactions.map(function(transaction){
        return transaction.symbol;
      }));

      var FIELDS = _.flatten(['b']);

      yahooFinance.snapshot({
        fields: FIELDS,
        symbols: SYMBOLS
      }, function (err, result) {
        if (err) {
          res.status(404).send({
            'message' : 'Service not available'
          });
        } else {

          var portfolios = Array.prototype.slice.call(entity);

          portfolios = entity.map(function(portfolio, index){

            portfolio.transactions = portfolio.transactions.map(function(transaction){
              transaction = transaction.toObject();
              var symbol = transaction.symbol;
              var price = _.filter(result, {'symbol' : symbol})[0].bid;
              transaction.value = price;
              transaction.date = new Date(transaction.date);

              console.log(typeof transaction.date);

              return transaction;
            });

            return portfolio;
          });

          res.status(200).json(portfolios);
        }
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

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    updated.transactions =  updates.transactions;

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

// Gets a list of Portfolios
export function index(req, res) {
  Portfolio.findAsync()
    .then(responseWithDecoratedResult(res))
    .catch(handleError(res));
}

// Gets a single Portfolio from the DB
export function show(req, res) {
  Portfolio.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Portfolio in the DB
export function create(req, res) {
  Portfolio.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Portfolio in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Portfolio.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Portfolio from the DB
export function destroy(req, res) {
  Portfolio.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
