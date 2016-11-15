import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('teams/teams-settings', 'Integration | Component | teams/teams settings', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{teams/teams-settings}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#teams/teams-settings}}
      template block text
    {{/teams/teams-settings}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
