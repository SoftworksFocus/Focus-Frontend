<template>
    <button v-on:click="voltar()" class="btn-voltar">Voltar</button>
    <h1 class="login-title">Login</h1>
    <div class="login-container">
        <input type="text" placeholder="Coloque seu e-mail" v-model="email"/>
        <input type="password" placeholder="Crie sua senha" v-model="password"/>
        <button v-on:click="autenticar()" class="btn-login">Login</button>
        <button class="link-forgot-password" @click="RecSenha">esqueceu sua senha?</button>
        <p v-if="erro"> {{ erro }}</p>
    </div>
</template>

<script>
import PagInicial from './PagInicial.vue' 
import Homepage from './Homepage.vue'
import RecSenha from './RecSenha.vue'
import axios from 'axios'
export default{
    name : 'Login',
    data(){
        return{
        email:'',
        password:'',
        erro:'',
    }
},
    methods:{
        voltar(){
            this.$router.push({name:PagInicial})
        },
        RecSenha(){
            this.$router.push({name:RecSenha})
        },
        async autenticar(){
        try{
            const response = await axios.post('http://localhost:5135/api/Auth/login',{
             email: this.email,
             password: this.password,
            });
            const token = response.data.accessToken;
            console.log(token);
            localStorage.setItem('authToken', token);
            this.$router.push({name:Homepage});
        }catch(error){
            this.erro = 'Login falhou:' + (error.response?.data?.message || error.message);
        }
    }
    }
}
</script>
<style scoped>
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

.login-title {
    color: var(--text-color); 
    text-align: center;
    margin-bottom: 20px;
}

.login-container {
    max-width: 350px;
    margin: 0 auto;
    padding: 30px 20px;
    background-color: var(--card-bg); 
    box-shadow: var(--card-shadow); 
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.login-container input{
    width: calc(100% - 40px); 
    height: 35px; 
    padding-left: 20px;
    margin-bottom: 20px;
    border: 1px solid var(--border-color);
    background-color: var(--body-bg);
    color: var(--text-color);
    transition: border-color 0.2s ease, background-color 0.2s ease;
}
.login-container input::placeholder {
    color: var(--text-color-secondary); 
}
.login-container input:focus {
    outline: none;
    border-color: var(--link-color); 
}

.btn-login {
    width: 200px;
    height: 40px;
    border-radius: 20px;
    color: var(--button-primary-text-color); 
    background: var(--button-default-bg); 
    border: 1px solid var(--border-color); 
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.btn-login:hover {
    filter: brightness(0.9);
}

.link-forgot-password {
    border: 0px;
    background: none;
    color: var(--link-color); 
    text-decoration: underline;
    margin-top: 15px; 
    cursor: pointer;
    transition: color 0.2s ease;
}
.link-forgot-password:hover {
    color: var(--text-color-secondary); 
    text-decoration: none;
}
</style>