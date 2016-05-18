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
import yahooFinance from 'yahoo-finance';
import Portfolio from './portfolio.model';
import * as defaultHandlers from '../handlers';


function responseWithDecoratedResult(res, statusCode){
  return function(portfolios) {
    if (portfolios.length) {

      var transactions = _.flattenDeep(portfolios.map(function(portfolio){
        return portfolio.transactions;
      }));

      var SYMBOLS = _.uniq(transactions.map(function(transaction){
        return transaction.symbol;
      }));

      var FIELDS = ['b'];

      if(SYMBOLS.length){

        yahooFinance.snapshot({
          fields: FIELDS,
          symbols: SYMBOLS
        }, function (err, result) {
          if (err) {
            res.status(404).send({
              'message' : 'Service not available'
            });
          } else {
            portfolios = portfolios.map(function(portfolio, index){

              portfolio.transactions = portfolio.transactions.map(function(transaction){
                var marketprice = _.filter(result, {'symbol' : transaction.symbol})[0].bid;
                var value  = (transaction.sellprice || marketprice);
                var total  = (transaction.operation === 'sell') ? 0 : (value * transaction.quantity);
                var status = (transaction.operation === 'sell' || transaction.quantity === 0) ? 'close' : 'open';
                var delta  = (value - transaction.buyprice) * transaction.quantity;

                transaction = transaction.toObject();
                transaction = _.extend(transaction, {
                  'marketprice' : marketprice,
                  'value' : value,
                  'total' : total,
                  'delta' : delta,
                  'status' : status
                })
                return transaction;
              });

              var txcost = _.sumBy(portfolio.transactions, function(t) { return t.txcost; });
              var total = _.sumBy(portfolio.transactions, function(t) { return t.total; });
              var delta = _.sumBy(portfolio.transactions, function(t) { return t.delta; });
              var overralreturn = delta - txcost;

              portfolio = portfolio.toObject();

              portfolio.recap = {
                'txcost' : txcost,
                'total' : total,
                'delta' : delta,
                'overralreturn' : overralreturn
              }

              return portfolio;
            });
          }
          res.status(200).json(portfolios);
          return portfolios;
        });
      } else {
        res.status(200).json(portfolios);
        return portfolios;
      }
    } else {
      res.status(200).json(portfolios);
      return portfolios;
    }
  };
}



// Gets a list of Portfolios
export function index(req, res) {
  return Portfolio
    .find({'user' : req.user._id})
    .then(responseWithDecoratedResult(res))
    .catch(defaultHandlers.handleError(res));
}

// Gets a single Portfolio from the DB
export function show(req, res) {
  return Portfolio
    .findById(req.params.id)
    .then(defaultHandlers.handleEntityNotFound(res))
    .then(responseWithDecoratedResult(res))
    .catch(defaultHandlers.handleError(res));
}

// Creates a new Portfolio in the DB
export function create(req, res) {
  req.body.user = req.user._id;

  return Portfolio
    .create(req.body)
    .then(responseWithDecoratedResult(res, 201))
    .catch(defaultHandlers.handleError(res));
}

// Updates an existing Portfolio in the DB
export function update(req, res) {
  return Portfolio
    .findById(req.params.id)
    .then(defaultHandlers.handleEntityNotFound(res))
    .then(defaultHandlers.saveUpdates(req.body))
    .then(responseWithDecoratedResult(res))
    .catch(defaultHandlers.handleError(res));
}

// Deletes a Portfolio from the DB
export function destroy(req, res) {
  return Portfolio
    .findById(req.params.id)
    .then(defaultHandlers.handleEntityNotFound(res))
    .then(defaultHandlers.removeEntity(res))
    .catch(defaultHandlers.handleError(res));
}
