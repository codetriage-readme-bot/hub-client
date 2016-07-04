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
    }
  }
});
