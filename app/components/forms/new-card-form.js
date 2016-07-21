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
  errors: {},
  actions: {
    save() {
      // if the input fields are not filled up, throw some errors
      if (!this.get('model.title') || !this.get('model.description') || !this.get('model.type') || !this.get('model.project_id')) {
        this.set('errors.title', 'Title is required!');
        this.set('errors.description', 'Description is required!');
        this.set('errors.type', 'Type is required!');
        this.set('errors.project', 'Project is required!');
      } else {
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
      }
    },

    cancel() {
      getOwner(this).lookup('route:cards').transitionTo('cards');
    },

    selectType(type) {
      this.get('model').set('type', this.get('type.id'));
    },

    selectProject(project) {
      this.get('model').set('project_id', this.get('project.id'));
    },

    validateInputTitle(data) {
      if (data) {
        this.set('errors.title', '');

        $('#card-title').removeClass('form-control-danger').addClass('form-control-success');
        $('#card-title').closest('.form-group').removeClass('has-danger').addClass('has-success');
      } else {
        this.set('errors.title', 'Title is required!');

        $('#card-title').removeClass('form-control-success').addClass('form-control-danger');
        $('#card-title').closest('.form-group').removeClass('has-success').addClass('has-danger');
      }
    },

    validateInputDescription(data) {
      if (data) {
        this.set('errors.description', '');

        $('#card-description').removeClass('form-control-danger').addClass('form-control-success');
        $('#card-description').closest('.form-group').removeClass('has-danger').addClass('has-success');
      } else {
        this.set('errors.description', 'Description is required!');
        $('#card-description').removeClass('form-control-success').addClass('form-control-danger');
        $('#card-description').closest('.form-group').removeClass('has-success').addClass('has-danger');
      }
    }
  }
});
