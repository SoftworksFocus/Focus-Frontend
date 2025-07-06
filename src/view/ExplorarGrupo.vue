<template>
  <div class="page-container">
    <Sidebar />
    <BotaoCriarFlutuante />
    
    <h1>Explorar Grupos</h1>
    
    <div class="search-bar">
      <input type="text" v-model="searchTerm" placeholder="Pesquisar por nome...">
    </div>

    <div v-if="pesquisaGrupos.length > 0" class="grupos-grid">
      <Grupos 
        v-for="grupo in pesquisaGrupos"
        :key="grupo.id"
        :grupo="grupo"
        @grupo-selecionado="irParaGrupo"
      />
    </div>
    <div v-else class="no-results">
      <p>Nenhum grupo encontrado.</p>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import BotaoCriarFlutuante from '@/components/botaoCriarFlutuante.vue';
import Grupos from '@/components/Grupos.vue';
import api from '@/api';

export default {
    name: 'ExplorarGrupos',
    components: {
        Sidebar,
        BotaoCriarFlutuante,
        Grupos
    },
    data() {
        return {
            searchTerm: "",
            grupos: [],
        }
    },
    computed: {
        pesquisaGrupos() {
            if (!this.searchTerm) {
                return this.grupos;
            }
            return this.grupos.filter(grupo => 
                grupo.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
    },
    methods: {
        irParaGrupo(grupoId) {
            this.$router.push({ name: 'GrupoDetalhe', params: { id: grupoId } });
        },
        async carregarGrupos() {
            try {
                const response = await api.get('/Group');
                this.grupos = response.data.items;
            } catch (error) {
                console.error("Falha ao carregar grupos:", error);
            }
        }
    },
    mounted() {
        this.carregarGrupos();
    }
}
</script>

<style scoped>

.page-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  padding-left: 80px; 
}
.search-bar { margin-bottom: 25px; }
.search-bar input { width: 100%; padding: 12px 15px; border-radius: 25px; border: 1px solid var(--border-color); background-color: var(--body-bg); color: var(--text-color); font-size: 1em; }
.no-results { text-align: center; margin-top: 50px; color: var(--text-color-secondary); }
.grupos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
@media (max-width: 768px) {
  .page-container {
    padding-left: 20px;
  }

  .grupos-grid {
    grid-template-columns: 1fr; 
  }
}
</style>