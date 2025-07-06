<template>
  <div class="page-container">
    <button @click="$router.back()" class="btn-voltar">← Voltar</button>

    <div v-if="isLoading" class="loading-spinner">
      <p>Carregando grupo...</p>
    </div>

    <div v-else-if="grupo" class="grupo-detalhe">
      <header class="grupo-header">
        <img :src="grupo.profilePictureUrl"  alt="Banner do Grupo" class="grupo-imagem">
        <div class="grupo-info">
          <h1 class="grupo-nome">{{ grupo.name }}</h1>
          <p class="grupo-descricao">{{ grupo.description }}</p>
          <button class="btn-primary">Entrar no Grupo</button>
        </div>
      </header>

      <main class="grupo-conteudo">
        <h2>Atividades do Grupo</h2>
        <div v-if="atividades.length > 0" class="feed-content">
           <atividade
             v-for="item in atividades"
             :key="item.id"
             :atividade="item"
           />
        </div>
        <p v-else class="no-activities-message">
          Este grupo ainda não tem atividades.
        </p>
      </main>

    </div>

    <div v-else class="error-message">
      <p>Não foi possível carregar as informações do grupo. Tente novamente mais tarde.</p>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import atividade from '@/components/atividade.vue';

export default {
  name: 'GrupoDetalhe',
  components: {
    atividade
  },
  data() {
    return {
      grupo: null,
      atividades: [],
      isLoading: true,
      erro: null,
    }
  },
  methods: {
    async carregarDetalhesDoGrupo() {
      this.isLoading = true;
      const grupoId = this.$route.params.id;

      try {
        const [detalhesResponse, atividadesResponse] = await Promise.all([
          api.get(`/Group/${grupoId}`),
          api.get('/activity',{
            params:{
                groupId:grupoId,
            }
          }) 
        ]);

        this.grupo = detalhesResponse.data;
        this.atividades = atividadesResponse.data.items || [];

      } catch (err) {
        this.erro = "Falha ao carregar os dados do grupo.";
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    }
  },
  created() {
    this.carregarDetalhesDoGrupo();
  }
}
</script>

<style scoped>
.page-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 15px;
}

.btn-voltar {
  margin-bottom: 20px;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid var(--border-color);
  background-color: var(--button-default-bg);
  color: var(--text-color);
  cursor: pointer;
  transition: background-color 0.2s;
}
.btn-voltar:hover {
  background-color: var(--button-default-bg);
}

.grupo-header {
  margin-bottom: 30px;
  background-color: var(--card-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
}

.grupo-imagem {
  width: 180px; 
  height: 180px; 
  border-radius: 8px;
  object-fit: cover;}

.grupo-info {
  padding: 20px;
}

.grupo-nome {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 2em;
}

.grupo-descricao {
  font-size: 1.1em;
  color: var(--text-color-secondary);
  margin-bottom: 20px;
}

.btn-primary {
    padding: 10px 25px;
    border: none;
    border-radius: 25px;
    background: var(--button-primary-bg);
    color: var(--button-primary-text-color);
    font-size: 1em;
    cursor: pointer;
    transition: filter 0.2s;
}
.btn-primary:hover {
    filter: brightness(0.9);
}

.loading-spinner, .error-message, .no-activities-message {
  text-align: center;
  padding: 50px;
  font-size: 1.2em;
  color: var(--text-color-secondary);
}

.feed-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>