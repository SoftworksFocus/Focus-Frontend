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
import api from '@/api';
import atividade from './atividade.vue';
import AtividadeDetalhes from '@/view/AtividadeDetalhes.vue';
export default {
  data(){
    return{
      atividades:[],
    }
  },
    components:{atividade},
    async mounted() {
    try {
      const response = await api.get('/Activity');
      this.atividades = response.data.items;
    } catch (error) {
      if (error.response?.status !== 401 && error.response?.status !== 500) {
       console.error("Falha ao carregar o feed:", error);
    }
  }
},
  methods:{
    Atividade(){
      this.$router.push({name:AtividadeDetalhes})
    }
  }
}
</script>