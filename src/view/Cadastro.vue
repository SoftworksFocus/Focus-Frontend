<template>
    <button @click="voltar" class="btn-voltar">Voltar</button>
    <h1 class="cadastro-title">Cadastro</h1>
    <div class="cadastro-container">
        <input type="text" v-model="Username" placeholder="Crie seu username"/>
        <input type="text" v-model="Email" placeholder="Coloque seu e-mail"/>
        <input type="password" v-model="Senha" placeholder="Crie sua senha"/>
        <button @click="cadastreSe" class="btn-cadastro">Cadastre-se</button>
    </div>
</template>

<script>
import axios from 'axios';
export default{
    name : 'Cadastro', 
     data() {
        return{
        Username:"",
        Email:"",
        Senha:"",
}
},
    methods:{
        voltar(){
            this.$router.push({name:'PagInicial'})
        },
        async cadastreSe(){
            if(!this.Username || !this.Email || !this.Senha){
                alert("os três campos devem ser preenchidos");
                this.Senha = "";
                this.Email = "";
                this.Username = "";
                return;
            }
            try{
                const response = await axios.post("http://localhost:5135/api/User",{
                    username:this.Username,
                    email:this.Email,
                    password:this.Senha,
                });
                console.log(response.data);
                this.$router.push({name:'Login'});
            }catch(error){
                this.erro = 'Cadastro falhou:' + (error.response?.data?.message || error.message);
            }
        },
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

.cadastro-title {
    color: var(--text-color);
    text-align: center;
    margin-bottom: 20px;
}

.cadastro-container {
    max-width: 350px;
    margin: 0 auto;
    padding: 30px 20px;
    background-color: var(--card-bg);
    border-radius: 8px;
    box-shadow: var(--card-shadow);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.cadastro-container input{
    width: calc(100% - 40px);
    height: 35px;
    padding-left: 20px;
    margin-bottom: 20px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: var(--body-bg);
    color: var(--text-color);
    transition: border-color 0.2s ease, background-color 0.2s ease;
}
.cadastro-container input::placeholder {
    color: var(--text-color-secondary);
}
.cadastro-container input:focus {
    outline: none;
    border-color: var(--link-color);
}

.btn-cadastro {
    width: 200px;
    height: 40px;
    border-radius: 20px;
    color: var(--button-primary-text-color);
    background: var(--button-primary-bg);
    border: 1px solid var(--button-primary-bg);
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.btn-cadastro:hover {
    filter: brightness(0.9);
}
@media (max-width: 480px) {
  .cadastro-container {
    max-width: 100%;
    padding: 20px 15px; 
    box-shadow: none; 
    border-radius: 0;
  }
}
</style>