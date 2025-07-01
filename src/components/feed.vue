<template>
  <div class="activity-list">
    <h2>Feed de Atividades</h2>

    <div v-if="atividades.length">
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
  async created() {
    try {
      const response = await axios.get('http://localhost:5135/1');
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
</style>