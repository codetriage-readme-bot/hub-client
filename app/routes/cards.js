import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export const pollInterval = 5000; // time in milliseconds

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service('session'),

  getCards() {
    return this.get('store').find('user', this.get('session.data.authenticated.id'))
      .then(user => user.get('cards'));
  },

  model() {
    return this.getCards();
  },

  onPoll()  {
    return this.getCards()
      .then((cards) => {
        this.set('currentModel', cards);
      })
  },

  afterModel() {
    let cardsPoller = this.get('cardsPoller');

    if (!cardsPoller) {
      cardsPoller = this.get('pollboy').add(this, this.onPoll, pollInterval);
      this.set('cardsPoller', cardsPoller);
    }
  },

  deactivate() {
    const cardsPoller = this.get('cardsPoller');
    this.get('pollboy').remove(cardsPoller);
    this.set('cardsPoller', null);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('cards', model);
  }
});
