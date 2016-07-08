import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save(title, description, id) {
      // find the card with the id
      this.store.findRecord('card', id).then(function(post) {
        // get the required fields to update
        // eg: title, description
        post.get('title');
        post.get('description');
        post.save().then((card) => {
          // go to the edit item's route after creating it.
          // remember to pass 'card' as the params since
          // card.js is expecting an object
          this.transitionTo('card.card', card);
        });
      }.bind(this));
    },

    cancel() {
      this.transitionTo('card.card');
    }
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('card', model);
  }
});
