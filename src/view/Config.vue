<template>
<h3>Privacidade e Segurança</h3>
<div>
    <button @click="MudEmail">Mudar Email</button>
    <button @click="MudSenha">Mudar Senha</button>
</div>
<h3>Aparência</h3>
<div>
    <span>Trocar Tema</span>
    <themeCheckbox/>
</div>
</template>

<script>
//import botaoGenerico from '@/components/botaoGenerico.vue';
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