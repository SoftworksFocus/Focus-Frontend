<template>
  <div class="page-container">
    <BotaoCriarFlutuante />
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
           <div class="group-actions">
            <button v-if="!user.isMember" @click="joinGroup" class="btn-primary">
              Entrar no Grupo
            </button>
            <button v-if="user.isAdmin" @click="EditPopup" class="btn-secondary">
                Editar Grupo
              </button>
              <button v-if="user.isAdmin" @click="DeletarGrupo" class="btn-danger"> Deletar Grupo</button>
            <div v-if="user.isMember && !user.isAdmin">
              <button @click="leaveGroup" class="btn-danger">Sair do Grupo</button>
            </div>
        </div>
    </div>
      </header>

      <main class="grupo-conteudo">
        <ul v-if="members.length > 0" class="lista-membros">
  <li v-for="membro in members" :key="membro.id" class="membro-item">
    <span class="membro-nome">{{ membro.username }}</span>
    <div class="membro-info-direita">
      <span v-if="membro.isAdmin" class="membro-cargo">Admin</span>
      
      <div v-if="user.isAdmin && user.id !== membro.id" class="membro-actions">
        <button @click.stop="toggleDropdown(membro.id)" class="btn-opcoes">
          ⋮
        </button>
        <div v-if="dropdownAberto === membro.id" class="dropdown-menu">
          <div @click="tornarAdmin(membro.id)" class="dropdown-item">Tornar Admin</div>
          <div @click="banirMembro(membro.id)" class="dropdown-item perigo">Banir Membro</div>
        </div>
      </div>
    </div>
  </li>
</ul>
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
   <div v-if="showEditPopup" class="edit-popup-backdrop" @click.self="EditPopup(false)">
  <div class="edit-popup-content">
    <h2>Editar Informações do Grupo</h2>
    <form @submit.prevent="saveChanges" class="edit-form">
      <div class="form-group">
        <label for="groupName">Nome do Grupo:</label>
        <input id="groupName" type="text" v-model="editableGroup.name" required>
      </div>
      <div class="form-group">
        <label for="groupDescription">Descrição:</label>
        <textarea id="groupDescription" v-model="editableGroup.description" required></textarea>
      </div>
      <div class="form-actions">
        <button type="submit" @click="saveGroupChanges" class="btn-primary">Salvar Alterações</button>
        <button type="button" @click="EditPopup(false)" class="btn-secondary">Cancelar</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import api from '@/api';
import atividade from '@/components/atividade.vue';
import BotaoCriarFlutuante from '@/components/botaoCriarFlutuante.vue';
import { getUserIdFromToken } from '@/utils/auth';

