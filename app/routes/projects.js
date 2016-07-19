import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),
  model() {
    // return all the projects from the store
    // return this.store.findAll('project');

    // return the logged in user's projects
    return this.store.find('user', this.get('session.data.authenticated.id')).then(user => user.get('projects'));
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('projects', model);
  }
});
