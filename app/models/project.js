import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  title: attr('string'),
  description: attr('string'),
  slug: attr('string'),
  users: hasMany('user'),
  cards: hasMany('card'),
  status: attr('string')
});
