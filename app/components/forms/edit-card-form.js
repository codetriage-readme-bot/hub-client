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
  currentProject: Ember.computed({
    get() {
      return this.get('store').find('project', this.get('model.project_id'));
    }
  }),
  projects: Ember.computed({
    get() {
      // Since we are using Ember.inject.service, we need to call the store using the get helper
      return this.get('store').findAll('project');
    }
  }).readOnly(),
  errors: {},
  actions: {
    save(title, description, id) {
      // get the details about the currently authenticated user
      this.get('store').findRecord('user', this.get('session.data.authenticated.id')).then((user) => {
        // find the card with the id
        this.get('store').findRecord('card', id).then(function(post) {

          // set the user as the owner of the current card
          post.set('users', [user]);

          post.save().then((card) => {
            // go to the edit item's route after creating it.
            // remember to pass 'card' as the params since
            // card.js is expecting an object
            getOwner(this).lookup('route:card.card').transitionTo('card.card', card);
          });
        }.bind(this));
      });
    },

    cancel(title, description, id) {
      // don't store the attributes if they are not saved
      this.get('model').rollbackAttributes();

      // go the card route on cancel
      getOwner(this).lookup('route:card.card').transitionTo('card.card', id);
    },

    selectType(type) {
      this.get('model').set('type', type.id);
    },

    selectProject(project) {
      this.get('model').set('project_id', project.get('id'));
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
  },
});
