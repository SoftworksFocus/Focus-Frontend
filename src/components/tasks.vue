<template>
  <div class="task-item">
    <Checkbox :modelValue="task.concluida" @update:modelValue="toggleConcluida">
      <span :class="{ 'task-completed': task.concluida }">{{ task.descricao }}</span>
    </Checkbox>
    <div class="task-dates">
      <small>Início: {{ formatDateTime(task.dataInicio) }}</small>
      <small>Fim: {{ formatDateTime(task.dataFim) }}</small>
    </div>
  </div>
</template>

<script>
import Checkbox from './checkbox.vue';
import { format } from 'date-fns'; 

export default {
  name: 'Tasks',
  components: {
    Checkbox
  },
  props: {
    task: {
      type: Object,
      required: true,
      validator: (value) => {
        return (
          typeof value.id === 'string' &&
          typeof value.descricao === 'string' &&
          typeof value.concluida === 'boolean' &&
          typeof value.dataInicio === 'string' &&
          typeof value.dataFim === 'string'
        );
      },
    },
  },
  emits: ['toggle-task'], 
  methods: {
    toggleConcluida(newValue) {
      this.$emit('toggle-task', { taskId: this.task.id, newStatus: newValue });
    },
    formatDateTime(isoString) {
      if (!isoString) return 'N/A';
      try {
        return format(new Date(isoString), 'dd/MM/yyyy HH:mm');
      } catch (e) {
        console.error('Erro ao formatar data:', e);
        return 'Data Inválida';
      }
    },
  },
};
</script>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between; 
  padding: 8px 0;
  border-bottom: 1px dashed var(--border-color); 
  background-color: var(--task-item-bg); 
  color: var(--text-color); 
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
.task-item:last-child {
  border-bottom: none;
}
.task-completed {
  text-decoration: line-through;
  color: var(--completed-task-color); 
}
.task-dates {
  display: flex;
  flex-direction: column;
  font-size: 0.75em;
  color: var(--text-color-secondary); 
  text-align: right;
  min-width: 120px; 
}
</style>