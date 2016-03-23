'use strict';

(function() {

class PageController {
  constructor($route, $filter, PagesResource) {
    var app = new PagesResource();
    var pageid = $route.current.params.name;

    app.$get().then(() => {
      var page = $filter('filter')(app.pages, {'id' : pageid});
      var child = page.length ? page[0].child : app.pages[0].child;
      this.child = {
        '_id' : child
      }
    })


  }
}

angular
  .module('gpAppApp')
  .controller('PageController', PageController);

})();
