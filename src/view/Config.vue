<template>
<div class="config-container">
    <h3 class="config-section-title">Privacidade e Segurança</h3>
    <div class="config-buttons-group">
        <button @click="MudEmail" class="btn-config">Mudar Email</button>
        <button @click="MudSenha" class="btn-config">Mudar Senha</button>
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
import MudEmail from './MudEmail.vue';
import MudSenha from './MudSenha.vue';
export default{
    name:'Config',
    components:{themeCheckbox,},
    data(){
        return{

        }
    },
    methods:{
        MudEmail(){
            this.$router.push({name:MudEmail})
        },
        MudSenha(){
            this.$router.push({name:MudSenha})
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
</style>