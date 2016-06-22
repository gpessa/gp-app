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
    .exec(function(err, model){
      if (err){
        res.status(500).send(err);
      } else{
        res.status(200).send(model);
      }
    });
}

// Updates an existing Item in the DB
export function update(req, res) {

  var toupdate = [];

  req.body.pages = req.body.pages.map(function(child){
    console.log('---------');
    if(child._id){
      console.log('update ' + child._id);
      toupdate.push(child);
      return child._id;
    } else {
      let c = new Item(child);
      c.save();
      console.log('create ' + c._id);
      return c._id;
    }
  });

  var update = function(child){
    return Item
      .findOneAndUpdate({
          '_id' : child._id
        }, child ,{
          'new' : true,   // return new doc if one is upserted
          'upsert' : true // insert the document if it does not exist
      })
  };

  var actions = toupdate.map(update);
  var results = Promise.all(actions);

  results.then(data =>{
      return Pages
        .findById(req.body._id)
        .exec()
        .then(function(model){

          console.log(model.pages);
          console.log(req.body.pages);

          var deleted = _.differenceWith(model.pages, req.body.pages, function(a,b){
            return a._id === b;
          });

          console.log('deleted');
          console.log(deleted);


          deleted.forEach(d => {
            d.remove();
          });

          var updated = _.merge(model, req.body, function(oldVal, newVal){
            return newVal;
          });

          return Pages
            .findOneAndUpdate({
              '_id' : req.body._id
            }, req.body ,{
              'new' : true,   // return new doc if one is upserted
              'upsert' : true // insert the document if it does not exist
            });
        })
        .then(function(model){
          res.status(200).send(model);
          return model;
        })
    })
}
