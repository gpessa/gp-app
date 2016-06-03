'use strict';

import Item from '../item/item.model';
import mongoose from 'mongoose';
import findOneOrCreate from 'mongoose-find-one-or-create';
var Schema = mongoose.Schema;

var PageSchema = new Schema({
  "title" : String,
  "child" : {
    "type" : mongoose.Schema.Types.ObjectId,
    "ref" : 'Item'
  }
},{
  "toJSON" : {
    "virtuals" : true,
    "transform" : function (doc, ret, game) {
      delete ret.user;
      delete ret.__v;
      delete ret.id;
    }
  }
});

// var autoPopulateChildren = function(next) {
//   this.populate('child');
//   next();
// };

// SinglePageSchema
//   .pre('save', function(doc, next){
//     console.log('save');
//     next();
//   })
//   .pre('update', function(doc, next){
//     console.log('update');
//     next();
//   })
//
// SinglePageSchema
//   .pre('findOne', autoPopulateChildren)
//   .pre('find', autoPopulateChildren)

PageSchema
  .virtual('url')
  .get(function(){ return this.title.toLowerCase().replace(/ /g,"-"); });


var Page = mongoose.model('Page', PageSchema);




var PagesSchema = new Schema({
  "user" : {
    "type" : mongoose.Schema.Types.ObjectId,
    "ref" : 'User'
  },
  "pages" : {
    "type" : [{
      "type" : mongoose.Schema.Types.ObjectId,
      "ref" : 'Page'
    }],
    "default" : []
  }
},{
  "toJSON" : {
    "virtuals" : true,
    "transform" : function (doc, ret, game) {
      delete ret.user;
      delete ret.__v;
    }
  }
});

PagesSchema
  .plugin(findOneOrCreate);

PagesSchema
  .pre('findOneAndUpdate', function(next){
    console.log('findOneAndUpdate');

    this._update.pages = this._update.pages.map(function(page){
      if(!page._id){
        page = new Page(page);
        page.save();
      }
      return page._id;
    });

    next();
  })

export default mongoose.model('Pages', PagesSchema);



// SinglePageSchema
//   .pre('save', function(next) {
//     console.log('2');
//     console.log(this);
//
//     // if (!this.child) {
//     //   var item = new Item({
//     //     'type' : 'container',
//     //     'subtype' : 'base',
//     //     'children' : []
//     //   });
//     //   item.save();
//     //   this.child = item._id;
//     // }
//     next();
//   });
//
// SinglePageSchema
//   .set('toJSON', { virtuals: true });

/**
PageSchema.pre('save', function(next){
  console.log('save pre page');
  console.log(this);

  this.pages = this.pages.map(function(page){
    if(!page._id){
      var page = new SinglePage(page);
      page.save();
    }
    return page._id;
  });
  next();
})

PageSchema
  .pre('findOne', function(next){
    console.log('findOne');
    next();
  })
  .pre('find', function(next){
    console.log('find');
    next();
  })
  .post('findOneAndUpdate', function(next){
    console.log('findOneAndUpdate');
    console.log(this);

    this.pages = this.pages.map(function(page){
      if(!page._id){
        var page = new SinglePage(page);
        page.save();
      }
      return page._id;
    });

    next();
  })

var autoPopulatePages = function(next) {
  this.populate('pages');
  console.log('populate');
  next();
};

PageSchema
  .pre('findOne', autoPopulatePages)
  .pre('find', autoPopulatePages)
  .post('save', function(page, next){
    this.populate('pages');
    console.log('populate save');
    next();
  })
**/
