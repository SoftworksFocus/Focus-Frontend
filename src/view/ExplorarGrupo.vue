<template>
  <div class="page-container">
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

    <div class="fixed-action-button-container">
      <button @click="alternarCriacao" class="create-btn" title="Criar Novo Grupo">
        <img :src="require('@/assets/plus_icon.png')" alt="Criar Grupo" />
      </button>
    </div>

    <div v-if="exibirModal" class="modal-backdrop" @click.self="alternarCriacao">
      <div class="modal-content">
        <button @click="alternarCriacao" class="close-modal-btn">×</button>
        <h3>Criar Novo Grupo</h3>
        
        <input v-model="novoGrupo.name" type="text" placeholder="Nome do grupo" class="modal-input"/>
        <textarea v-model="novoGrupo.description" placeholder="Descrição do grupo" class="modal-textarea"></textarea>

        <div class="image-upload-section">
            <input type="file" @change="handleImageSelection" accept="image/*" ref="fileInput" style="display: none;" />
            <button @click="$refs.fileInput.click()" class="btn-default">
              Selecionar Foto
            </button>
        </div>
        <div v-if="novoGrupo.imagePreview" class="image-preview-item">
            <img :src="novoGrupo.imagePreview" alt="Pré-visualização da foto"/>
        </div>

        <div class="modal-actions">
          <button class="btn-primary" @click="enviarNovoGrupo" :disabled="isCreating">
            {{ isCreating ? 'Criando...' : 'Confirmar Criação' }}
          </button>
        </div>
        <p v-if="erro" class="error-message">{{ erro }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Grupos from '@/components/Grupos.vue';
import api from '@/api';
import { getUserIdFromToken } from '@/utils/auth';
export default{
    name:'ExplorarGrupos',
    components:{
        Grupos
    },
    data(){
        return{
            searchTerm:"",
            grupos:[],
            exibirModal: false,
            isCreating: false,
            erro: '',
            novoGrupo: {
                name: '',
                description: '',
                imageFile:'',
                imagePreview:''
            }
        }
    },
    computed:{
        pesquisaGrupos(){
            if(!this.searchTerm){
                return this.grupos;
            }
            return this.grupos.filter(grupo => 
                grupo.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        }
    },
    methods:{
    irParaGrupo(grupoId) {
      this.$router.push({ name: 'GrupoDetalhe', params: { id: grupoId } });
    },
    async carregarGrupos(){
        try{
            const response = await api.get('/Group')
            this.grupos = response.data.items
        }catch(error){
            console.error("Falha ao carregar grupos:", error);
        }
    },
    alternarCriacao() {
            this.exibirModal = !this.exibirModal;
            if (!this.exibirModal) {
                this.erro = ''; 
                this.novoGrupo.name = '';
                this.novoGrupo.description = '';
            }
        },
        async enviarNovoGrupo() {
            if (!this.novoGrupo.name || !this.novoGrupo.description) {
                this.erro = "Nome e descrição são obrigatórios.";
                return;
            }

            this.isCreating = true;
            this.erro = "";
            const userId = getUserIdFromToken();

            try {
                const response = await api.post('/Group', {
                    name: this.novoGrupo.name,
                    description: this.novoGrupo.description,
                    ownerId: userId 
                });
                const novoGrupoId = response.data.id;
                if (this.novoGrupo.imageFile && novoGrupoId) {
          const formData = new FormData();
          formData.append('File', this.novoGrupo.imageFile);
          await api.post(`/Group/${novoGrupoId}/profile-picture`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        }
                
                this.alternarCriacao();
                await this.carregarGrupos();

         } catch (err) {
                this.erro = "Falha ao criar o grupo: " + (err.response?.data?.message || err.message);
            } finally {
                this.isCreating = false;
            }
        },
            handleImageSelection(event) {
      const file = event.target.files?.[0];
      if (!file) return;
      this.novoGrupo.imageFile = file;
      this.novoGrupo.imagePreview = URL.createObjectURL(file);
    },

    },
    mounted(){
        this.carregarGrupos();
    }
}
</script>

<style scoped>
.page-container { max-width: 900px; margin: 20px auto; padding: 20px; }
.search-bar { margin-bottom: 25px; }
.search-bar input { width: 100%; padding: 12px 15px; border-radius: 25px; border: 1px solid var(--border-color); background-color: var(--body-bg); color: var(--text-color); font-size: 1em; }
.no-results { text-align: center; margin-top: 50px; color: var(--text-color-secondary); }
.grupos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }

.fixed-action-button-container { position: fixed; bottom: 30px; right: 30px; z-index: 999; }
.create-btn { background-color: var(--button-primary-bg); border: none; border-radius: 50%; width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.2); cursor: pointer; transition: transform 0.2s ease; }
.create-btn:hover { transform: scale(1.05); }
.create-btn img { width: 30px; height: 30px; }

.modal-backdrop { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.6); display: flex; justify-content: center; align-items: center; z-index: 1000; }
.modal-content { background: var(--card-bg); padding: 25px; border-radius: 8px; width: 90%; max-width: 500px; position: relative; box-shadow: 0 5px 15px rgba(0,0,0,0.3); }
.close-modal-btn { position: absolute; top: 10px; right: 15px; background: none; border: none; font-size: 1.8em; color: var(--text-color-secondary); cursor: pointer; }
.modal-content h3 { margin-top: 0; margin-bottom: 20px; }
.modal-input, .modal-textarea { width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid var(--border-color); border-radius: 5px; background-color: var(--body-bg); color: var(--text-color); box-sizing: border-box; }
.modal-textarea { resize: vertical; min-height: 100px; }
.modal-actions { text-align: right; margin-top: 10px; }
.error-message { color: #e74c3c; margin-top: 15px; text-align: center; }

.image-upload-section { margin-top: 15px; }
.image-preview-item { margin-top: 10px; text-align: center; }
.image-preview-item img { max-width: 120px; max-height: 120px; border-radius: 5px; border: 1px solid var(--border-color); }
.btn-default { padding: 8px 16px; border: 1px solid var(--border-color); background-color: var(--button-default-bg); color: var(--text-color); border-radius: 20px; cursor: pointer; }
.btn-primary { padding: 10px 25px; border: none; border-radius: 25px; background: var(--button-primary-bg); color: var(--button-primary-text-color); font-size: 1em; cursor: pointer; }
</style>