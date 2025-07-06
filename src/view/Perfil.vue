<template>
     <div class="profile-page-container">
      <BotaoCriarFlutuante />
      <button class="btn-voltar" @click="Voltar">Voltar</button>
        <div class="profile-header">
          <button @click="Edit" class="profile-avatar-btn">
          <img :src='ProfilePicture' alt="Avatar" class="profile-avatar" />
          </button>
            <h1>{{novoUsername}}</h1>
            <p class="user-bio">{{novaBiografia}}</p>
            <div class="profile-stats">
            </div>
            <div class="secao-grupos">
          <h3>Meus Grupos</h3>
          <div v-if="grupos.length > 0" class="lista-grupos">
            <div v-for="grupo in grupos" :key="grupo.id" class="cartao-grupo" @click="verGrupo(grupo.id)">
              <img :src="grupo.profilePictureUrl" :alt="'Logo do grupo ' + grupo.name" class="grupo-imagem">
              <p class="grupo-nome">{{ grupo.name }}</p>
            </div>
          </div>
          <p v-else>Você ainda não participa de nenhum grupo.</p>
        </div>
            <h3>Atividades relacionadas</h3>
            <div class="grid-activities">
               <div v-if="atividade">
                  <div v-for="item in atividade" :key="item.id">
                    <AtividadePerfil :midias="item.media" :atividade="item" />
                  </div>
                </div>
               <p v-else>Carregando mídia...</p>
              </div>
            </div>
            <div class="paginacao" v-if="totalPages > 1">
                <button @click="irParaPagina(currentPage - 1)" :disabled="currentPage === 1" class="btn-paginacao">Anterior</button>
                <span v-for="pagina in paginas" :key="pagina">
                  <button @click="irParaPagina(pagina)" :class="['btn-paginacao', { 'pagina-atual': currentPage === pagina }]">
                    {{ pagina }}
                  </button>
                </span>
                <button @click="irParaPagina(currentPage + 1)" :disabled="currentPage === totalPages" class="btn-paginacao">Próximo</button>
              </div>
        <div v-if="editProfile" class="edit-profile-popup-backdrop" @click.self="Edit">
          <div class="edit-profile-popup-content">
            <button @click="Edit" class="btn-close-popup">
            <img :src="require('@/assets/X_icon.png')" alt="Fechar" class="icon-close-popup">
            </button>
            <h2>Editar Perfil</h2>
              <div class="edit-form-body">
                <img :src="ProfilePicture" alt="Avatar atual" class="current-avatar" />
                <input type="file" @change="handleSelecaoImagem" accept="image/*" ref="fileInput" style="display: none;" />
                <button @click="$refs.fileInput.click()" class="btn-icon-media">
                Selecionar Imagem
                </button>
                <h4>Novo nome:</h4>
                <input v-model="novoUsername" type="text" placeholder="username" class="edit-input" />

                <h4>Nova biografia:</h4>
                <textarea v-model="novaBiografia" placeholder="Escreva sua bio (máx. 150 caracteres)" maxlength="150" class="edit-textarea"></textarea>
              </div>
          <div class="edit-form-footer">
            <button @click="Salvar" class="btn-salvar">Salvar Alterações</button>
            <button @click="Edit" class="btn-cancelar">Cancelar</button>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import AtividadePerfil from '../components/AtividadePerfil.vue'
