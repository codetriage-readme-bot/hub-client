import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('cards.all');
  },

  model() {
    return this.store.findAll('card');
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('cards', model);
  }
});
