<template>
    <button v-on:click="voltar()">Voltar</button>
    <h1>Login</h1>
    <div class="login">
        <input type="text" placeholder="Coloque seu e-mail"/>
        <input type="password" placeholder="Crie sua senha"/>
        <button v-on:click="Perfil()">Login</button>
        <button class="link" v-on:click="kkkk">esqueceu sua senha?</button>
    </div>
</template>

<script>
import PagInicial from './PagInicial.vue' 
import Perfil from './Perfil.vue'
export default{
    name : 'Login',
    methods:{
        voltar(){
            this.$router.push({name:PagInicial})
        },
        Perfil(){
            this.$router.push({name:Perfil})
        }
    }
}
</script>
<style>
.login input{
    width:250px;
    height:25px;
    padding-left:20px;
    display:block;
    margin-bottom: 20px;
    margin-right: auto;
    margin-left: auto;
    border:1px solid skyblue;  
}
.login button{
    width: 200px;
    height: 30px;
    border-radius: 16px;
    color: black;
    background: white;
    border: 1px solid skyblue;
    cursor: pointer;
}
.login .link{
    border: 0px;
    color: blue;
    text-decoration: underline;
}
.login .link:hover {
    border: 0px;
    color: blue;
    text-decoration: none;
}

</style>