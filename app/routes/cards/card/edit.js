import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save(title, description, id) {
      this.store.findRecord('card', id).then(function(post) {
        post.get('title');
        post.get('description');
        post.save();
        this.transitionTo('cards.all');
      }.bind(this));
    },

    cancel() {
      this.transitionTo('cards.card');
    }
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('card', model);
  }
});
