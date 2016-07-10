import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  // model: null,
  actions: {
    save() {
      // this.get('store').createRecord('card', { title, description });
      this.get('store').findRecord('user', 1).then((user) => {
        this.get('model').set('users', [user]);

        this.get('model').save().then((card) => {
          // go to the new item's route after creating it.
          Ember.getOwner(this).lookup('route:card.index').transitionTo('card.card', card);
        });
      }.bind(this));
    },

    cancel() {
      // on clicking on cancel, just go to the card.all route
      this.transitionTo('cards.all');
    }
  }
});
