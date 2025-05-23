import PagInicial from './components/PagInicial.vue'
import Cadastro from './components/Cadastro.vue'
import Login from './components/Login.vue'
import{createRouter, createWebHistory} from 'vue-router'

const routes=[
    {name:PagInicial,
    component:PagInicial,
    path:'/'
    },
    {name:Cadastro,
    component:Cadastro,
    path:'/Cadastro'
    },
    {name:Login,
    component:Login,
    path:'/Login'
    }
];
const router =createRouter({
    history:createWebHistory(),
    routes
})

export default router;