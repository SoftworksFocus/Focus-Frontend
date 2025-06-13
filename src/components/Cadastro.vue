<template>
    <button @click="voltar">Voltar</button>
    <h1>Cadastro</h1>
    <div class="Cadastre-se">
        <input type="text" v-model="novoUsername" placeholder="Crie seu username"/>
        <input type="text" v-model="novoEmail" placeholder="Coloque seu e-mail"/>
        <input type="password" v-model="novaSenha" placeholder="Crie sua senha"/>
        <button @click="cadastreSe" >Cadastre-se</button>
    </div>
</template>

<script>
import Login from './Login.vue'
import PagInicial from './PagInicial.vue' 
export default{
    name : 'Cadastro', 
     data() {
        return{
        novoUsername:"",
        novoEmail:"",
        novaSenha:"",
        username:[],
        email:[],
        senha:[],
}
},
    methods:{
        voltar(){
            this.$router.push({name:PagInicial})
        },
        cadastreSe(){
            if(this.novoUsername.trim() !== '' && this.novoEmail.trim() !== '' && this.novaSenha.trim() !== ''){
                this.username.push(this.novoUsername);
                this.email.push(this.novoEmail);
                this.senha.push(this.novaSenha);
                this.novaSenha = "";
                this.novoEmail = "";
                this.novoUsername = "";
                this.$router.push({name:Login});
            }
            else{    
                alert("os três campos devem ser preenchidos");
                this.novaSenha = "";
                this.novoEmail = "";
                this.novoUsername = "";
            }    
        }
    }
}
</script>

<style>
*{
    margin:0;
    padding:5px;
    list-style:none;
    text-decoration:none;
}
.Cadastre-se input{
    width:250px;
    height:25px;
    padding-left:20px;
    display:block;
    margin-bottom: 20px;
    margin-right: auto;
    margin-left: auto;
    border:1px solid skyblue;  
}
.Cadastre-se button{
    width: 200px;
    height: 30px;
    border-radius: 16px;
    color: black;
    background: white;
    border: 1px solid skyblue;
    cursor: pointer;
}

</style>