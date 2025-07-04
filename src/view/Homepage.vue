<template>
<div class="homepage-container">
    <botaoGenerico click="sidebar" @toggle="Sidebar" class="sidebar-toggle-btn">
    <img v-if="!sidebar" :src="require('@/assets/menu_icon.png')" alt="Menu" class="icon-menu"/>
    <img v-else :src="require('@/assets/X_icon.png')" alt="Fechar Menu" class="icon-close"/>
    </botaoGenerico>
    <div v-if="sidebar" class="sidebar">
      <button @click="Perfil" class="sidebar-btn">
        <img src="@/assets/icon.png" alt="Perfil" class="icon-sidebar">
        Perfil
      </button>
      <button @click="Config" class="sidebar-btn">
        <img src="@/assets/config_icon.png" alt="Configurações" class="icon-sidebar">
        Configurações
      </button>
      <button @click="Login" class="sidebar-btn">
        Sair
      </button>
      </div>
    <div class="search-section">
        <botaoGenerico click="buscaAtiva" @toggle="alternarBusca" class="search-toggle-btn">
          <img v-if="!buscaAtiva" :src="require('@/assets/lupa_v1.webp')" alt="abrir search" class="search-icon"/>
          <img v-else :src="require('@/assets/X_icon.png')" alt="Fechar search" class="icon-close"/>
        </botaoGenerico>
        <input
        v-if="buscaAtiva"
        type="text"
        placeholder="Digite sua busca..."
        v-model="textoBusca"
        class="search-input"
        />
    </div>
    <div class="Feed-section">
          <Feed />
    </div>
    <div class="post-creation-section">
        <div class="fixed-post-button-container">
      <botaoGenerico click="criarPost" @toggle="alternarPost" class="create-post-btn">
        <img v-if="!criarPost" :src="require('@/assets/plus_icon.png')" alt="Criar Post" class="icon-post" />
      </botaoGenerico>
    </div>
        <div v-if="criarPost" class="post-form">
            <button @click="alternarPost" class="close-post-btn">
              <img src="@/assets/X_icon.png">
            </button>
            <h3>O que você está pensando?</h3>
            <input v-model="titulo" type="text" placeholder="Escreva aqui o titulo" class="post-title"/>
            <input v-model="textoPost" type="text" placeholder="Escreva aqui sua postagem" class="post-input"/>
            <input type="datetime-local" v-model="inicio" class="post-date"/>
            <input type="datetime-local" v-model="fim" class="post-date"/>
            <div class="image-upload-section">
      <h4>Adicionar Mídia</h4>
      
      <input v-model="imagemCaption" type="text" placeholder="Legenda da imagem" class="caption-input"/>
      
      <input type="file" @change="handleSelecaoImagem" accept="image/*,video/*" ref="fileInput" style="display: none;" />
      
      <button @click="$refs.fileInput.click()" class="btn-icon-media">
        <img src="@/assets/image_icon.png" class="icon-add-image">
        Selecionar Imagem/Vídeo
      </button>

      <div v-if="imagemPreview" class="image-preview">
        <img :src="imagemPreview" alt="Pré-visualização"/>
            </div>
        </div>
            <button class="btn-default">Salvar rascunho</button>
            <button class="btn-primary" @click="enviarPost">Enviar</button>
            <p> {{ erro }}</p>
        </div>
    </div>
</div>
</template>

<script>
import botaoGenerico from '../components/botaoGenerico.vue';
import Perfil from './Perfil.vue';
import Feed from '../components/feed.vue';
import Config from './Config.vue';
import Login from './Login.vue';
import api from '../api';
export default{
    components:{
        botaoGenerico,
        Feed,
    },
    data(){
        return{
            textoPost:"",
            sidebar:false,
            criarPost:false,
            buscaAtiva:false,
            textoBusca:"",
            inicio:"",
            fim:"",
            titulo:"" ,
            imagemSelecionada: null, 
            imagemCaption: '',       
            imagemPreview: null,   
            isCreating: false,
            erro:""

    }
    },
    methods:{
        alternarBusca() {
        this.buscaAtiva = !this.buscaAtiva;
        },
        alternarPost(){
            this.criarPost = !this.criarPost;
        },
        Perfil(){
            this.$router.push({name:Perfil})
        },
        Config(){
          this.$router.push({name:Config})
        },
        Login(){
            localStorage.removeItem('authToken');
            this.$router.push({name:Login})
        },
         handleToggleTask({ groupId, taskId, newStatus }) {
            const group = this.groups.find(g => g.id === groupId);
      if (group) {
        const task = group.tasks.find(t => t.id === taskId);
        if (task) {
          task.concluida = newStatus;
        }
      }
    },
    Sidebar(){
      this.sidebar = !this.sidebar;
    },
        async enviarPost(){
            if(this.isCreating) return;
            this.isCreating = true;
            this.erro = "";

            try {
                 const response = await api.post('/Activity', {
                    userId: 2,
                    title: this.titulo,
                    description: this.textoPost,
                    startDate: this.inicio,
                    endDate: this.fim,
                });
                const atividadeId = response.data.id;
                console.log(atividadeId);
                if(this.imagemSelecionada != null){
                    await this.enviarMidia(atividadeId)
                }
                window.location.reload();
                this.criarPost = false;

            } catch(erro) {
                this.erro = 'Criar atividade falhou: ' + (erro.response?.data?.message || erro.message);
            }finally{
                this.isCreating = false;
            }   
        },
       enviarMidia(atividadeId) {
            const formData = new FormData();
            formData.append('File', this.imagemSelecionada);
            formData.append('Caption', this.imagemCaption || 'Mídia da atividade');
            return api.post(`/Activity/${atividadeId}/upload-media`, formData, {
                headers:{
                    'Content-Type': 'multipart/form-data',
                }
            });
        },
    handleSelecaoImagem(event) {
            const file = event.target.files[0];
            if (!file) {
                this.imagemSelecionada = null;
                this.imagemPreview = null;
                return;
            }
            this.imagemSelecionada = file;
        },
},
}
</script>

