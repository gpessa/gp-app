'use strict';

import _ from 'lodash';
import config from '../../config/environment';
import Stock from './stock.model';
import yahooFinance from 'yahoo-finance';


function decorateResult(stocks){
  if (stocks) {
    var FIELDS = ['n', 'c6', 'c1', 'c', 'p2', 'b', 'v', 'a2', 't1', 'g', 'h', 'b3'];
    var SYMBOLS = stocks.map(stock => stock.symbol).filter(stock => { return !!stock; });

    var promise = new Promise(function(resolve, reject) {
      yahooFinance
        .snapshot({
          fields: FIELDS,
          symbols: SYMBOLS
        })
        .then(function(result) {
          stocks = stocks.map(function(stock, index) {
            stock = stock.toObject();
            let data = result.find(s => s.symbol === stock.symbol);
            if(data){
              stock.data = {};
              stock.data = _.assign(stock.data, data);
            }
            return stock;
          })
          resolve(stocks);
        })
        .catch(function(){
          resolve(stocks);
        })
    });
    return promise;
  }
}


// Gets a list of Stocks
export function index(req, res) {
  return Stock
    .find({'user': req.user._id})
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


// Creates a new Stock in the DB
export function create(req, res) {
  req.body.user = req.user._id;

  let stock = new Stock(req.body);
  stock.save(function(err, model) {
    let response = err ? err : model;
    let code = err ? 500 : 200;
    res.status(code).send(response);
  });
}



// Deletes a Stock from the DB
export function destroy(req, res) {
  return Stock
    .findOneAndRemove(req.params.id)
    .exec(function(err, model) {
      let response = err ? err : model;
      let code = err ? 500 : 200;
      res.status(code).send(response);
    });
}
