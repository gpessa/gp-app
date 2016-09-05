'use strict';

class Program {
  constructor(ProgramResource) {
    this.programs = [];
    this.ProgramResource = ProgramResource;
  }

  $onInit(){
    this.item.toggleLoading();
    this.programs = this.ProgramResource.query({}, this.item.toggleLoading());
  }

  create(program = new this.ProgramResource()){
    this.programs.push(program);
    program.$save();
  }

  remove(program){
    this.programs.remove(program);
    program.$delete();
  }

  save(program){
    program.$update();
  }

  makeActive(program){
    let active = this.programs.find(program => program.active === true );
    if (active) {
      active.active = false;
      active.$update();
    }

    program.active = true;
    program.$update();
  }

  addExercize(program){
    
  }
}

angular
  .module('gpAppApp')
  .component('widgetProgram', {
    'require': {
      'item': '^^item'
    },
    'templateUrl' : 'components/widgets/program/program.html',
    'controller' : Program
  });
