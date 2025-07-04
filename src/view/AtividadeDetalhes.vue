<template>
  <div v-if="atividade" class="detalhe-container">
    <h2>{{ atividade.title }}</h2>
    <p>{{ atividade.description }}</p>
    <p>Status: {{ atividade.status ? 'Ativa' : 'Inativa' }}</p>
    <p>Usuário: {{ atividade.user?.username }}</p>
    <p>Grupo: {{ atividade.group?.name }}</p>

    <div v-if="atividade.media && atividade.media.length">
      <h4>Mídia:</h4>
      <ul>
        <li v-for="m in atividade.media" :key="m.id">
          <video v-if="eVideo(m.url)" controls width="300">
            <source :src="m.url" type="video/mp4" />
          </video>
          <img v-else :src="m.url" width="200" />
          <p>{{ m.caption }}</p>
        </li>
      </ul>
    </div>

    <div class="botoes">
      <button @click="voltar">← Voltar</button>
      <button @click="editarAtividade">✏️ Editar</button>
      <button @click="excluirAtividade" class="btn-danger">🗑️ Excluir</button>
    </div>
  </div>

  <p v-else>Carregando...</p>
</template>

<script>
import api from '../api';
export default {
    name:'AtividadeDetalhes',
  data() {
    return {
      atividade: null
    };
  },
  async mounted() {
    try {
      const idAtividade = this.$route.params.id;
      const res = await api.get(`/Activity/${idAtividade}`);
      console.log(res.data)
      this.atividade = res.data;
    } catch (error) {
      console.error("Erro ao carregar atividade:", error.message);
    }
  },
  methods: {
    eVideo(url) {
      return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg');
    },
    voltar() {
      this.$router.push('/Homepage');
    },
    editarAtividade() {
      this.$router.push(`/atividade/${this.id}/editar`);
    },
    async excluirAtividade() {
      if (confirm('Tem certeza que deseja excluir esta atividade?')) {
        try {
          const id = this.$route.params.id;
          await api.delete(`/Activity/${id}`);
          alert('Atividade excluída com sucesso.');
          this.$router.push('/Homepage');
        } catch (err) {
          console.error("Erro ao excluir:", err.message);
          alert('Erro ao excluir.');
        }
      }
    }
  }
};
</script>

<style scoped>
.detalhe-container {
  border: 1px solid #ccc;
  padding: 24px;
  border-radius: 10px;
  margin: 20px auto;
  max-width: 700px;
  background-color: #fefefe;
}

.botoes {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

button {
  padding: 10px 16px;
  border-radius: 6px;
  border: none;
  background-color: #3498db;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background-color: #2980b9;
}

.btn-danger {
  background-color: #e74c3c;
}
.btn-danger:hover {
  background-color: #c0392b;
}
</style>