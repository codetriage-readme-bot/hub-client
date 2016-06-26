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
    this.route('user', {path: ':id'});
    this.route('all');
  });
});

export default Router;
