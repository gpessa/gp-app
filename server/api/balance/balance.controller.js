/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/balances              ->  index
 * PUT     /api/balances/:id          ->  update
 */

'use strict';

import _ from 'lodash';
import Balance from './balance.model';

// Gets a list of Balances
export function index(req, res) {
  return Balance
    .findOneAndUpdate({'user': req.user }, req.body, {
      'new': true, // return new doc if one is upserted
      'upsert': true // insert the document if it does not exist
    })
    .exec(function(err, model) {
      let response = err ? err : model;
      let code = err ? 500 : 200;
      res.status(code).send(response);
    });
}

// Updates an existing Balance in the DB
export function update(req, res) {
  return Balance
    .findOneAndUpdate({'_id': req.body._id }, req.body, {
      'new': true, // return new doc if one is upserted
      'upsert': true // insert the document if it does not exist
    })
    .exec(function(err, model) {
      let response = err ? err : model;
      let code = err ? 500 : 200;
      res.status(code).send(response);
    });
}
