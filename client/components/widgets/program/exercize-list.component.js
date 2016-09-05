'use strict';


class ExecrizeList {
  constructor() {
  }
}

angular
  .module('gpAppApp')
  .component('exercizeList', {
    'require': {
    },
    'templateUrl' : 'components/widgets/program/exercize-list.html',
    'controller' : ExecrizeList
  });
