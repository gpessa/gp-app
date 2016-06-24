'use strict';

(function() {

class PageController {
  constructor($stateParams, $scope, $filter, PagesResource) {
    var app = new PagesResource();
    var status = $stateParams.status;

    app
      .$get()
      .then(() => {
        this.noPageCreated = app.pages.length === 0;

        if(!this.noPageCreated){
          this.child = $filter('filter')(app.pages, {'status' : status})[0];
        }
    });
  }
}

angular
  .module('gpAppApp')
  .controller('PageController', PageController);

})();
