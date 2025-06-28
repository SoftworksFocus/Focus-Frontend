<template>
  <div>
    <h2>Feed de Atividades</h2>

    <div v-if="atividades.length">
      <Atividade
        v-for="item in atividades"
        :key="item.id"
        :atividade="item"
      />
    </div>

    <p v-else>Nenhuma atividade encontrada.</p>
  </div>
</template>

<script>
import axios from 'axios';
import Atividade from './atividade.vue';

export default {
  name: 'Feed',
  components: { Atividade },
  data() {
    return {
      atividades: []
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5135/1');
      this.atividades = response.data;
    } catch (error) {
      console.error("Erro ao buscar atividades:", error.message);
    }
  }
};
</script>

<style scoped>
.activity-list {
  margin-top: 15px;
  border-top: 1px solid var(--border-color);
  padding-top: 15px;
}

.activity-list h4 {
  font-size: 1.2em;
  color: var(--text-color-secondary); 
  margin-top: 0;
  margin-bottom: 10px;
}

.no-activities-message {
  font-style: italic;
  color: var(--text-color-secondary); 
  text-align: center;
  padding: 10px 0;
}
</style>