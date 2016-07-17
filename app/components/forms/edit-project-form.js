import Ember from 'ember';

const { getOwner } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),
  actions: {
    save(title, description, id) {
      // get the details about the currently authenticated user
      this.get('store').findRecord('user', this.get('session.data.authenticated.id')).then((user) => {
        // find the project with the id
        this.get('store').findRecord('project', id).then(function(post) {

          // set the user as the owner of the current project
          post.set('users', [user]);

          post.save().then((project) => {
            // go to the edit item's route after creating it.
            // remember to pass 'project' as the params since
            // project.js is expecting an object
            getOwner(this).lookup('route:project.project').transitionTo('project.project', project);
          });
        }.bind(this));
      });
    },

    cancel(title, description, id) {
      // don't store the attributes if they are not saved
      this.get('model').rollbackAttributes();

      // go the project route on cancel
      getOwner(this).lookup('route:project.project').transitionTo('project.project', id);
    },

    setType(type) {
      this.set('selectedType', type);
      this.get('model').set('type', type);
    }
  },
});
