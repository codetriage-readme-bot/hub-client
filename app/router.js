import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('landing-page', { path: '/' });
  this.route('dashboard');
  this.route('users', function() {
    this.route('user', {path: ':id'});
  });
});

export default Router;
