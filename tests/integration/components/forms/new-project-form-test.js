import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('forms/new-project-form', 'Integration | Component | forms/new project form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{forms/new-project-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#forms/new-project-form}}
      template block text
    {{/forms/new-project-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
