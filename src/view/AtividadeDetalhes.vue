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
      <BotaoCriarFlutuante/>
      <button @click="voltar">← Voltar</button>
      <button @click="PopupEdicao">✏️ Editar</button>
      <button @click="excluirAtividade" class="btn-danger">🗑️ Excluir</button>
    </div>
    
  </div>

  <p v-else>Carregando...</p>
   <div v-if="showEditPopup" class="popup-backdrop" @click.self="fecharPopupEdicao">
    <div class="popup-content">
      <h2>Editar Atividade</h2>
      <form @submit.prevent="salvarEdicao">
        <div class="form-group">
          <label for="title">Título:</label>
          <input type="text" id="title" v-model="editedActivity.title" />
        </div>
        <div class="form-group">
          <label for="description">Descrição:</label>
          <textarea id="description" v-model="editedActivity.description"></textarea>
          <input type="datetime-local" v-model="editedActivity.startDate" class="popup-input"/>
        <input type="datetime-local" v-model="editedActivity.endDate" class="popup-input"/>
        </div>
        <div class="popup-botoes">
          <button type="button" @click="PopupEdicao" class="btn-cancel">Cancelar</button>
          <button type="submit" class="btn-save">Salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BotaoCriarFlutuante from '@/components/botaoCriarFlutuante.vue';
import api from '../api';
export default {
    name:'AtividadeDetalhes',
  data() {
    return {
      atividade: null,
      showEditPopup: false,
      editedActivity: {
        title: '',
        description: '',
        startDate:"",
        endDate:""
      }
    };
  },
  components:{BotaoCriarFlutuante},
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
    PopupEdicao() {
      if (this.atividade) {
        this.editedActivity = { ...this.atividade };
        this.showEditPopup = !this.showEditPopup;
      }
    },
    async salvarEdicao() {
      try {
        const id = this.$route.params.id;
        await api.put(`/Activity/${id}`,{
          title:this.editedActivity.title,
          description:this.editedActivity.description,
          startDate: this.editedActivity.startDate,
          endDate: this.editedActivity.endDate
        });
        this.atividade = { ...this.editedActivity };
        this.PopupEdicao();
      } catch (err) {
        console.error("Erro ao salvar a edição:", err.message);
        alert('Erro ao salvar a edição.');
      }
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
*ul{
  list-style-type: none;
}
.popup-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  width: 90%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.popup-botoes {
  text-align: right;
  margin-top: 20px;
}

.popup-botoes .btn-cancel {
  background-color: #ccc;
  margin-right: 10px;
}

.popup-botoes .btn-save {
  background-color: #3498db;
}
.modal-input{ width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid var(--border-color); border-radius: 5px; background-color: var(--body-bg); color: var(--text-color); box-sizing: border-box; }
@media (max-width: 768px) {
  .detalhe-container {
    padding: 15px;
    margin: 10px;
  }
  
  .botoes {
    flex-direction: column;
  }

  .botoes button {
    width: 100%;
  }
}
</style>