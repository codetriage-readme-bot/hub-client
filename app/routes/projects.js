import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

// export const pollInterval = 5000; // time in milliseconds

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  getProjects() {
    return this.get('store').find('user', this.get('session.data.authenticated.id'))
      .then(user => user.get('projects'));
  },

  model() {
    return this.getProjects();
  },

  // onPoll()  {
  //   return this.getProjects()
  //     .then((projects) => {
  //       this.set('currentModel', projects);
  //     });
  // },

  // afterModel() {
  //   let projectsPoller = this.get('projectsPoller');

  //   if (!projectsPoller) {
  //     projectsPoller = this.get('pollboy').add(this, this.onPoll, pollInterval);
  //     this.set('projectsPoller', projectsPoller);
  //   }
  // },

  // deactivate() {
  //   const projectsPoller = this.get('projectsPoller');
  //   this.get('pollboy').remove(projectsPoller);
  //   this.set('projectsPoller', null);
  // },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('projects', model);
  }
});
