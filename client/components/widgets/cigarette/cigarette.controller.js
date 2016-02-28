'use strict';

(function() {

  class CigaretteController {

    constructor(Cigarette, formats) {
      this.Cigarette = Cigarette;
      this.formats = formats;

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
