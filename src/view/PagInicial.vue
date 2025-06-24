<template>

<div>
    <h1 class="app-name">Focus</h1>
    <p></p>
</div>
<div>
    <button v-on:click="cadastro()" class="btn-primary">Cadastre-se</button>
    <button v-on:click="login()" class="btn-default">Login</button>
</div>
</template>
<script>
import Cadastro from '../view/Cadastro.vue'
import Login from './Login.vue'
export default{
    name : 'PagInicial',

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

<style scoped>
   .app-name {
    color: var(--text-color); 
    text-align: center;
    margin-top: 100px; 
    font-size: 3em;
    transition: color 0.3s ease;
}
.btn-primary{
    width: 180px;
    height: 45px;
    border-radius: 22px;
    font-size: 1.1em;
    cursor: pointer;
    margin: 15px auto; 
    display: block; 
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.btn-default {
    width: 180px;
    height: 45px;
    border-radius: 22px;
    font-size: 1.1em;
    cursor: pointer;
    margin: 15px auto; 
    display: block; 
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.btn-primary {
    background-color: var(--button-primary-bg); 
    color: var(--button-primary-text-color); 
    border: 1px solid var(--border-color); 
}
.btn-primary:hover {
    filter: brightness(0.9);
}

.btn-default {
    background-color: var(--button-default-bg);
    color: var(--button-text-color); 
    border: 1px solid var(--border-color); 
}
.btn-default:hover {
    filter: brightness(0.9);
}
</style>