'use strict';

import _ from 'lodash';
import Program from './program.model';
import * as defaultHandlers from '../handlers';


// Gets a list of todoList
export function index(req, res) {
  return Program
    .find({'user': req.user })
    .exec(function(err, model) {
      let response = err ? err : model;
      let code = err ? 500 : 200;
      res.status(code).send(response);
    });
}


export function create(req, res) {
  req.body.user = req.user._id;

  let program = new Program(req.body);
  program.save(function(err, model) {
    let response = err ? err : model;
    let code = err ? 500 : 200;
    res.status(code).send(response);
  });
}

export function destroy(req, res) {
  return Program
    .findOneAndRemove(req.params.id)
    .exec(function(err, model) {
      let response = err ? err : model;
      let code = err ? 500 : 200;
      res.status(code).send(response);
    });
}

export function update(req, res) {
  return Program
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
