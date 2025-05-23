<template>
<h1>Focus</h1>
<button v-on:click="cadastro()">Cadastre-se</button>
<button v-on:click="login()">Login</button>
</template>
<script>
import Cadastro from './Cadastro.vue'
import Login from './Login.vue'
export default{
    name : 'PagIncial',

methods:{
    cadastro(){
         this.$router.push({name:Cadastro})
    },
    login(){
        this.$router.push({name:Login})
    }
}
}
</script>