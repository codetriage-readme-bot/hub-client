import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('layout/secondary-nav-bar', 'Integration | Component | layout/secondary nav bar', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{layout/secondary-nav-bar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#layout/secondary-nav-bar}}
      template block text
    {{/layout/secondary-nav-bar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
