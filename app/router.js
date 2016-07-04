import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('signin');
  this.route('landing-page', { path: '/' });
  this.route('dashboard');
  this.route('users', function() {
    this.route('all');
    this.route('user', {path: '/:user_id'});
  });

  this.route('cards', function() {
    this.route('all');
    this.route('card', {path: '/:card_id'}, function() {
      this.route('edit');
    });
    this.route('new');
  });
});

export default Router;
