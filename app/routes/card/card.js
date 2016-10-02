import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { getOwner } = Ember;

export const pollInterval = 5000; // time in milliseconds

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  getCard(params) {
    // get the individual card from the store
    if (params.slug) {
      return this.store.find('card', params.slug);
    } else {
      return this.store.find('card', params);
    }
  },

  model(params) {
    return this.getCard(params);
  },

  onPoll(id)  {
    return this.getCard(id)
      .then((card) => {
        this.set('currentModel', card);
      })
  },

  afterModel(params) {
    let cardPoller = this.get('cardPoller');

    if (!cardPoller) {
      cardPoller = this.get('pollboy').add(this, this.onPoll.bind(this, params.id), pollInterval);
      this.set('cardPoller', cardPoller);
    }
  },

  deactivate() {
    const cardPoller = this.get('cardPoller');
    this.get('pollboy').remove(cardPoller);
    this.set('cardPoller', null);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('card', model);
  },

  actions: {
    deleteCard(card) {
      this.get('store').findRecord('card', card.id, { backgroundReload: false }).then((card) => {
        // remove the card from the store and do a DELETE request
        card.destroyRecord();
        getOwner(this).lookup('route:cards').transitionTo('cards');
      });
    }
  }
});
