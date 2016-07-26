import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    return this.store.find('user', params.slug);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('user', model);
  }
});
