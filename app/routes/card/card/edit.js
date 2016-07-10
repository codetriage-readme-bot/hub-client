import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service('session'),
  actions: {
    save(title, description, id) {
      // get the details about the currently authenticated user
      this.get('store').findRecord('user', this.get('session.data.authenticated.id')).then((user) => {
        // find the card with the id
        this.store.findRecord('card', id).then(function(post) {

          // set the user as the owner of the current card
          post.set('users', [user]);

          post.save().then((card) => {
            // go to the edit item's route after creating it.
            // remember to pass 'card' as the params since
            // card.js is expecting an object
            this.transitionTo('card.card', card);
          });
        }.bind(this));
      });
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
