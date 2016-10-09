import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export const pollInterval = 5000; // time in milliseconds

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  getTeams() {
    return this.get('store').find('user', this.get('session.data.authenticated.id'))
      .then(user => user.get('teams'));
  },

  model() {
    return this.getTeams();
  },

  onPoll()  {
    return this.getTeams()
      .then((teams) => {
        this.set('currentModel', teams);
      });
  },

  afterModel() {
    let teamsPoller = this.get('teamsPoller');

    if (!teamsPoller) {
      teamsPoller = this.get('pollboy').add(this, this.onPoll, pollInterval);
      this.set('teamsPoller', teamsPoller);
    }
  },

  deactivate() {
    const teamsPoller = this.get('teamsPoller');
    this.get('pollboy').remove(teamsPoller);
    this.set('teamsPoller', null);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('teams', model);
  }
});
