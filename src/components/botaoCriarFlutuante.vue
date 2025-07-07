<template>
  <div class="fab-container">
    <transition name="fab-item">
      <div v-if="isOpen" class="fab-options">
        <button @click="abrirModalGrupo" class="fab-option" title="Criar Novo Grupo">
          Grupo
        </button>
        <button @click="abrirModalAtividade" class="fab-option" title="Criar Nova Atividade">
          Atividade
        </button>
      </div>
    </transition>

    <button @click="toggleMenu" class="fab-main" :class="{ 'is-open': isOpen }">
      <img v-if="!isOpen" :src="require('@/assets/plus_icon.png')" alt="Criar" />
      <img v-else :src="require('@/assets/X_icon.png')" alt="Fechar" />
    </button>

    <div v-if="showModalGrupo" class="modal-backdrop" @click.self="fecharModalGrupo">
      <div class="modal-content">
        <button @click="fecharModalGrupo" class="close-modal-btn">×</button>
        <h3>Criar Novo Grupo</h3>
        <input v-model="novoGrupo.name" type="text" placeholder="Nome do grupo" class="modal-input"/>
        <textarea v-model="novoGrupo.description" placeholder="Descrição do grupo" class="modal-textarea"></textarea>
        <div class="image-upload-section">
            <input type="file" @change="handleSelecaoImagemGrupos" accept="image/*" ref="fileInput" style="display: none;" />
            <button @click="$refs.fileInput.click()" class="btn-icon-media">
             <img src='@/assets/image_icon.png'>
            </button>
        </div>
        <div v-if="novoGrupo.imagePreview" class="image-preview-item">
            <img :src="novoGrupo.imagePreview" alt="Pré-visualização da foto"/>
        </div>
        <div class="modal-actions">
          <button class="btn-primary" @click="enviarNovoGrupo">Confirmar Criação</button>
        </div>
        <p v-if="erroGrupo" class="error-message">{{ erroGrupo }}</p>
      </div>
    </div>

    <div v-if="showModalAtividade" class="modal-backdrop" @click.self="fecharModalAtividade">
      <div class="modal-content">
        <button @click="fecharModalAtividade" class="close-modal-btn">×</button>
        <h3>O que você está pensando?</h3>
        <input v-model="novaAtividade.title" type="text" placeholder="Escreva aqui o titulo" class="modal-input"/>
        <textarea v-model="novaAtividade.description" placeholder="Escreva aqui sua postagem" class="modal-textarea"></textarea>
        <input type="datetime-local" v-model="novaAtividade.startDate" class="modal-input"/>
        <input type="datetime-local" v-model="novaAtividade.endDate" class="modal-input"/>
        <select v-model="novaAtividade.grupoId" class="modal-input">
          <option disabled value="">Selecione um grupo</option>
          <option v-for="grupo in grupos" :key="grupo.id" :value="grupo.id">
            {{ grupo.name }}
          </option>
        </select>
        <div class="image-upload-section">
          <h4>Adicionar Mídia</h4>
          
          
          <input type="file" @change="handleSelecaoImagemAtividade" accept="image/*,video/*" ref="fileInput" multiple style="display: none;" />
          
          <button @click="$refs.fileInput.click()" class="btn-icon-media">
            <img src="@/assets/image_icon.png" class="icon-add-image">
          </button>

        <div v-if="novaAtividade.imagemPreview.length > 0" class="image-preview-gallery">
            <div v-for="(src, index) in novaAtividade.imagemPreview" :key="index" class="image-preview-item">
                <img :src="src" alt="Pré-visualização"/>
                <button @click="removerImagem(index)" class="btn-remove-image" title="Remover Imagem">×</button>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn-primary" @click="enviarNovaAtividade">Enviar</button>
        </div>
        <p v-if="novaAtividade.erro" class="error-message">{{ novaAtividade.erro }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import { getUserIdFromToken } from '@/utils/auth'; 

export default {
  name: 'BotaoCriarFlutuante',
  data() {
    return {
      isOpen: false,
      showModalGrupo: false,
      showModalAtividade: false,
      erroGrupo: '',
      erroAtividade: '',
      novoGrupo: {
        name: '',
        description: '',
        imageFile:'',
        imagePreview:''
      },
      novaAtividade: {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        imagemSelecionada:[],
        imagemPreview:[],   
        grupoId:"" ,      
        isCreating: false,
        erro:"",
      },
    };
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    abrirModalGrupo() {
      this.showModalGrupo = true;
      this.isOpen = false;
    },
    async abrirModalAtividade() {
      await this.carregarGruposDoUsuario();
      this.showModalAtividade = true;
      this.isOpen = false;
    },
    fecharModalGrupo() {
      this.showModalGrupo = false;
      this.novoGrupo = { name: '', description: '' };
      this.erroGrupo = '';
    },
    fecharModalAtividade() {
      this.showModalAtividade = false;
      this.novaAtividade = { title: '', description: '', startDate: '', endDate: '' };
      this.erroAtividade = '';
    },
    async carregarGruposDoUsuario() {
      try {
        const userId = getUserIdFromToken();
        if (userId) {
          const response = await api.get(`/api/user/Groups/${userId}`);
          this.grupos = response.data;
        }
      } catch (error) {
        console.error("Erro ao carregar grupos do usuário:", error);
        this.erroAtividade = "Não foi possível carregar os grupos.";
      }
    },
    async enviarNovoGrupo() {
        if (!this.novoGrupo.name || !this.novoGrupo.description) {
            this.erroGrupo = "Nome e descrição são obrigatórios.";
            return;
        }
        try {
            const userId = getUserIdFromToken();
            const response = await api.post('/api/Group', {
                name: this.novoGrupo.name,
                description: this.novoGrupo.description,
                ownerId: userId,
            });
            const novoGrupoId = response.data.id;
            if (this.novoGrupo.imageFile && novoGrupoId) {
          const formData = new FormData();
          formData.append('File', this.novoGrupo.imageFile);
          await api.post(`/api/Group/${novoGrupoId}/profile-picture`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        }
            this.fecharModalGrupo();
            this.$root.$emit('grupo-criado'); 
        } catch (err) {
            this.erroGrupo = "Falha ao criar o grupo: " + (err.response?.data?.message || err.message);
        }
    },
    async enviarNovaAtividade() {
        if (!this.novaAtividade.title || !this.novaAtividade.description) {
            this.erroAtividade = "Título e descrição são obrigatórios.";
            return;
        }
        try {
            const userId = getUserIdFromToken();
            const response = await api.post('/api/Activity', {
                userId: userId,
                title: this.novaAtividade.title,
                description: this.novaAtividade.description,
                startDate: this.novaAtividade.startDate,
                endDate: this.novaAtividade.endDate,
                groupId: this.novaAtividade.grupoId || null,
            });
            const atividadeId = response.data.id;
             if (this.novaAtividade.imagemSelecionada.length > 0 && atividadeId) {
                    await this.enviarTodasAsMidias(atividadeId);
                }
            window.location.reload();
            this.fecharModalAtividade();
        } catch (error) {
            this.erroAtividade = 'Criar atividade falhou: ' + (error.response?.data?.message || error.message);
        }
    },
    handleSelecaoImagemAtividade(event) {
            const files = event.target.files;
            if (!files) return;
            const espacoDisponivel = 3-this.novaAtividade.imagemSelecionada.length;
            if (files.length > espacoDisponivel) {
                alert(`Você pode selecionar no máximo mais ${espacoDisponivel} arquivo(s).`);
            }
             for (let i = 0; i < Math.min(files.length, espacoDisponivel); i++) {
                this.novaAtividade.imagemSelecionada.push(files[i]);
                this.novaAtividade.imagemPreview.push(URL.createObjectURL(files[i]));
            }
            this.$refs.fileInput.value = '';
        },
         removerImagem(index) {
            this.novaAtividade.imagemSelecionada.splice(index, 1);
            this.novaAtividade.imagemPreview.splice(index, 1);
        },
        async enviarTodasAsMidias(atividadeId) {
            const uploadPromises = this.novaAtividade.imagemSelecionada.map(file => {
                const formData = new FormData();
                formData.append('File', file);

                return api.post(`/api/Activity/${atividadeId}/upload-media`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            });
            await Promise.all(uploadPromises);
        },
        handleSelecaoImagemGrupos(event) {
          const file = event.target.files?.[0];
          if (!file) return;
          this.novoGrupo.imageFile = file;
          this.novoGrupo.imagePreview = URL.createObjectURL(file);
        },
  }
}
</script>

<style scoped>
.fab-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
}

.fab-main {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--button-primary-bg);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s;
  position: relative;
  z-index: 1001;
}

.fab-main.is-open {
  transform: rotate(90deg);
  background-color: #e74c3c;
}

.fab-main img {
  width: 28px;
  height: 28px;
}

.fab-options {
  position: absolute;
  bottom: 75px; 
  right: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px; 
}

.fab-option {
  background: var(--button-default-bg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  font-weight: bold;
  white-space: nowrap;
}

.fab-item-enter-active, .fab-item-leave-active {
  transition: all 0.2s ease-out;
}
.fab-item-enter-from, .fab-item-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

.modal-backdrop { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1002; }
.modal-content { background: var(--card-bg); padding: 25px; border-radius: 8px; width: 90%; max-width: 500px; position: relative; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
.close-modal-btn { position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 1.8em; color: var(--text-color-secondary); cursor: pointer; }
.modal-content h3 { margin-top: 0; margin-bottom: 20px; }
.modal-input, .modal-textarea, select.modal-input { width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid var(--border-color); border-radius: 5px; background-color: var(--body-bg); color: var(--text-color); box-sizing: border-box; }
.modal-textarea { resize: vertical; min-height: 100px; }
.modal-actions { text-align: right; margin-top: 10px; }
.error-message { color: #e74c3c; margin-top: 15px; text-align: center; }
.btn-primary { padding: 10px 25px; border: none; border-radius: 25px; background: var(--button-primary-bg); color: var(--button-primary-text-color); font-size: 1em; cursor: pointer; }
.image-upload-section { display: flex; align-items: center; gap: 15px; margin-bottom: 15px; }
.caption-input { flex-grow: 1; height: 40px; padding: 0 10px; border: 1px solid var(--border-color); border-radius: 5px; background-color: var(--body-bg); color: var(--text-color); }
.btn-icon-media { background: none; border: 1px solid var(--border-color); padding: 5px; cursor: pointer; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: background-color 0.2s ease, border-color 0.3s ease; }
.btn-icon-media:hover { background-color: var(--button-default-bg); border-color: var(--link-color); }
.btn-icon-media img { width: 24px; height: 24px; filter: invert(var(--icon-filter-invert, 0)); }
.image-preview-gallery { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 15px; padding: 10px; border: 1px dashed var(--border-color); border-radius: 5px; }
.image-preview-item { position: relative; width: 50px; height: 50px; }
.image-preview-item img { width: 100%; height: 100%; object-fit: cover; border-radius: 5px; }
.btn-remove-image { position: absolute; top: -5px; right: -5px; width: 20px; height: 20px; background-color: #e74c3c; color: white; border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: bold; line-height: 1; }
.btn-remove-image:hover { background-color: #c0392b; }
@media (max-width: 480px) { .modal-content { padding: 15px; } .modal-content h3 { font-size: 1.2em; } }
</style>