export default {
  name: 'GrupoDetalhe',
  components: {
    atividade, BotaoCriarFlutuante
  },
  data() {
    return {
      grupo: null,
      atividades: [],
      members: [],
      isLoading: true,
      erro: null,
        user: {
        id: null, 
        isMember: false, 
        isAdmin: false, 
      },
      showEditPopup: false,
      editableGroup: {},
      dropdownAberto:null,
    }
  },
   watch: {
    grupo(newGroup) {
      if (newGroup) {
        this.editableGroup = { ...newGroup };
      }
    }
  },
  methods: {
    EditPopup() {
      this.editableGroup = { ...this.grupo }; 
      this.showEditPopup = !this.showEditPopup;
    },
    toggleDropdown(membroId) {
    if (this.dropdownAberto === membroId) {
      this.dropdownAberto = null;
    } else {
      this.dropdownAberto = membroId;
    }
  },
  fecharDropdowns() {
    this.dropdownAberto = null;
  },
  async tornarAdmin(membroId) {
    const grupoId = this.grupo.id;
    this.dropdownAberto = null;
    if (confirm(`Tem certeza que deseja tornar este membro um administrador?`)) {
      try {
        await api.put(`User/toggle-admin/${grupoId}/${membroId}`);
        alert('Membro promovido a administrador com sucesso.');
        this.carregarDetalhesDoGrupo();
      } catch (error) {
        console.error("Erro ao promover membro:", error);
        alert('Falha ao promover membro.');
      }
    }
  },

  async banirMembro(membroId) {
    const grupoId = this.grupo.id;
    this.dropdownAberto = null;
    if (confirm(`Tem certeza que deseja banir este membro do grupo?`)) {
      try {
        await api.delete(`/Group/${grupoId}/members/${membroId}`);
        alert('Membro banido com sucesso.');
        this.carregarDetalhesDoGrupo();
      } catch (error) {
        console.error("Erro ao banir membro:", error);
        alert('Falha ao banir membro.');
      }
    }
  },
    async saveGroupChanges() {
      try {
        const response = await api.put(`/Group/${this.editableGroup.id}`, {
          name: this.editableGroup.name,
          description: this.editableGroup.description,
        });
        this.grupo = response.data; 
        alert('Grupo atualizado com sucesso!');
        this.EditPopup();
        window.location.reload();
      } catch (error) {
        console.error('Erro ao atualizar o grupo:', error);
        alert('Não foi possível salvar as alterações.');
      }
    },
     async joinGroup() {
        const userId = getUserIdFromToken();
        const grupoId = this.$route.params.id;
      if (!userId) {
        alert('Você precisa estar logado para entrar em um grupo.');
        return;
      }
      try {
        await api.post(`/user/join/${grupoId}/${userId}`, {
          userId: userId,
        });
        alert(`Você entrou no grupo "${this.grupo.name}"!`);
        this.carregarDetalhesDoGrupo(); 
      } catch (error) {
        console.error('Erro ao entrar no grupo:', error);
        alert('Não foi possível entrar no grupo.');
      }
    },
    async leaveGroup() {
        const userId = getUserIdFromToken();
        const grupoId = this.$route.params.id;
      if (!userId) {
        alert('Você precisa estar logado para sair de um grupo.');
        return;
      }
      if (confirm('Tem certeza que deseja sair deste grupo?')) {
        try {
          await api.delete(`/User/leave/${grupoId}/${userId}`, {
            userId: userId,
          });
          alert(`Você saiu do grupo "${this.grupo.name}".`);
          this.carregarDetalhesDoGrupo();
        } catch (error) {
          console.error('Erro ao sair do grupo:', error);
          alert('Não foi possível sair do grupo.');
        }
      }
    },
    async carregarDetalhesDoGrupo() {
      this.isLoading = true;
      const grupoId = this.$route.params.id;
      this.user.id = getUserIdFromToken();
       if (!this.user.id) {
        console.error("Não foi possível obter o ID do usuário do token.");
        this.isLoading = false;
        return;
      }
      try {
        const [detalhesResponse, atividadesResponse, membrosResponse] = await Promise.all([
          api.get(`/Group/${grupoId}`),
          api.get('/activity', { params: { groupId: grupoId } }),
          api.get(`/Group/${grupoId}/members`)
        ]);

        this.grupo = detalhesResponse.data;
        this.atividades = atividadesResponse.data.items || [];
        this.members = membrosResponse.data || [];
        this.verificarStatusDoUsuario();
      } catch (err) {
        this.erro = "Falha ao carregar os dados do grupo.";
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    async DeletarGrupo(){
      const grupoId = this.$route.params.id;
      if (confirm('Tem certeza que deseja DELETAR este grupo? Esta ação é irreversível.')) { 
      try{
            await api.delete(`/Group/${grupoId}`)
            this.carregarDetalhesDoGrupo();
            this.$router.push({name:'ExplorarGrupo'})
        }catch(error){
        this.erro = "Falha ao deletar o grupo.";  
        }
    }
},

    verificarStatusDoUsuario() {
        if (!this.user.id || !this.members || this.members.length === 0) {
            this.user.isMember = false;
            this.user.isAdmin = false;
            return;
        }
        const meuStatus = this.members.find(membro => String(membro.id) === String(this.user.id));

        if (meuStatus) {
            this.user.isMember = true;
            this.user.isAdmin = meuStatus.isAdmin === true;
        } else {
            this.user.isMember = false;
            this.user.isAdmin = false;
        }

        console.log('Status do usuário verificado:', {
            isMember: this.user.isMember,
            isAdmin: this.user.isAdmin
        });
    }
  },
  created() {
    this.carregarDetalhesDoGrupo();
  },
  mounted() {
  window.addEventListener('click', this.fecharDropdowns);
},
beforeUnmount() {
  window.removeEventListener('click', this.fecharDropdowns);
},
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
.btn-primary,
.btn-danger,
.btn-secondary {
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}
.group-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
.membros-container {
    background-color: var(--card-bg);
    padding: 20px;
    border-radius: 8px;
    box-shadow: var(--card-shadow);
    margin-bottom: 30px;
}
.membros-container h2 {
    margin-top: 0;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 10px;
    margin-bottom: 15px;
}
.lista-membros {
    list-style-type: none;
    padding: 0;
}
.membro-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid var(--border-color);
}
.membro-item:last-child {
    border-bottom: none;
}
.membro-nome {
    font-weight: bold;
}
.membro-cargo {
    background-color: var(--button-primary-bg);
    color: var(--button-primary-text-color);
    font-size: 0.8em;
    padding: 3px 8px;
    border-radius: 10px;
    text-transform: uppercase;
}
.edit-popup-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: opacity 0.3s ease;
}

.edit-popup-content {
  background-color: var(--card-bg);
  padding: 25px 30px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  width: 90%;
  max-width: 500px;
  transition: transform 0.3s ease;
}

.edit-popup-content h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-color);
  text-align: center;
}

.edit-form .form-group {
  margin-bottom: 20px;
}

.edit-form label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: var(--text-color-secondary);
}

.edit-form input[type="text"],
.edit-form textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--border-color);
  background-color: var(--body-bg);
  color: var(--text-color);
  font-size: 1rem;
}

.edit-form textarea {
  resize: vertical;
  min-height: 100px;
}

.edit-form .form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 25px;
}


.form-actions .btn-primary,
.form-actions .btn-secondary {
    padding: 10px 20px;
    font-size: 1rem;
}
.membro-info-direita {
  display: flex;
  align-items: center;
  gap: 10px;
}

.membro-actions {
  position: relative;
}

.btn-opcoes {
  background: none;
  border: none;
  padding: 5px;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  color: var(--text-color-secondary);
}

.btn-opcoes:hover {
  background-color: var(--body-bg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 100;
  width: 150px;
  overflow: hidden;
}

.dropdown-item {
  padding: 10px 15px;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--text-color);
}

.dropdown-item:hover {
  background-color: var(--border-color);
}

.dropdown-item.perigo {
  color: #e74c3c;
}

.dropdown-item.perigo:hover {
  background-color: #e74c3c;
  color: white;
}
@media (max-width: 768px) {
  .grupo-header {
    flex-direction: column; 
    text-align: center;
  }

  .grupo-imagem {
    width: 100%;
    height: 200px; 
    border-radius: 8px 8px 0 0; 
  }

  .group-actions {
    flex-direction: column;
    gap: 10px;
    align-items: center; 
  }

  .btn-primary, .btn-danger, .btn-secondary {
    width: 100%; 
  }

  .membro-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .membro-info-direita {
    width: 100%;
    justify-content: space-between;
  }
}
</style>