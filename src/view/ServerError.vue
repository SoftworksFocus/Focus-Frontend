<template>
  <div class="error-container">
    <div class="error-card">
      <h1 class="error-title">Erro 500</h1>
      <p class="error-message">Desculpe, algo deu errado em nossos servidores.</p>
      <p class="error-suggestion">Nossa equipe já foi notificada. Por favor, tente recarregar a página ou volte mais tarde.</p>
      <div class="button-group">
        <button @click="recarregarPagina" class="btn-default">Recarregar a Página</button>
        <button @click="irParaHome" class="btn-primary">Voltar para a Homepage</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ServerError',
  methods: {
    irParaHome() {
      this.$router.push({ name:'Homepage'});
    },
    recarregarPagina() {
      window.location.reload();
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

.button-group {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
}

.btn-primary, .btn-default {
    width: 220px;
    height: 45px;
    border-radius: 22px;
    font-size: 1.1em;
    cursor: pointer;
    transition: filter 0.2s ease;
}

.btn-primary {
  background-color: var(--button-primary-bg);
  color: var(--button-primary-text-color);
  border: 1px solid var(--button-primary-bg);
}

.btn-default {
    background-color: var(--button-default-bg);
    color: var(--button-text-color);
    border: 1px solid var(--border-color);
}

.btn-primary:hover, .btn-default:hover {
  filter: brightness(0.9);
}
@media (max-width: 480px) {
  .error-card {
    padding: 20px;
    margin: 10px;
  }

  .error-title {
    font-size: 2.5em;
  }

  .error-message {
    font-size: 1.2em;
  }

  .btn-primary, .btn-default {
    width: 100%;
    font-size: 1em;
  }
}
</style>