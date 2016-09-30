import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    // get the individual team from the store
    return this.store.find('team', params.slug);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('team', model);
  }
});
