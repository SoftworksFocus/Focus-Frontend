<template>
  <div class="card">
    <slot name="header"></slot>
    <slot></slot> <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.08);
  background-color: #fff;
}
</style>