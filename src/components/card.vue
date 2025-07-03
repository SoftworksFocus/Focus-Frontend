<template>
  <div class="card">
    <slot name="header"></slot>
    <slot></slot> 
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style scoped>
.card {
  border: 1px solid var(--card-border); 
  border-radius: 8px;
  padding: 20px;
  box-shadow: var(--card-shadow); 
  background-color: var(--card-bg); 
  color: var(--text-color); 
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
</style>