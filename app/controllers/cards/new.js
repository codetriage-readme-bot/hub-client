import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    save() {
      const newCard = this.get('store').createRecord('card', this.get('model'));
      newCard.save().then((card) => {
        this.transitionToRoute('cards.all');
      });
    }
  }
});
