import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.get('store').createRecord('card');
  },

  // setupController(controller, model) {
  //   this._super(controller, model);
  //   controller.set('card', model);
  // }
});
