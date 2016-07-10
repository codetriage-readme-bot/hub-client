import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  // actions: {
  //   save(title, description) {
  //   const newCard = this.get('store').createRecord('card', {
  //     title,
  //     description
  //   });

  //   this.get('store').findRecord('user', 1).then(function(user) {
  //     this.get('model').set('users', [user]);
  //     console.log(newCard);

  //     this.get('model').save().then((card) => {
  //       // go to the new item's route after creating it.
  //       this.transitionTo('card.card', card);
  //     });
  //   }.bind(this));

  // },

  // model(){
  //   let title = this.get('model.title');
  //   let description = this.get('model.description');

  //   console.log(title);

  //   return this.get('store').createRecord('card', { title, description });
  // },

  actions: {
    save() {
      let title = this.get('title');
      let description = this.get('description');

      console.log(title);

      // this.get('store').createRecord('card', { title, description });
      this.get('store').findRecord('user', 1).then((user) => {
        this.get('model').set('users', [user]);

        this.get('model').save().then((card) => {
          // go to the new item's route after creating it.
          Ember.getOwner(this).lookup('route:card.index').transitionTo('card.card', card);
        });
      }.bind(this));
    },

    cancel() {
      // on clicking on cancel, just go to the card.all
      // route
      this.transitionTo('card.all');
    }
  }
});
