import Ember from 'ember';

const { getOwner } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    deleteCard(card) {
      this.get('store').findRecord('card', card.id, { backgroundReload: false }).then((card) => {
        // remove the card from the store and do a DELETE request
        card.destroyRecord();
        getOwner(this).lookup('route:cards').transitionTo('cards');
      });
    },

    archiveCard(card) {
      this.get('store').findRecord('card', card.id).then((card) => {
        card.set('status', 'archived');
        card.save();
      });
    },

    unarchiveCard(card) {
      this.get('store').findRecord('card', card.id).then((card) => {
        card.set('status', 'unarchived');
        card.save();
      });
    },

    isNotEditing(id) {
      this.set('isEditing', false);

      // go the card route on cancel
      getOwner(this).lookup('route:card.card').transitionTo('card.card', id);
    },

    isEditing(id) {
      this.set('isEditing', true);
      getOwner(this).lookup('route:card.card.edit').transitionTo('card.card.edit', id);
    }
  }
});
