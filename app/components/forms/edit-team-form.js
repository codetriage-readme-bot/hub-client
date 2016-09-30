import Ember from 'ember';

const { getOwner } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),
  actions: {
    save(title, description, id) {
      // get the details about the currently authenticated user
      this.get('store').findRecord('user', this.get('session.data.authenticated.id')).then((user) => {
        // find the team with the id
        this.get('store').findRecord('team', id).then(function(post) {

          // set the user as the owner of the current team
          post.set('users', [user]);

          post.save().then((team) => {
            // go to the edit item's route after creating it.
            // remember to pass 'team' as the params since
            // team.js is expecting an object
            getOwner(this).lookup('route:team.team').transitionTo('team.team', team);
          });
        }.bind(this));
      });
    },

    cancel(name, description, id) {
      // don't store the attributes if they are not saved
      this.get('model').rollbackAttributes();

      // go the team route on cancel
      getOwner(this).lookup('route:team.team').transitionTo('team.team', id);
    },

    setType(type) {
      this.set('selectedType', type);
      this.get('model').set('type', type);
    }
  },
});
