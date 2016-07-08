import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save(title, description) {
      // store the createRecord data in a new variable
      // also specify the fields that you need to update
      // eg: title, description
      const newCard = this.get('store').createRecord('card', { title, description } );
      newCard.save().then((card) => {
        // go to the new item's route after creating it.
        // remember to pass 'card' as the params since
        // card.js is expecting an object
        this.transitionTo('card.card', card);
      });
    },

    cancel() {
      // on clicking on cancel, just go to the card.all
      // route
      this.transitionTo('card.all');
    }
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('card', model);
  }
});
