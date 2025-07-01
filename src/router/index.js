import PagInicial from '../view/PagInicial.vue'
import Cadastro from '../view/Cadastro.vue'
import Login from '../view/Login.vue'
import Perfil from '../view/Perfil.vue'
import Homepage from '../view/Homepage.vue'
import RecSenha from '@/view/RecSenha.vue'
import MudEmail from '@/view/MudEmail.vue'
import MudSenha from '@/view/MudSenha.vue'
import Config from '@/view/Config.vue'
import Atividade from '../view/AtividadeDetalhes.vue'
import{createRouter, createWebHistory} from 'vue-router'


const routes=[
    {name:PagInicial,
    component:PagInicial,
    path:'/'
    },
    {name:Cadastro,
    component:Cadastro,
    path:'/cadastro'
    },
    {name:Login,
    component:Login,
    path:'/login'
    },
    {name:Perfil,
    component:Perfil,
    path:'/Perfil'    
    },
    {name:Homepage,
    component:Homepage,
    path:'/homepage'    
    },
    {name:RecSenha,
    component:RecSenha,
    path:'/recsenha'    
    },
    {name:Config,
    component:Config,
    path:'/config'    
    },
    {name:MudEmail,
    component:MudEmail,
    path:'/mudEmail'    
    },
    {name:MudSenha,
    component:MudSenha,
    path:'/mudSenha'    
    },
    {name:Atividade,
    component:Atividade,
    path:'/atividade/:id',   
    },
];
const router =createRouter({
    history:createWebHistory(),
    routes
})

export default router;