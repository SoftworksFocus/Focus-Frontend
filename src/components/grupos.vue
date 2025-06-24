<template>
   <Card class="group-card">
    <template #header>
      <div class="group-header">
        <img :src="group.imageUrl" :alt="group.name" class="group-image" v-if="group.imageUrl" />
        <h3 class="group-name">{{ group.name }}</h3>
      </div>
    </template>

    <div class="task-list">
      <h4>Checklist:</h4>
      <Tasks
        v-for="task in group.tasks" 
        :key="task.id" 
        :task="task" 
        @toggle-task="handleTaskToggle"
      />
      <p v-if="group.tasks.length === 0" class="no-tasks-message">Nenhuma tarefa neste grupo.</p>
    </div>
  </Card>
</template>

<script>
import Card from './card.vue';
import Tasks from './tasks.vue';

export default {
  name: 'Grupos',
  components: {
    Card,
    Tasks,
  },
  props: {
    group: {
      type: Object,
      required: true,
      validator: (value) => {
        return (
          typeof value.id === 'string' &&
          typeof value.name === 'string' &&
          Array.isArray(value.tasks) &&
          (typeof value.imageUrl === 'string' || value.imageUrl === null || value.imageUrl === undefined)
        );
      },
    },
  },
  emits: ['toggle-group-task'],
  methods: {
    handleTaskToggle({ taskId, newStatus }) {
      this.$emit('toggle-group-task', { groupId: this.group.id, taskId, newStatus });
    },
  },
};
</script>

<style scoped>
.group-card {
  display: flex;
  flex-direction: column; 
}

.group-header {
  text-align: center;
  margin-bottom: 15px;
}

.group-image {
  width: 100%;
  max-height: 150px; 
  object-fit: cover; 
  border-radius: 6px;
  margin-bottom: 10px;
}

.group-name {
  font-size: 1.6em;
  color: var(--text-color); 
  margin: 0;
}

.task-list {
  margin-top: 15px;
  border-top: 1px solid var(--border-color);
  padding-top: 15px;
}

.task-list h4 {
  font-size: 1.2em;
  color: var(--text-color-secondary); 
  margin-top: 0;
  margin-bottom: 10px;
}

.no-tasks-message {
  font-style: italic;
  color: var(--text-color-secondary); 
  text-align: center;
  padding: 10px 0;
}
</style>