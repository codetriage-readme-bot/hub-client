import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  description: attr('string'),
  type: attr('string'),
  project_id: attr('number'),
  users: hasMany('user'),
  project: belongsTo('project')
});
