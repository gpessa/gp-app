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
  req.body.user = req.user;

  return Pages
    .findOneAndUpdate({
        'user' : req.user
      }, req.body ,{
        'new' : true,   // return new doc if one is upserted
        'upsert' : true // insert the document if it does not exist
    })
    .populate('pages')
    .populate('pages.child')
    .exec(function(err, model){
      if (err){
        res.status(500).send(err);
      } else{
        res.status(200).send(model);
      }
    });
}
