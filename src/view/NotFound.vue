<template>
  <div class="error-container">
    <div class="error-card">
      <h1 class="error-title">Erro 404</h1>
      <p class="error-message">Oops! A página que você está procurando não foi encontrada.</p>
      <p class="error-suggestion">Parece que o link está quebrado ou a página foi removida.</p>
      <button @click="irParaHome" class="btn-primary">Voltar para a Landing Page</button>
    </div>
  </div>
</template>

<script>
import PagInicial from './PagInicial.vue';

export default {
  name: 'NotFound',
  methods: {
    irParaHome() {
      this.$router.push({ name:PagInicial });
    }
  }
}
</script>

<style scoped>
.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  text-align: center;
  background-color: var(--background-color);
  color: var(--text-color);
}

.error-card {
  background-color: var(--card-bg);
  padding: 40px;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
  max-width: 500px;
}

.error-title {
  font-size: 3em;
  font-weight: bold;
  color: #e74c3c;
  margin: 0;
}

.error-message {
  font-size: 1.5em;
  margin-top: 10px;
  color: var(--text-color);
}

.error-suggestion {
  font-size: 1em;
  color: var(--text-color-secondary);
  margin-top: 5px;
  margin-bottom: 30px;
}

.btn-primary {
  width: 220px;
  height: 45px;
  border-radius: 22px;
  font-size: 1em;
  cursor: pointer;
  background-color: var(--button-primary-bg);
  color: var(--button-primary-text-color);
  border: 1px solid var(--border-color);
  transition: filter 0.2s ease;
}

.btn-primary:hover {
  filter: brightness(0.9);
}
</style>