import Ember from 'ember';

const { getOwner } = Ember;

export default Ember.Component.extend({
  store: Ember.inject.service(),
  actions: {
    deleteProject(project) {
      this.get('store').findRecord('project', project.id, { backgroundReload: false }).then((project) => {
        // remove the project from the store and do a DELETE request
        project.destroyRecord();
        getOwner(this).lookup('route:projects').transitionTo('projects');
      });
    },

    archiveProject(project) {
      this.get('store').findRecord('project', project.id).then((project) => {
        project.set('status', 'archived');
        project.save();
      });
    },

    unarchiveProject(project) {
      this.get('store').findRecord('project', project.id).then((project) => {
        project.set('status', 'unarchived');
        project.save();
      });
    },

    isNotEditing(id) {
      this.set('isEditing', false);

      // go the project route on cancel
      getOwner(this).lookup('route:project.project').transitionTo('project.project', id);
    },

    isEditing(id) {
      this.set('isEditing', true);
      getOwner(this).lookup('route:project.project.edit').transitionTo('project.project.edit', id);
    }
  }
});
