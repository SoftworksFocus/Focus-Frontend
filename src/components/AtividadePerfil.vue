<template>
  <router-link :to="`/atividade/${atividade.id}`" class="activity-link">
    <div class="container-atividade">
    <router-link :to="`/atividade/${atividade.id}`" class="titulo-link">
      <h4>{{ tituloTruncado }}</h4>
    </router-link>

    <div class="conteudo-atividade">
      <div v-if="temMedia" class="container-midias">
        <div v-for="midia in midias" :key="midia.id" class="item-midia">
          <router-link :to="`/atividade/${atividade.id}`">
            <video v-if="eVideo(midia.url)" :src="midia.url" class="midia" controls></video>
            <img v-else :src="midia.url" class="midia" alt="Mídia da atividade" />
          </router-link>
        </div>
      </div>

      <div v-else class="placeholder-sem-midia">
        <p>{{ atividade.description || 'Esta atividade não possui mídia.' }}</p>
      </div>
    </div>
  </div>
  </router-link>
</template>

<script>
export default {
  name: 'AtividadePerfil',
  props: {
    atividade: {
      type: Object,
      required: true
    },
    midias: {
      type: Array,
      default: () => [] 
    }
  },
  computed: {
    tituloTruncado() {
      if (!this.atividade || !this.atividade.title) {
        return 'Atividade'; 
      }
      return this.atividade.title.split(' ')[0]; 
    },
    temMedia() {
      return this.midias && this.midias.length > 0;
    },
    primeiraMidia() {
      return this.temMedia ? this.midias[0] : null;
    }
  },
  methods: {
    eVideo(url) {
      if (!url) return false;
      const videoExtensions = ['.mp4', '.webm', '.ogg'];
      return videoExtensions.some(ext => url.toLowerCase().endsWith(ext));
    }
  }
}
</script>

<style scoped>
.container-atividade {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--card-bg);
}

.titulo-link {
  text-decoration: none;
  color: var(--text-color);
}

.titulo-link h4 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  cursor: pointer;
  display: inline-block;
}

.titulo-link h4:hover {
  text-decoration: underline;
}

.container-midias {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.item-midia .midia {
  width: 100%;
  max-width: 250px;
  height: auto;
  border-radius: 6px;
  object-fit: cover;
  display: block;
}

.placeholder-sem-midia p {
  background-color: var(--body-bg);
  padding: 1rem;
  border-radius: 6px;
  font-style: italic;
  color: var(--text-color-secondary);
  margin: 0;
}
</style>