import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('signin');
  this.route('landing-page', { path: '/' });
  this.route('dashboard');

  // route for all the users
  this.route('users');

  // route for the single user
  this.route('user', function() {
    this.route('user', { path: '/:slug' });
  });

  // route for all the cards
  this.route('cards');

  // route for the single card
  this.route('card', function() {
    this.route('card', { path: '/:slug' }, function() {
      this.route('edit');
    });
    this.route('new');
  });

  // route for all the projects
  this.route('projects');

  this.route('project', function() {
    this.route('project', { path: '/:slug' }, function() {
      this.route('edit');
    });
    this.route('new');
  });
});

export default Router;
