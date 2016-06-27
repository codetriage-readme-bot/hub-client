import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('card');
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('cards', model);
  }
});
