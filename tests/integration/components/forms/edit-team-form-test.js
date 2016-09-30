import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/edit-team-form', 'Integration | Component | forms/edit team form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{forms/edit-team-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#forms/edit-team-form}}
      template block text
    {{/forms/edit-team-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
