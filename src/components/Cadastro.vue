<template>
    <h1>Cadastro</h1>
    <div class="Cadastre-se">
        <input type="text" placeholder="Crie seu username"/>
        <input type="text" placeholder="Coloque seu e-mail"/>
        <input type="password" placeholder="Crie sua senha"/>
        <button >Cadastre-se</button>
    </div>
</template>

<script>
export default{
    name : 'Cadastro',}
    /*data(){
        username:'',
        email:'',
        senha:''
    },
    methods:{
        cadastreSe(){
            if(this.username.trim == '' || this.email.trim == '' || this.senha.trim == ''){

            }
            else{

            }
        }
    }
}*/
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