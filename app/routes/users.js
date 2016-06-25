import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('users.all');
  },

  model() {
    return this.store.findAll('user');
  },

  setupController(controller,model){
    this._super(controller, model);
    controller.set('users', model);
  }
});
