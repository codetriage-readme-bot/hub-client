import Ember from 'ember';

export default Ember.Component.extend({
  sortedCards: Ember.computed.sort('cards', 'sortDefinition'),
  sortBy: 'id', // default sort by id
  reverseSort: false, // default sort in ascending order
  sortDefinition: Ember.computed('sortBy', 'reverseSort', function() {
    let sortOrder = this.get('reverseSort') ? 'desc' : 'asc';
    return [ `${this.get('sortBy')}:${sortOrder}` ];
  }),
});
