'use strict';

(function() {

  class BuienradarController {

    constructor($geolocation, Buienradar, chartConfiguration) {
      this.chartConfiguration = chartConfiguration;
      this.Buienradar = Buienradar;

      $geolocation.getCurrentPosition()
                  .then(this.getData.bind(this));
    }

    getData (coordinates) {
      this.Buienradar.get({
        'lat' : coordinates.coords.latitude,
        'lon' : coordinates.coords.longitude
      }).then(buienradar => {
        this.labels = buienradar.labels;
        this.rainfalls = buienradar.rainfalls;
      });
    }
  }

  angular.module('gpAppApp')
         .controller('BuienradarController', BuienradarController);

})();
