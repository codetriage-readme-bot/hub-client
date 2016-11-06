import Ember from 'ember';

export default Ember.Component.extend({
  sortedCards: Ember.computed.sort('cards', 'sortDefinition'),
  sortBy: 'type', // default sort by type
  reverseSort: false, // default sort in ascending order
  sortDefinition: Ember.computed('sortBy', 'reverseSort', function() {
    let sortOrder = this.get('reverseSort') ? 'desc' : 'asc';
    return [ `${this.get('sortBy')}:${sortOrder}` ];
  })
});
