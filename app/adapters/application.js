import Ember from 'ember';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import ENV from "../config/environment";
var underscore = Ember.String.underscore;
var pluralize = Ember.String.pluralize;

export default JSONAPIAdapter.extend({
  // namespace: 'api',
  // if your rails app is on a different port from your ember app
  // this can be helpful for development.
  // in production, the host for both rails and ember should be the same.
  host: ENV.host,

  // allows the multiword paths in urls to be underscored
  pathForType: function(type) {
    let underscored = underscore(type);
    return pluralize(underscored);
  },

  // allows queries to be sent along with a findRecord
  // hopefully Ember / EmberData will soon have this built in
  // ember-data issue tracked here:
  // https://github.com/emberjs/data/issues/3596
  urlForFindRecord(id, modelName, snapshot) {
    let url = this._super(...arguments);
    let query = Ember.get(snapshot, 'adapterOptions.query');
    if(query) {
      url += '?' + Ember.$.param(query);
    }
    return url;
  }
});
