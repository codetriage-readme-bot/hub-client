import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    this.transitionTo('cards.all');
  },

  model() {
    // return all the cards from the store
    // important: removing this line will make
    // the individual links to fail working
    // properly
    return this.store.findAll('card');
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('cards', model);
  }
});
