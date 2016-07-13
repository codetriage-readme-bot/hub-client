import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model() {
    return this.store.findAll('user');
  },

  setupController(controller,model){
    this._super(controller, model);
    controller.set('users', model);
  }
});
