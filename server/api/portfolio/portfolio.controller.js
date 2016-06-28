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


function decorateResult(portfolios){

  var promise = new Promise(function(resolve, reject) {
    if(portfolios.length){
      var transactions = _.flattenDeep(portfolios.map((portfolio) => { return portfolio.transactions; }));
      var FIELDS = ['b'];
      var SYMBOLS = _.uniq(transactions.map(transaction => { return transaction.symbol; }));

      yahooFinance.snapshot({
        fields: FIELDS,
        symbols: SYMBOLS
      })
      .then(function(result) {
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

        resolve(portfolios);
      });

    } else {
      resolve(portfolios);
    }
  });

  return promise;
}



// Gets a list of Portfolios
export function index(req, res) {
  return Portfolio
    .find({'user': req.user })
    .exec(function(err, model) {
      if (err) {
        res.status(500).send(err);
      } else {
        decorateResult(model).then(model => {
          res.status(200).send(model);
        })
      }
    });
}

// Creates a new Portfolio in the DB
export function create(req, res) {
  req.body.user = req.user._id;

  let portfolio = new Portfolio(req.body);
  portfolio.save(function(err, model) {
    if (err) {
      res.status(500).send(err);
    } else {
      decorateResult(model).then(model => {
        res.status(200).send(model);
      })
    }
  });
}

// Updates an existing Portfolio in the DB
export function update(req, res) {
    return Portfolio
      .findOneAndUpdate({'_id': req.body._id }, req.body, {
        'new': true, // return new doc if one is upserted
        'upsert': true // insert the document if it does not exist
      })
      .exec(function(err, model) {
        if (err) {
          res.status(500).send(err);
        } else {
          decorateResult(model).then(model => {
            res.status(200).send(model);
          })
        }
      });
}

// Deletes a Portfolio from the DB
export function destroy(req, res) {
  return Portfolio
    .findOneAndRemove(req.params.id)
    .exec(function(err, model) {
      let response = err ? err : model;
      let code = err ? 500 : 200;
      res.status(code).send(response);
    });
}
