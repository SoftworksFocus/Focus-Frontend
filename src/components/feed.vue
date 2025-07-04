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
    <div v-if="!isLoading && totalAtividades > 0" class="pagination-controls">
      <button @click="paginaAnterior" :disabled="!temPaginaAnterior" class="btn-pagination">
        Anterior
      </button>
      <span class="pagination-info">
        Página {{ currentPage }} de {{ totalPages }}
      </span>
      <button @click="proximaPagina" :disabled="!temProximaPagina" class="btn-pagination">
        Próximo
      </button>
    </div>
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
      isLoading: true, 
      currentPage: 1,
      pageSize: 10, 
      totalAtividades: 0,
      totalPages:0
    }
  },
  computed: {
    temPaginaAnterior() {
      return this.currentPage > 1;
    },
    temProximaPagina() {
      return this.currentPage < this.totalPages;
    }
  },
    components:{atividade},
    async mounted() {
      this.fetchAtividades(this.currentPage)
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
    },
    proximaPagina() {
      if (this.temProximaPagina) {
        this.fetchAtividades(this.currentPage + 1);
      }
      },
    paginaAnterior() {
      if (this.temPaginaAnterior) {
        this.fetchAtividades(this.currentPage - 1);
      }
      },
     async fetchAtividades(page) {
        this.isLoading = true;
        try {
            const response = await api.get('/Activity', {
            params: {
                page: page,
                pageSize: this.pageSize
            }
            });

            this.atividades = response.data.items;
            this.totalAtividades = response.data.totalCount;
            this.currentPage = page;
            this.totalPages = response.data.totalPages;

      } catch (error) {
        console.error("Erro ao buscar atividades paginadas:", error);
      } finally {
        this.isLoading = false;
      }
    },
  }
}
</script>
<style scoped>
.activity-list {
  margin-top: 15px;
  border-top: 1px solid var(--border-color);
  padding-top: 15px;
}


.loading-spinner {
  text-align: center;
  padding: 40px;
  font-style: italic;
  color: var(--text-color-secondary);
}

.no-activities-message {
  font-style: italic;
  color: var(--text-color-secondary); 
  text-align: center;
  padding: 20px 0;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 15px;
}

.pagination-info {
  font-weight: bold;
  color: var(--text-color);
}

.btn-pagination {
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  background-color: var(--button-default-bg);
  color: var(--button-text-color);
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.btn-pagination:hover:not(:disabled) {
  background-color: var(--link-color);
  color: var(--button-primary-text-color);
  border-color: var(--link-color);
}

.btn-pagination:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>