import api from '../api'
import AtividadeDetalhes from './AtividadeDetalhes.vue';
import { getUserIdFromToken } from '@/utils/auth';
import BotaoCriarFlutuante from '@/components/botaoCriarFlutuante.vue';
    export default{
        name:'Perfil',
        components:{AtividadePerfil, BotaoCriarFlutuante},
           methods:{
            Voltar(){
             this.$router.push({name:'Homepage'})
            },
            async Profile(){
              try{
                const userId = getUserIdFromToken();
                const [userResponse, gruposResponse] = await Promise.all([
                api.get(`user/${userId}`),
                api.get(`user/groups/${userId}`) 
                ]);
                this.novoUsername = userResponse.data.username;
                this.novaBiografia = userResponse.data.description;
                this.ProfilePicture = userResponse.data.profilePictureUrl || require('@/assets/icon.png');
                this.grupos = gruposResponse.data || [];

              }catch(error){
                this.error = 'Buscar perfil falhou: ' + (error.response?.data?.message || error.message);
              }
            },
            verGrupo(grupoId) {
              this.$router.push(`/grupo/${grupoId}`);
            },
            async MudarFoto(){
              const userId = getUserIdFromToken();
              try{   
              const formData = new FormData();
              formData.append('File', this.imagemSelecionada);
              const response = await api.post(`/User/${userId}/profile-picture`, formData, {
                headers:{
                    'Content-Type': 'multipart/form-data',
                  }
              });
              this.imagemSelecionada = response.data.mediaUrl;
              this.ProfilePicture = this.imagemSelecionada;
            }catch(error){
            this.error = 'Mudança de foto de perfil falhou: ' + (error.response?.data?.message || error.message);
            }
          },
            Edit(){
              this.editProfile=!this.editProfile;
            },
            async Salvar(){
              const userId = getUserIdFromToken(); 
              try{ 
                  const response = await api.put(`user/${userId}`,{
                  params :{
                    id: userId,
                  },
                  username:this.novoUsername,
                  description:this.novaBiografia,
                })
                this.novoUsername=response.data.username;
                this.novaBiografia=response.data.description;
                if(this.imagemSelecionada != null){
                  await this.MudarFoto();
                }
                this.Profile();
              }catch(error){
              this.error = 'Editar o Perfil falhou: ' + (error.response?.data?.message || error.message);
              }
              this.editProfile = !this.editProfile;
            },
            Atividade(){
      this.$router.push({name:AtividadeDetalhes});
    },
    handleSelecaoImagem(event) {
            const file = event.target.files[0];
            if (!file) {
                this.imagemSelecionada = null;
                return;
            }
            this.imagemSelecionada = file;
        },
              irParaPagina(pagina) {
          if (pagina > 0 && pagina <= this.totalPages) {
            this.currentPage = pagina;
            this.carregarAtividades();
          }
        },
        async carregarAtividades(){
          this.isLoading = true;
          try {
            console.log(`Buscando atividades - Página: ${this.currentPage}`);
            const response = await api.get('/Activity', {
              params: {
                pageNumber: this.currentPage,
                pageSize: this.pageSize
              }
            });
            console.log("Resposta da API:", response.data);
            const eRespostaPaginada = response.data && typeof response.data === 'object' && Array.isArray(response.data.items);

            if (eRespostaPaginada) {
              this.atividade = response.data.items;
              this.totalPages = response.data.totalPages;
            } 
            else if (Array.isArray(response.data)) {
              console.warn("A API não retornou um objeto paginado. Tratando a resposta como uma única página.");
              this.atividade = response.data;
              this.totalPages = 1;
            } 
            else {
              console.error("Formato de resposta inesperado da API.");
              this.atividade = [];
              this.totalPages = 1;
            }

          } catch (error) {
            console.error('Erro detalhado ao buscar atividades:', error);
            alert('Houve um erro ao buscar as atividades. Verifique o console (F12) para mais detalhes.');
            this.atividade = []; 
          } finally {
            this.isLoading = false;
          }
        },
  },
        data(){
          return{
            editProfile:false,
            novoUsername:"",
            novaBiografia:"",
            atividade: [],
            ProfilePicture:null,
            imagemSelecionada:null,
            currentPage: 1,
            grupos: [],
            totalPages: 1,
            pageSize: 10,
          }
        },
        computed:{
      paginas() {
        const paginasVisiveis = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(paginasVisiveis / 2));
        let endPage = startPage + paginasVisiveis - 1;

        if (endPage > this.totalPages) {
          endPage = this.totalPages;
          startPage = Math.max(1, endPage - paginasVisiveis + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        return pages;
      },
    },
    created() {
      this.Profile();
      this.carregarAtividades();
  }
}
</script>
<style scoped>
.profile-page-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: var(--card-bg); 
  border-radius: 8px;
  box-shadow: var(--card-shadow); 
  text-align: center;
  color: var(--text-color); 
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.profile-header {
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color); 
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--link-color); 
  margin-bottom: 10px;
  transition: border-color 0.3s ease;
}

h1 {
  margin: 10px 0 5px;
  color: var(--text-color);
}

.user-bio {
  margin-top: 15px;
  font-style: italic;
  color: var(--text-color-secondary); 
}

.profile-stats {
  margin-top: 15px;
}

.profile-stats span {
  margin: 0 10px;
  font-size: 0.95em;
  color: var(--text-color-secondary); 
}
.profile-stats strong {
    color: var(--text-color); 
}

h3 {
  margin-top: 30px;
  color: var(--text-color); 
}

.grid-activities {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.activity-item {
  border: 1px solid var(--border-color); 
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--task-item-bg); 
  box-shadow: var(--card-shadow);
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.activity-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}

