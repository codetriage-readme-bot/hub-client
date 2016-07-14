import Ember from 'ember';

const { getOwner } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),
  types: [ 'Task', 'Discussion', 'Note' ],
  selectedType: 'Note',

  actions: {
    save(title, description, id) {
      // get the details about the currently authenticated user
      this.get('store').findRecord('user', this.get('session.data.authenticated.id')).then((user) => {
        // find the card with the id
        this.get('store').findRecord('card', id).then(function(post) {

          // set the user as the owner of the current card
          post.set('users', [user]);

          post.save().then((card) => {
            // go to the edit item's route after creating it.
            // remember to pass 'card' as the params since
            // card.js is expecting an object
            getOwner(this).lookup('route:card.card').transitionTo('card.card', card);
          });
        }.bind(this));
      });
    },

    cancel(title, description, id) {
      // don't store the attributes if they are not saved
      this.get('model').rollbackAttributes();

      // go the card route on cancel
      getOwner(this).lookup('route:card.card').transitionTo('card.card', id);
    },

    setType(type) {
      this.set('selectedType', type);
      this.get('model').set('type', type);
    }
  },
});
