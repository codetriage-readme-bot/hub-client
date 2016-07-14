import Ember from 'ember';

const { getOwner } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),
  types: [ 'Task', 'Discussion', 'Note' ],
  selectedType: 'Note',
  actions: {
    save() {
      // get the details about the currently authenticated user
      this.get('store').findRecord('user', this.get('session.data.authenticated.id')).then((user) => {

        // set the user as the owner of the current card
        this.get('model').set('users', [user]);

        this.get('model').save().then((card) => {
          // go to the new item's route after creating it.
          getOwner(this).lookup('route:card.card').transitionTo('card.card', card);
        });
      }.bind(this));
    },

    cancel() {
      getOwner(this).lookup('route:cards').transitionTo('cards');
    },

    setType(type) {
      this.set('selectedType', type);
      this.get('model').set('type', type);
    }
  }
});
