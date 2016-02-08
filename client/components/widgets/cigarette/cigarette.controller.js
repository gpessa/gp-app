'use strict';

(function() {

  class CigaretteController {

    constructor(Cigarette, dateFormat) {
      this.Cigarette = Cigarette;
      this.dateFormat = dateFormat;

      this.render();
    }

    smoke(){
      this.Cigarette.create()
        .then(this.render.bind(this));
    }

    render(){
      this.Cigarette.get()
        .then((cigarettes) => {
          this.cigarettes = cigarettes;
        });
    }
  }

  angular.module('gpAppApp')
         .controller('CigaretteController', CigaretteController);

})();
