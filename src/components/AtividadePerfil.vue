<template>
  <div class="midia-container">
    <div v-for="m in midias" :key="m.id" class="midia">
      <router-link :to="`/atividade/${atividade.id}`" class="activity-link">
        <video
          v-if="m.url.endsWith('.mp4')"
          controls
          width="300"
        >
          <source :src="m.url" type="video/mp4" />
        </video>
        <img
          v-else
          :src="m.url"
          alt="Mídia"
          width="200"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AtividadePerfil',
  props: {
    midias: {
      type: Array,
      required: true
    },
    atividade: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.midia-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
}

.midia img,
.midia video {
  border-radius: 8px;
  max-width: 100%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  cursor: pointer; 
}

.midia img:hover,
.midia video:hover {
  opacity: 0.8;
  transform: scale(1.02);
  transition: all 0.2s ease-in-out;
}
</style>