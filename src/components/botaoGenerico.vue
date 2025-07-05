<template>
   <div>
    <button class="generico-btn" @click="$emit('toggle')">
      <slot></slot> 
    </button>

    </div>
</template>

<script>
export default{
    name:'botaoGenerico',
}
</script>
<style scoped>
.generico-btn {
  
  background-color: var(--button-default-bg);
  border: 1px solid var(--border-color);
  border-radius: 5px;
  padding: 8px; 
  cursor: pointer;
  display: flex; 
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.generico-btn:hover {
  filter: brightness(0.9);
}

.generico-btn img {
  width: 30px; 
  height: 30px;
  filter: invert(var(--icon-filter-invert, 0)); 

.hidden-image {
  display: none !important; 
}
}
</style>