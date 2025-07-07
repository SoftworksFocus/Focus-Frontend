<template>
<div class="config-container">
    <button @click="Voltar" class="btn-voltar">Voltar</button>
    <h3 class="config-section-title">Privacidade e Segurança</h3>
    <div class="config-buttons-group">
        <button @click="MudEmail" class="btn-config">Mudar Email</button>
        <button @click="MudSenha" class="btn-config">Mudar Senha</button>
        <button @click="DeletarConta" class="btn-danger btn-config">Deletar Conta</button>
    </div>
    <h3 class="config-section-title">Aparência</h3>
    <div class="theme-setting">
        <span class="theme-label-text">Trocar Tema</span>
        <themeCheckbox/>
    </div>
</div>
</template>

<script>
import themeCheckbox from '@/components/themeCheckbox.vue';
import api from '@/api';
import { getUserIdFromToken } from '@/utils/auth';
export default{
    name:'Config',
    components:{themeCheckbox,},
    data(){
        return{

        }
    },
    methods:{
        MudEmail(){
            this.$router.push({name:'TelaLink'})
        },
        MudSenha(){
            this.$router.push({name:'TelaLink'})
        },
        Voltar(){
            this.$router.push({name:'Homepage'})
        },
        async DeletarConta(){
            const userId = getUserIdFromToken();
             if (confirm('Tem certeza que deseja DELETAR esta conta? Esta ação é irreversível.')) {
            try{
                await api.delete(`/api/User/${userId}`)
                this.$router.push({name:'PagInicial'})
            }catch(error){
                this.error = 'Erro ao deletar a conta'
            }
        }
    },
    }

}
</script>

<style scoped>
.config-container {
    max-width: 600px;
    margin: 30px auto;
    padding: 30px 20px;
    background-color: var(--card-bg); 
    border-radius: 8px;
    box-shadow: var(--card-shadow); 
    color: var(--text-color); 
    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.config-section-title {
    margin-top: 25px;
    margin-bottom: 15px;
    color: var(--text-color); 
    text-align: center;
    border-bottom: 1px solid var(--border-color); 
    padding-bottom: 10px;
}

.config-buttons-group {
    display: flex;
    flex-direction: column; 
    gap: 15px; 
    margin-bottom: 30px;
    align-items: center;
}

.btn-config {
    width: 200px;
    height: 40px;
    border-radius: 20px;
    color: var(--button-text-color);
    background: var(--button-default-bg);
    border: 1px solid var(--border-color);
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.btn-config:hover {
    filter: brightness(0.9);
}

.theme-setting {
    display: flex;
    align-items: center;
    justify-content: center; 
    gap: 15px;
    margin-top: 25px;
    padding: 15px;
    border: 1px solid var(--border-color); 
    border-radius: 8px;
    background-color: var(--task-item-bg);
    transition: background-color 0.3s ease, border-color 0.3s ease;
}

.theme-label-text {
    font-size: 1.1em;
    font-weight: bold;
    color: var(--text-color); 
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
.btn-danger {
  background-color: #e74c3c;
  color: white;
}
@media (max-width: 480px) {
  .config-container {
    max-width: 100%;
    padding: 20px 15px; 
    box-shadow: none;
    border-radius: 0;
  }
}
</style>