<template>
  <label class="checkbox-wrapper">
    <input 
      type="checkbox" 
      :checked="modelValue" 
      @change="$emit('update:modelValue', $event.target.checked)" 
    />
    <slot></slot> </label>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.checkbox-wrapper {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}
.checkbox-wrapper input[type="checkbox"] {
  margin-right: 5px;
}
</style>