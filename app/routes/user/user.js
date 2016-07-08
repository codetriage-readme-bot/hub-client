import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return this.store.find('user', params.user_id);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('user', model);
  }
});