.activity-item p {
  padding: 10px;
  font-size: 0.9em;
  color: var(--text-color);
  text-align: left;
}
.btn-voltar {
    width: 100px;
    height: 30px;
    border-radius: 16px;
    color: var(--button-text-color); 
    background: var(--button-default-bg); 
    border: 1px solid var(--border-color); 
    cursor: pointer;
    margin: 10px;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.btn-voltar:hover {
    filter: brightness(0.9);
}
.edit-profile-popup-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; 
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex; 
  justify-content: center;
  align-items: center;
  z-index: 1000;
  transition: background-color 0.3s ease;
}

.edit-profile-popup-content {
  background: var(--card-bg);
  border-radius: 8px;
  padding: 20px;
  min-width: 300px;
  max-width: 90%; 
  max-height: 90%;
  overflow-y: auto;
  box-shadow: var(--card-shadow);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px; 
  transition: background-color 0.3s ease, transform 0.3s ease; 
}

.btn-close-popup {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-close-popup .icon-close-popup {
  width: 24px;
  height: 24px;
  filter: invert(var(--icon-filter-invert, 0));
}

.edit-profile-popup-content h2 {
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-color);
}

.edit-form-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
}

.current-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--link-color);
}

.btn-mudar-foto {
  background-color: var(--button-default-bg);
  border: 1px solid var(--border-color);
  border-radius: 5px;
  padding: 8px 15px;
  color: var(--button-text-color);
  cursor: pointer;
  transition: background-color 0.2s ease, filter 0.2s ease;
}

.btn-mudar-foto:hover {
  filter: brightness(0.9);
}

.edit-form-body h4 {
  margin: 0;
  align-self: flex-start;
  color: var(--text-color);
}

.edit-input,
.edit-textarea {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  background-color: var(--body-bg);
  color: var(--text-color);
  font-size: 1em;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.edit-textarea {
  resize: vertical;
  min-height: 80px;
  max-height: 150px;
}

.edit-input::placeholder,
.edit-textarea::placeholder {
  color: var(--text-color-secondary);
}

.edit-form-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
}

.btn-salvar,
.btn-cancelar {
  background-color: var(--button-primary-bg);
  color: var(--button-primary-text-color);
  border: 1px solid var(--button-primary-bg);
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease, filter 0.2s ease;
}

.btn-cancelar {
  background-color: var(--button-default-bg);
  color: var(--button-text-color);
  border: 1px solid var(--border-color);
}

.btn-salvar:hover,
.btn-cancelar:hover {
  filter: brightness(0.9);
}
.profile-avatar-btn {
  
  background-color: var(--button-default-bg);
  border: 1px solid var(--border-color);
  border-radius: 5px;
  padding: 8px; 
  cursor: pointer;
  display: flex; 
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}
.paginacao {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  gap: 8px;
}

.btn-paginacao {
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  background-color: var(--button-default-bg);
  color: var(--text-color);
  cursor: pointer;
  border-radius: 4px;
}

.btn-paginacao:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-paginacao.pagina-atual {
  background-color: var(--button-primary-bg);
  color: var(--button-primary-text-color);
  border-color: var(--button-primary-bg);
  font-weight: bold;
}
.secao-grupos {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.secao-atividades {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.lista-grupos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-top: 15px;
}

.cartao-grupo {
  width: 130px;
  padding: 10px;
  border-radius: 8px;
  background-color: var(--body-bg);
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-align: center;
}

.cartao-grupo:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.grupo-imagem {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  border: 2px solid var(--border-color);
}

.grupo-nome {
  font-size: 0.9em;
  font-weight: bold;
  color: var(--text-color);
  margin: 0;
}

@media (max-width: 768px) {
  .profile-page-container {
    padding: 15px;
    margin: 10px;
  }

  .profile-header {
    padding-bottom: 15px;
  }

  .profile-avatar {
    width: 100px;
    height: 100px;
  }

  h1 {
    font-size: 1.8em;
  }

  .lista-grupos {
    justify-content: flex-start;
    gap: 12px;
  }

  .cartao-grupo {
    width: 100px;
  }
  
  .grupo-imagem {
    width: 60px;
    height: 60px;
  }

  .grid-activities {
    grid-template-columns: 1fr;
  }

  .edit-profile-popup-content {
    padding: 15px;
  }

  .edit-form-footer {
    flex-direction: column;
    gap: 10px;
  }
  
  .edit-form-footer .btn-salvar,
  .edit-form-footer .btn-cancelar {
    width: 100%;
  }

  .paginacao {
    flex-wrap: wrap; 
    gap: 5px;
  }
}
</style>