import Ember from 'ember';

const { getOwner } = Ember;

export default Ember.Component.extend({
  init() {
    this._super();

    this.set('errors.name', '');
    this.set('errors.description', '');
  },
  store: Ember.inject.service(),
  session: Ember.inject.service('session'),
  errors: {},
  actions: {
    save() {
      // if the input fields are not filled up, throw some errors
      if (!this.get('model.name') || !this.get('model.description')) {
        this.set('errors.name', 'Name is required!');
        this.set('errors.description', 'Description is required!');

        $('#card-title').addClass('form-control-danger');
        $('#card-title').closest('.form-group').addClass('has-danger');
        $('#card-description').addClass('form-control-danger');
        $('#card-description').closest('.form-group').addClass('has-danger');
      } else {
        // get the details about the currently authenticated user
        this.get('store').findRecord('user', this.get('session.data.authenticated.id')).then((user) => {

          // set the user as the owner of the current team
          this.get('model').set('users', [user]);

          this.get('model').save().then((team) => {
            // go to the new item's route after creating it.
            getOwner(this).lookup('route:team.team').transitionTo('team.team', team);
          });
        }.bind(this));
      }
    },

    cancel() {
      this.set('errors.name', '');
      this.set('errors.description', '');

      $('#card-title').removeClass('form-control-danger');
      $('#card-title').closest('.form-group').removeClass('has-success');
      $('#card-description').removeClass('form-control-danger');
      $('#card-description').closest('.form-group').removeClass('has-success');

      getOwner(this).lookup('route:teams').transitionTo('teams');
    },

    setType(type) {
      this.set('selectedType', type);
      this.get('model').set('type', type);
    },

    validateInputTitle(data) {
      if (data) {
        this.set('errors.name', '');

        $('#card-title').removeClass('form-control-danger').addClass('form-control-success');
        $('#card-title').closest('.form-group').removeClass('has-danger').addClass('has-success');
      } else {
        this.set('errors.name', 'Name is required!');

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
