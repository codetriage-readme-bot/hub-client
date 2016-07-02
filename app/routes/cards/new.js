import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {}
  },
  actions: {
    save() {
      const newCard = this.get('store').createRecord('card', { title: 'hello', description: 'world' });
      newCard.save().then((card) => {
        this.transitionTo('cards.all');
      });
    },
    cancel() {
      this.transitionTo('cards');
    }
  }
});
