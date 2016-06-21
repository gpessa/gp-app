'use strict';

(function() {

class PageController {
  constructor($route, $scope, $filter, PagesResource) {
    var app = new PagesResource();
    var pageid = $route.current.params.name;

    app
      .$get()
      .then(() => {
        this.noPageCreated = app.pages.length === 0;

        if(!this.noPageCreated){
          this.child = $filter('filter')(app.pages, {'_id' : pageid})[0];
        }
    });
  }
}

angular
  .module('gpAppApp')
  .controller('PageController', PageController);

})();
