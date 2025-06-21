<template>
    <div>
    <button class="['btn', tipo]" @click="$emit('toggleBusca')"> 
      <img 
        src="@/assets/lupa_v1.png" 
        alt="Buscar"
        :class="{ 'hidden-image': !ativo}"
      />
      <img 
        src="@/assets/X_icon.png"
        alt="Fechar"
        :class="{ 'hidden-image': ativo}"
      />
    </button>

    </div>
</template>

<script>
export default{
    name:'botaoGenerico',
    props:{
        ativo:{
          type:Boolean,
        },
        post:{
          type:Boolean,
        }
    },
}
</script>
<style scoped>

.hidden-image {
  display: none !important;
}
button img {
  width: 30px !important;   
  height: 30px !important;  
  display: block !important;
  opacity: 1 !important;   
  border: 2px solid purple !important; 
}
 button{
    border: 1px solid red; background: yellow;
    position: relative;
    }
</style>