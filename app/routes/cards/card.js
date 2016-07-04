import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('card', params.id);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('card', model);
  }
});
