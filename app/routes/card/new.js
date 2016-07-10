import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    let title = this.get('model.title');
    let description = this.get('model.description');

    console.log(title);

    return this.get('store').createRecord('card', { title, description });
  },

  // setupController(controller, model) {
  //   this._super(controller, model);
  //   controller.set('card', model);
  // }
});
