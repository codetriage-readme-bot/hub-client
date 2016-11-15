import Ember from 'ember';

const { getOwner } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    isNotEditing(id) {
      this.set('isEditing', false);

      // go the user route on cancel
      getOwner(this).lookup('route:user.user').transitionTo('user.user', id);
    },

    isEditing(id) {
      this.set('isEditing', true);
      getOwner(this).lookup('route:user.user.edit').transitionTo('user.user.edit', id);
    }
  }
});
