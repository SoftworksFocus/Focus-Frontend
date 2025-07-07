<template>
    <div class="credentials-change-container">
        <button class="btn-voltar" @click="Voltar">Voltar</button>
        <h3 class="change-title">Mudança de credenciais</h3>
        <input type="text" v-model="email" placeholder="Email" class="change-input"/>
        <span>Coloque sua nova senha</span>
        <input type="password" v-model="novaSenha" placeholder="*******" class="change-input"/>
        <span>Confirme sua nova senha</span>
        <input type="password" v-model="confirmaSenha" placeholder="*******" class="change-input"/>
        <p> {{ erro }}</p>
        <button @click="Confirmar" class="btn-primary">Confirmar</button>
    </div>
</template>

<script>
import api from '@/api';
    export default{
        name:'MudSenha',
        data(){
            return{
                email:"",
                novaSenha:"",
                confirmaSenha:"",
                erro:""
            }
        },
        methods:{
            Voltar(){
             this.$router.push({name:'Config'})
            },
            async Confirmar(){
                try{
                    if(this.novaSenha !== this.confirmaSenha){
                    this.erro = "As senhas precisam ser iguais" 
                    }
                    await api.post(`/api/Auth/reset-password`,{
                        email:this.email,
                        newPassword:this.novaSenha,
                    })
                    this.$router.push({name:'Config'})
                }catch(error){
                    this.erro = 'não foi possível mudar a senha'
                }
            },
        }
    }
</script>

<style scoped>
.credentials-change-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 30px 20px;
    background-color: var(--card-bg);
    border-radius: 8px;
    box-shadow: var(--card-shadow);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--text-color);
    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.change-title {
    margin-bottom: 25px;
    text-align: center;
    color: var(--text-color);
}

.credentials-change-container span {
    color: var(--text-color);
    margin-bottom: 10px;
}

.change-input {
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
.change-input::placeholder {
    color: var(--text-color-secondary);
}
.change-input:focus {
    outline: none;
    border-color: var(--link-color);
}

.btn-primary {
    width: 180px;
    height: 40px;
    border-radius: 20px;
    color: var(--button-primary-text-color);
    background: var(--button-primary-bg);
    border: 1px solid var(--button-primary-bg);
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.btn-primary:hover {
    filter: brightness(0.9);
}
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
@media (max-width: 480px) {
  .recovery-container, .credentials-change-container {
    padding: 20px 15px;
    margin: 10px;
    box-shadow: none; 
    border-radius: 0; 
    max-width: 100%;
  }

  .btn-primary {
    width: 100%;
  }
}
</style>