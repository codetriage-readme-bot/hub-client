import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),
  actions: {
    save() {
      // get the details about the currently authenticated user
      this.get('store').findRecord('user', this.get('session.data.authenticated.id')).then((user) => {

        // set the user as the owner of the current card
        this.get('model').set('users', [user]);

        this.get('model').save().then((card) => {
          // go to the new item's route after creating it.
          Ember.getOwner(this).lookup('route:card.card').transitionTo('card.card', card);
        });
      }.bind(this));
    },

    cancel() {
      // on clicking on cancel, just go to the card.all route
      this.transitionTo('cards.all');
    }
  }
});
