<template>
    <div>
        <button @click="Perfil" src="data:image/png;base64,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"></button>
    </div>
    <div>
        <botaoGenerico ativo="buscaAtiva" @toggleBusca="alternarBusca"/>
        <input
        v-if="buscaAtiva"
        type="text"
        placeholder="Digite sua busca..."
        v-model="textoBusca"
        />
    </div>
    <div>
          <Grupos 
          v-for="group in groups" 
          :key="group.id" 
          :group="group" 
          @toggle-group-task="handleToggleTask"
        />
    </div>
    <div>
        <botaoGenerico post="criarPost" @toggleBusca="alternarPost"/>
        <div v-if="criarPost">
            <button src="@/assets/X_icon.png" @click="alternarPost"></button>
            <h3>O que você está pensando?</h3>
            <input v-model="textoPost" type="text" placeholder="Escreva aqui sua postagem"/>
            <button>Salvar rascunho</button>
            <button>Enviar</button>
        </div>
    </div>
</template>

<script>
import botaoGenerico from '../components/botaoGenerico.vue';
import Perfil from './Perfil.vue';
import Grupos from '../components/grupos.vue'
export default{
    components:{
        botaoGenerico,
        Grupos,
    },
    data(){
        return{
            textoPost:"",
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
         handleToggleTask({ groupId, taskId, newStatus }) {
            const group = this.groups.find(g => g.id === groupId);
      if (group) {
        const task = group.tasks.find(t => t.id === taskId);
        if (task) {
          task.concluida = newStatus;
        }
      }
    },
  },
    }
</script>