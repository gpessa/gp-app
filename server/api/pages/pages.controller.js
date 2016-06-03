/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pages              ->  index
 * POST    /api/pages              ->  create
 * GET     /api/pages/:id          ->  show
 * PUT     /api/pages/:id          ->  update
 * DELETE  /api/pages/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Pages from './pages.model';
import Item from '../item/item.model';
import * as defaultHandlers from '../handlers';


// Gets a single Page from the DB
export function show(req, res) {
  return Pages
    .findOneOrCreate({
      'user' : req.user
    },{
      'user' : req.user
    }, function(err, model){
      if (err){
        res.status(500).send(err);
      } else{
        // console.log(model.populate);
        model.populate('pages');
        // console.log(model);

        res.status(200).send(model);
      }
    });
}


// Updates an existing Page in the DB
export function update(req, res) {
  return Pages
    .findOneAndUpdate({_id : req.params.id}, req.body,{
      upsert: false,
      multi: true,
      new: true
    })
    .populate('pages')
    .exec(function(err, model){
      if (err){
        res.status(500).send(err);
      } else{
        res.status(200).send(model);
      }
    })
}
