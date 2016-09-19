import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/edit-user-form', 'Integration | Component | forms/edit user form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{forms/edit-user-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#forms/edit-user-form}}
      template block text
    {{/forms/edit-user-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
