import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    // default route
    this.transitionTo('users.all');
  },

  model() {
    // return all the users from the store
    return this.store.findAll('user');
  },

  setupController(controller,model){
    this._super(controller, model);
    controller.set('users', model);
  }
});
