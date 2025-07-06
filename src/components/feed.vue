<template>
  <div class="activity-list">
    <h2>Feed de Atividades</h2>

    <p v-if="atividades.length === 0 && !isLoading" class="no-activities-message">
      Nenhuma atividade encontrada.
    </p>

    <div v-else class="feed-content">
      <atividade
        v-for="item in atividades"
        :key="item.id"
        :atividade="item"
      />
    </div>

    <div v-if="isLoading" class="loading-spinner">
      <p>Carregando...</p>
    </div>

  </div>
</template>

<script>
import api from '@/api';
import atividade from './atividade.vue';
import AtividadeDetalhes from '@/view/AtividadeDetalhes.vue';
import { getUserIdFromToken } from '@/utils/auth';
export default {
  data(){
    return{
      atividades: [],      
      isLoading: false,
      nextCursor: null,    
      hasNextCursor: true, 
      pageSize: 10,        
    }
  },

    components:{atividade},
    mounted() {
    this.loadMoreActivities();
    window.addEventListener('scroll', this.handleScroll);
},
 beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods:{
    Atividade(){
      this.$router.push({name:AtividadeDetalhes})
    },
    handleScroll() {
      if (this.isLoading || !this.hasNextCursor) return;
      const nearBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200;

      if (nearBottom) {
        this.loadMoreActivities();
      }
    },
    async loadMoreActivities() {
      const userId = getUserIdFromToken();
      if (this.isLoading) return;
      this.isLoading = true;

      try {
        const response = await api.get(`/Feed/${userId}`, {
          params: {
            cursor: this.nextCursor, 
            pageSize: this.pageSize,
          }
        });
        
        this.atividades.push(...response.data.activities);

        this.nextCursor = response.data.nextCursor;
        
        this.hasNextCursor = this.nextCursor !== null;

      } catch (error) {
        console.error("Erro ao buscar mais atividades:", error);
        this.hasNextCursor = false; 
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>
<style scoped>
.activity-list {
  margin-top: 15px;
  border-top: 1px solid var(--border-color);
  padding-top: 15px;
}

.activity-list h2 {
  font-size: 1.5em;
  color: var(--text-color);
  margin-bottom: 20px;
}

.loading-spinner, .no-activities-message {
  text-align: center;
  padding: 40px;
  font-style: italic;
  color: var(--text-color-secondary);
}

.load-more-container {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.btn-load-more {
  padding: 10px 25px;
  border: 1px solid var(--border-color);
  background-color: var(--button-default-bg);
  color: var(--button-text-color);
  border-radius: 25px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  transition: background-color 0.2s, color 0.2s;
}

.btn-load-more:hover {
  background-color: var(--link-color);
  color: var(--button-primary-text-color);
  border-color: var(--link-color);
}
</style>