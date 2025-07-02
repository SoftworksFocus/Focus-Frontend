<template>
  <div class="activity-list">
    <h2>Feed de Atividades</h2>

    <div v-if="atividades.length" class="activity-card">
      <atividade
        v-for="item in atividades"
        :key="item.id"
        :atividade="item"
      />
    </div>

    <p v-else class="no-activities-message">Nenhuma atividade encontrada.</p>
  </div>
</template>

<script>
import axios from 'axios';
import atividade from './atividade.vue';
import Atividade from '../view/AtividadeDetalhes.vue';

export default {
  name: 'Feed',
  components: { atividade },
  data() {
    return {
      atividades: []
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://localhost:5135/api/Activity');
      this.atividades = response.data;
    } catch (error) {
      console.error("Erro ao buscar atividades:", error.message);
    }
  },
  methods:{
      Atividade(){
      this.$router.push({name:Atividade});
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
.atividade-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: box-shadow 0.2s ease;
}
</style>