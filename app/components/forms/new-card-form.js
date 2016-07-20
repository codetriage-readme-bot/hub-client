import Ember from 'ember';

const { getOwner } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),
  types: Ember.A([
      {
        id: "Task",
        title: "Task"
      },
      {
        id: "Discussion",
        title: "Discussion"
      },
      {
        id: "Note",
        title: "Note"
      }
    ]),
  projects: Ember.computed({
      get() {
        // Since we are using Ember.inject.service, we need to call the store using the get helper
          return this.get('store').findAll('project');
      }
  }).readOnly(),
  actions: {
    save() {
      // get the details about the currently authenticated user
      this.get('store').findRecord('user', this.get('session.data.authenticated.id')).then((user) => {

        // set the user as the owner of the current card
        this.get('model').set('users', [user]);
        this.get('model').set('type', this.get('type.id'));
        this.get('model').set('project_id', this.get('project.id'));

        this.get('model').save().then((card) => {
          // go to the new item's route after creating it.
          getOwner(this).lookup('route:card.card').transitionTo('card.card', card);
        });
      }.bind(this));
    },

    cancel() {
      getOwner(this).lookup('route:cards').transitionTo('cards');
    }
  }
});
