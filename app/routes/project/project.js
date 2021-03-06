import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    // get the individual project from the store
    return this.store.find('project', params.slug);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('project', model);
  }
});
