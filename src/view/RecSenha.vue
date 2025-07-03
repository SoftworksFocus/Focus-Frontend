<template>
    <div class="recovery-container">
        <h3 class="recovery-title">Digite o email da sua conta para confirmar sua identidade:</h3>
        <input type="text" placeholder="digite seu e-mail" class="recovery-input" v-model="input_rec"/>
        <button class="btn-primary" @click="Confirmar">Confirmar</button>
    </div>
</template>

<script>
import Login from './Login.vue';
    export default{
        name:'RecSenha',
        data(){
            return{
                input_rec:""
            }
        },
        methods:{
            Confirmar(){
             this.$router.push({name:Login})
            }
        }
    }
</script>

<style scoped>
.recovery-container {
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

.recovery-title {
    margin-bottom: 25px;
    text-align: center;
    color: var(--text-color); 
}

.recovery-input {
    width: calc(100% - 40px);
    height: 35px;
    padding-left: 20px;
    margin-bottom: 25px;
    border: 1px solid var(--border-color); 
    border-radius: 5px;
    background-color: var(--body-bg);
    color: var(--text-color); 
    transition: border-color 0.2s ease, background-color 0.2s ease;
}
.recovery-input::placeholder {
    color: var(--text-color-secondary);
}
.recovery-input:focus {
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
</style>