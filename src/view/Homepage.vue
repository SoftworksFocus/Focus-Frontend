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
    <div class="groups-section">
          <Grupos 
          v-for="group in groups" 
          :key="group.id" 
          :group="group" 
          @toggle-group-task="handleToggleTask"
        />
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
            <input v-model="textoPost" type="text" placeholder="Escreva aqui sua postagem" class="post-input"/>
            <button @click="imagem"  alt="Adicionar Imagem" class="icon-add-image">
              <img src="@/assets/image_icon.png">
            </button>
            <button class="btn-default">Salvar rascunho</button>
            <button class="btn-primary">Enviar</button>
        </div>
    </div>
</div>
</template>

<script>
import botaoGenerico from '../components/botaoGenerico.vue';
import Perfil from './Perfil.vue';
import Grupos from '../components/grupos.vue';
import Config from './Config.vue';
export default{
    components:{
        botaoGenerico,
        Grupos,
    },
    data(){
        return{
            textoPost:"",
            sidebar:false,
            criarPost:false,
            buscaAtiva:false,
            textoBusca:"",
      groups: [
        {
          id: 'proj-arquitetura',
          name: 'Projeto de Arquitetura da Casa',
          imageUrl: 'https://via.placeholder.com/400x250/3498db/FFFFFF?text=Casa+Design',
          tasks: [
            { id: 'arc1', descricao: 'Reunião com cliente', concluida: false, dataInicio: '2025-06-25T10:00:00', dataFim: '2025-06-25T11:00:00' },
            { id: 'arc2', descricao: 'Criar plantas baixas', concluida: false, dataInicio: '2025-06-26T09:00:00', dataFim: '2025-06-28T17:00:00' },
            { id: 'arc3', descricao: 'Definir materiais', concluida: true, dataInicio: '2025-06-20T14:00:00', dataFim: '2025-06-20T16:00:00' },
          ],
        },
        {
          id: 'desenvolvimento-app',
          name: 'Desenvolvimento do App Mobile',
          imageUrl: 'https://via.placeholder.com/400x250/2ecc71/FFFFFF?text=App+Dev',
          tasks: [
            { id: 'app1', descricao: 'Especificar funcionalidades', concluida: true, dataInicio: '2025-06-15T09:00:00', dataFim: '2025-06-17T17:00:00' },
            { id: 'app2', descricao: 'Prototipar UI/UX', concluida: false, dataInicio: '2025-06-22T09:00:00', dataFim: '2025-06-24T17:00:00' },
          ],
        },
        {
          id: 'marketing-campanha',
          name: 'Campanha de Marketing',
          imageUrl: 'https://via.placeholder.com/400x250/e74c3c/FFFFFF?text=Marketing',
          tasks: [
            { id: 'mkt1', descricao: 'Pesquisa de mercado', concluida: false, dataInicio: '2025-07-01T09:00:00', dataFim: '2025-07-05T17:00:00' },
            { id: 'mkt2', descricao: 'Criar copy para anúncios', concluida: false, dataInicio: '2025-07-06T09:00:00', dataFim: '2025-07-07T17:00:00' },
            { id: 'mkt3', descricao: 'Lançar campanha', concluida: false, dataInicio: '2025-07-10T10:00:00', dataFim: '2025-07-10T11:00:00' },
          ],
        },
      ],

    }
    },
    methods:{
        alternarBusca() {
        this.buscaAtiva = !this.buscaAtiva;
        console.log('Valor de minhaBuscaEstaAtiva:', this.buscaAtiva);
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
         handleToggleTask({ groupId, taskId, newStatus }) {
            const group = this.groups.find(g => g.id === groupId);
      if (group) {
        const task = group.tasks.find(t => t.id === taskId);
        if (task) {
          task.concluida = newStatus;
        }
      }
    },
    imagem(){
      console.log("imagem");
    },
    Sidebar(){
      this.sidebar = !this.sidebar;
    }
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


.groups-section {
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

</style>