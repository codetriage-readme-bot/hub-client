import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export const pollInterval = 5000; // time in milliseconds

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  getUsers() {
    return this.get('store').findAll('user');
  },

  model() {
    return this.getUsers();
  },

  onPoll()  {
    return this.getUsers()
      .then((users) => {
        this.set('currentModel', users);
      });
  },

  afterModel() {
    let usersPoller = this.get('usersPoller');

    if (!usersPoller) {
      usersPoller = this.get('pollboy').add(this, this.onPoll, pollInterval);
      this.set('usersPoller', usersPoller);
    }
  },

  deactivate() {
    const usersPoller = this.get('usersPoller');
    this.get('pollboy').remove(usersPoller);
    this.set('usersPoller', null);
  },

  setupController(controller,model){
    this._super(controller, model);
    controller.set('users', model);
  }
});
