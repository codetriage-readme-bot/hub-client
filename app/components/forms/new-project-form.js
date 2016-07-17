import Ember from 'ember';

const { getOwner } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),
  actions: {
    save() {
      // get the details about the currently authenticated user
      this.get('store').findRecord('user', this.get('session.data.authenticated.id')).then((user) => {

        // set the user as the owner of the current project
        this.get('model').set('users', [user]);

        this.get('model').save().then((project) => {
          // go to the new item's route after creating it.
          getOwner(this).lookup('route:project.project').transitionTo('project.project', project);
        });
      }.bind(this));
    },

    cancel() {
      getOwner(this).lookup('route:projects').transitionTo('projects');
    },

    setType(type) {
      this.set('selectedType', type);
      this.get('model').set('type', type);
    }
  }
});
