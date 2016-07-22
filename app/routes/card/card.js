import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { getOwner } = Ember;

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model(params) {
    // get the individual card from the store
    return this.store.find('card', params.card_id);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('card', model);
  },

  init() {
    this._super();

    this.set('isEditing', getOwner(this).lookup('controller:application').currentPath);
    console.log(getOwner(this).lookup('controller:application'));
  }
});
