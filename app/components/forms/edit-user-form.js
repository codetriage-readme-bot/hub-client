import Ember from 'ember';

const { getOwner } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),
  actions: {
    save(name, email, id) {
      // get the details about the currently authenticated user
      this.get('store').findRecord('user', this.get('session.data.authenticated.id')).then((user) => {
        user.save().then(() => {
          // go to the edit item's route after creating it.
          // remember to pass 'user' as the params since
          // user.js is expecting an object
          getOwner(this).lookup('route:user.user').transitionTo('user.user', user);
        });
      });
    },

    cancel(id) {
      // don't store the attributes if they are not saved
      this.get('model').rollbackAttributes();

      // go the user route on cancel
      getOwner(this).lookup('route:user.user').transitionTo('user.user', id);
    }
  },
});
