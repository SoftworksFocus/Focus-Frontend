<template>
  <div class="page-container">
    <button @click="voltar" class="btn-voltar">← Voltar</button>

    <div v-if="atividade" class="detalhe-card">
      <header class="detalhe-header">
        <div class="header-info">
          <div class="info-bloco">
            <img :src="atividade.user?.profilePictureUrl || require('@/assets/icon.png')" alt="User" class="avatar">
            <span>{{ atividade.user?.username || 'Usuário' }}</span>
          </div>
          <div class="info-bloco" v-if="atividade.group">
            <img :src="atividade.group?.profilePictureUrl || require('@/assets/icon_group.png')" alt="Group" class="avatar">
            <span>{{ atividade.group?.name || 'Grupo' }}</span>
          </div>
        </div>

        <div class="header-actions" v-if="isOwner">
          <button @click="PopupEdicao" class="action-btn">EDIT</button>
          <button @click="excluirAtividade" class="action-btn btn-danger">Excluir</button>
        </div>
      </header>

      <main class="detalhe-body">
        <BotaoCriarFlutuante />
        <h2 class="detalhe-titulo">{{ atividade.title }}</h2>
        <p class="detalhe-descricao">{{ atividade.description }}</p>
        <div class="detalhe-datas">
          <span>Início: {{ formatarData(atividade.startDate) }}</span>
          <span>Fim: {{ formatarData(atividade.endDate) }}</span>
        </div>
      </main>

      <div v-if="atividade.media && atividade.media.length" class="media-container">
        <div v-for="m in atividade.media" :key="m.id" class="media-item">
          <video v-if="eVideo(m.url)" :src="m.url" controls></video>
          <img v-else :src="m.url" alt="Mídia da atividade" />
        </div>
      </div>
    </div>

    <p v-else class="loading-text">Carregando...</p>

    <div v-if="showEditPopup" class="popup-backdrop" @click.self="PopupEdicao">
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
            <label>Início:</label>
            <input type="datetime-local" v-model="editedActivity.startDate" class="modal-input"/>
            <label>Fim:</label>
            <input type="datetime-local" v-model="editedActivity.endDate" class="modal-input"/>
          </div>
          <div class="popup-botoes">
            <button type="button" @click="PopupEdicao" class="btn-cancel">Cancelar</button>
            <button type="submit" class="btn-save">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BotaoCriarFlutuante from '@/components/botaoCriarFlutuante.vue';
import api from '../api';
import { getLoggedInUsername, formatarDataParaExibicao} from '@/utils/auth';
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
  created(){
    this.applyTheme();
  },
  async mounted() {
    try {
      const idAtividade = this.$route.params.id;
      const res = await api.get(`/api/Activity/${idAtividade}`);
      this.atividade = res.data;
    } catch (error) {
      console.error("Erro ao carregar atividade:", error.message);
    }
  },
  methods: {
    applyTheme(){
            if (this.isDark) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
            console.log("themeCheckbox: applyTheme ativado. Tema:", this.isDark ? 'dark' : 'light');
    },
    formatarData(dataString) {
      return formatarDataParaExibicao(dataString);
    },
    eVideo(url) {
      if(!url) return false;
      return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg');
    },
    voltar() {
      this.$router.go(-1);
    },
    PopupEdicao() {
      if (this.atividade) {
        this.editedActivity = { ...this.atividade };
        this.editedActivity.startDate = this.atividade.startDate?.slice(0, 16);
        this.editedActivity.endDate = this.atividade.endDate?.slice(0, 16);
        this.showEditPopup = !this.showEditPopup;
      }
    },
    async salvarEdicao() {
      try {
        const id = this.$route.params.id;
        await api.put(`/api/Activity/${id}`,{
          title: this.editedActivity.title,
          description: this.editedActivity.description,
          startDate: this.editedActivity.startDate,
          endDate: this.editedActivity.endDate
        });
        const res = await api.get(`/api/Activity/${id}`);
        this.atividade = res.data;
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
          await api.delete(`/api/Activity/${id}`);
          alert('Atividade excluída com sucesso.');
          this.$router.push({ name: 'Homepage' });
        } catch (err) {
          console.error("Erro ao excluir:", err.message);
          alert('Erro ao excluir.');
        }
      }
    }
  },
   computed: {
    isOwner() {

      if (!this.atividade || !this.atividade.user || !this.atividade.user.username) {
        return false;
      }
      const loggedInUsername = getLoggedInUsername();
      return loggedInUsername === this.atividade.user.username;
    }
  },
};
</script>

<style scoped>
.page-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.btn-voltar {
  margin-bottom: 20px;
  background: var(--button-default-bg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
}

.detalhe-card {
  background-color: var(--card-bg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detalhe-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.header-info {
  display: flex;
  gap: 10px;
}

.info-bloco {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  font-size: 0.9em;
}

.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  background: none;
  border: 1px solid var(--text-color);
  color: var(--text-color);
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
.action-btn.btn-danger {
  border-color: #e74c3c;
  color: #e74c3c;
}
.action-btn:hover {
  background-color: var(--border-color);
}
.action-btn.btn-danger:hover {
  background-color: #e74c3c;
  color: white;
}

.detalhe-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detalhe-titulo {
  font-size: 2em;
  font-weight: bold;
  margin: 0;
}

.detalhe-descricao {
  font-size: 1em;
  color: var(--text-color-secondary);
  margin: 0;
}

.detalhe-datas {
  font-size: 0.9em;
  color: var(--text-color-secondary);
  display: flex;
  gap: 16px;
}

.media-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

.media-item {
  width: 100%;
  aspect-ratio: 1 / 1; 
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.media-item img,
.media-item video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.loading-text {
  text-align: center;
  font-size: 1.2em;
  color: var(--text-color-secondary);
}

.popup-backdrop { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.popup-content { background: var(--card-bg); color: var(--text-color); padding: 25px; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); width: 90%; max-width: 500px; }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 5px; margin-top: 10px; }
.form-group input, .form-group textarea, .modal-input { width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 4px; background-color: var(--body-bg); color: var(--text-color); box-sizing: border-box; }
.popup-botoes { text-align: right; margin-top: 20px; display: flex; gap: 10px; justify-content: flex-end; }
.popup-botoes .btn-cancel, .popup-botoes .btn-save { padding: 10px 16px; border-radius: 6px; border: none; font-weight: bold; cursor: pointer; }
.popup-botoes .btn-cancel { background-color: var(--button-default-bg); color: var(--text-color); border: 1px solid var(--border-color); }
.popup-botoes .btn-save { background-color: #3498db; color: white; }
</style>