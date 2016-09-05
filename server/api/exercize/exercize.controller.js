'use strict';

import _ from 'lodash';
import Exercize from './exercize.model';
import * as defaultHandlers from '../handlers';


// Gets a list of todoList
export function index(req, res) {
  return Exercize
    .find({'user': req.user })
    .exec(function(err, model) {
      let response = err ? err : model;
      let code = err ? 500 : 200;
      res.status(code).send(response);
    });
}


export function create(req, res) {
  req.body.user = req.user._id;

  let exercize = new Exercize(req.body);
  exercize.save(function(err, model) {
    let response = err ? err : model;
    let code = err ? 500 : 200;
    res.status(code).send(response);
  });
}

export function destroy(req, res) {
  return Exercize
    .findOneAndRemove(req.params.id)
    .exec(function(err, model) {
      let response = err ? err : model;
      let code = err ? 500 : 200;
      res.status(code).send(response);
    });
}
