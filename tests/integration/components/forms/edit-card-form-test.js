import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/edit-card-form', 'Integration | Component | forms/edit card form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{forms/edit-card-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#forms/edit-card-form}}
      template block text
    {{/forms/edit-card-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
