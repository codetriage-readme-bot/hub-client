import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save(title, description) {
      const newCard = this.get('store').createRecord('card', { title, description } );
      newCard.save().then((card) => {
        console.log(card.id);
        this.transitionTo('cards.all');
      });
    },

    cancel() {
      this.transitionTo('cards.all')
    }
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('card', model);
  }
});
