'use strict';

(function() {

class PageController {
  constructor($route, $filter, PagesResource) {
    var app = new PagesResource();
    this.app = app;
    var pageid = $route.current.params.name;

    app.$get().then(() => {
      this.noPageCreated = app.pages.length === 0;

      if(!this.noPageCreated){
        var page = $filter('filter')(app.pages, {'id' : pageid});
        this.child = page.length ? page[0].child : app.pages[0].child;
      }
    })


  }
}

angular
  .module('gpAppApp')
  .controller('PageController', PageController);

})();
