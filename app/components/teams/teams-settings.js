import Ember from 'ember';

const { getOwner } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    isNotEditing(id) {
      this.set('isEditing', false);

      // go the team route on cancel
      getOwner(this).lookup('route:team.team').transitionTo('team.team', id);
    },

    isEditing(id) {
      this.set('isEditing', true);
      getOwner(this).lookup('route:team.team.edit').transitionTo('team.team.edit', id);
    }
  }
});
