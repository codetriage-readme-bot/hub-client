import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { getOwner } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    // get the individual card from the store
    return this.store.find('card', params.slug);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('card', model);
  }
});
