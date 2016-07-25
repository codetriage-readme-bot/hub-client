import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  email: attr('string'),
  name: attr('string'),
  slug: attr('string'),
  cards: hasMany('card'),
  projects: hasMany('project')
});