<style scoped>
.homepage-container {
    padding: 20px;
    background-color: var(--body-bg); 
    color: var(--text-color); 
    min-height: 100vh;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.sidebar-toggle-btn {
    position: fixed; 
    top: 20px;
    left: 20px;
    z-index: 1000; 
    background-color: var(--button-default-bg); 
    border: 1px solid var(--border-color); 
    border-radius: 50%; 
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--box-shadow);
    transition: background-color 0.2s ease, transform 0.2s ease;
}
.sidebar-toggle-btn:hover {
    transform: scale(1.05);
}
.icon-menu, .icon-close {
    width: 24px;
    height: 24px;
    filter: invert(var(--icon-filter-invert, 0)); 
    transition: filter 0.3s ease;
}


.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 250px;
    background-color: var(--header-bg); 
    box-shadow: 2px 0 5px rgba(0,0,0,0.2); 
    padding-top: 70px; 
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 20px;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.sidebar-btn {
    width: calc(100% - 40px); 
    padding: 15px 10px;
    margin-bottom: 10px;
    background: none;
    border: none;
    text-align: left;
    font-size: 1.1em;
    color: var(--text-color); 
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 5px;
    transition: background-color 0.2s ease, color 0.2s ease;
}
.sidebar-btn:hover {
    background-color: var(--button-default-bg); 
}
.icon-sidebar {
    width: 20px;
    height: 20px;
    filter: invert(var(--icon-filter-invert, 0));
}

.search-section {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 30px;
}
.search-toggle-btn {
    background-color: var(--button-default-bg);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    padding: 8px 12px;
    color: var(--button-text-color);
    cursor: pointer;
    margin-right: 10px;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.search-toggle-btn:hover {
    filter: brightness(0.9);
}
.search-input {
    width: 250px;
    height: 35px;
    padding-left: 15px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: var(--body-bg);
    color: var(--text-color); 
    transition: border-color 0.2s ease, background-color 0.2s ease;
}
.search-input::placeholder {
    color: var(--text-color-secondary);
}


.Feed-section {
    margin-bottom: 40px;
}


.post-creation-section {
    text-align: center;
    margin-top: 50px;
}
.fixed-post-button-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 900; 
}
.create-post-btn {
    background-color: var(--button-default-bg); 
    color: var(--button-primary-text-color);
    border: 1px solid var(--button-primary-bg);
    border-radius: 50%; 
    width: 60px;
    height: 60px;
    font-size: 2em;
    display: inline-flex; 
    align-items: center;
    justify-content: center;
    box-shadow: var(--box-shadow);
    transition: background-color 0.2s ease, transform 0.2s ease;
}
.create-post-btn:hover {
    transform: scale(1.05);
}
.icon-post {
    width: 30px;
    height: 30px;
    filter:none; 
    transition: filter 0.3s ease;
}


.post-form {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  width: 90%; 
  margin: 0; 
  padding: 20px;
  background-color: var(--card-bg);
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  z-index: 1001; 
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
.close-post-btn img{
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-color:none;
    background-color: none;
}
.icon-close-form {
    width: 20px;
    height: 20px;
    filter: invert(var(--icon-filter-invert, 0)); 
}

.post-form h3 {
    color: var(--text-color);
    margin-top: 0;
    margin-bottom: 20px;
}

.post-input {
    width: calc(100% - 40px);
    height: 80px;
    padding: 10px 20px;
    margin-bottom: 20px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: var(--body-bg); 
    color: var(--text-color);
    resize: vertical;
    transition: border-color 0.2s ease, background-color 0.2s ease;
}
.post-input::placeholder {
    color: var(--text-color-secondary);
}

.add-image-btn {
    background-color: var(--button-default-bg);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    padding: 8px 15px;
    color: var(--button-text-color);
    cursor: pointer;
    margin-bottom: 20px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
    width:25px;
}
.add-image-btn:hover {
    filter: brightness(0.9);
}
.icon-add-image img{
    width: 25px;
    height: 25px;
    filter: invert(var(--icon-filter-invert, 0));
}

.post-actions button {
    margin: 0 10px;
    width: 150px;
    height: 40px;
    border-radius: 20px;
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.post-actions .btn-default {
    background-color: var(--button-default-bg);
    color: var(--button-text-color);
    border: 1px solid var(--border-color);
}
.post-actions .btn-primary {
    background-color: var(--button-primary-bg);
    color: var(--button-primary-text-color);
    border: 1px solid var(--button-primary-bg);
}
.post-actions button:hover {
    filter: brightness(0.9);
}
.search-icon{
  width: 20px;
    height: 20px;
    filter: invert(var(--icon-filter-invert, 0));
}
.icon-close{
 width: 20px;
  height: 20px;
  filter: invert(var(--icon-filter-invert, 0));
}
.image-upload-section {
  display: flex; 
  align-items: center; 
  gap: 15px; 
  margin-bottom: 15px; 
}
caption-input {
  flex-grow: 1; 
  height: 40px;
  padding: 0 10px;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  background-color: var(--body-bg);
  color: var(--text-color);
}
.btn-icon-media {
  background: none;
  border: 1px solid var(--border-color);
  padding: 5px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%; 
  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.2s ease, border-color 0.3s ease;
}

.btn-icon-media:hover {
  background-color: var(--button-default-bg);
  border-color: var(--link-color);
}

.btn-icon-media img {
  width: 24px;  
  height: 24px;
  filter: invert(var(--icon-filter-invert, 0)); 
}

</style>