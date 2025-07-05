<template>
  <div class="grupo-card" @click="selecionarGrupo">
    <div class="card-content">
      <h3 class="grupo-nome">{{ grupo.name }}</h3>
      <p class="grupo-descricao">{{ grupo.description }}</p>
    </div>
    <div class="grupo-imagem-container">
      <img :src="grupo.profilePictureUrl" :alt="'Imagem do ' + grupo.name" class="grupo-imagem">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Grupos',
  props: {
    grupo: {
      type: Object,
      required: true
    }
  },
  methods: {
    selecionarGrupo() {
      this.$emit('grupo-selecionado', this.grupo.id);
    }
  }
}
</script>

<style scoped>
.grupo-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: var(--card-shadow);
}

.grupo-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px var(--card-shadow);
}

.card-content {
  flex: 1;
}

.grupo-nome {
  margin: 0 0 5px 0;
  color: var(--text-color);
  font-size: 1.2em;
}

.grupo-descricao {
  color: var(--text-color-secondary);
  font-size: 0.9em;
  margin: 0;
}

.grupo-imagem-container {
  margin-left: 20px;
}

.grupo-imagem {
  width: 80px; 
  height: 80px; 
  border-radius: 8px;
  object-fit: cover;}
</style>