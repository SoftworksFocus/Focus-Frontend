<template>
  <Card class="activity-card">
    <div class="activity-header">
    <h3 class="activity-name">{{ atividade.title }}</h3>
    <p>{{ atividade.description }}</p>
    <p>{{ atividade.startDate }} → {{ atividade.endDate }}</p>
    <p>Status: {{ atividade.status ? 'Ativa' : 'Inativa' }}</p>
    <p>Usuário: {{ atividade.user.username }}</p>
    <p>Grupo: {{ atividade.group.name }}</p>
    </div>
    <div v-if="atividade.media && atividade.media.length" class="activity-image">
      <ul>
        <li v-for="m in atividade.media" :key="m.id">
          <video
            v-if="eVideo(m.url)"
            controls
            width="320"
            height="240"
          >
            <source :src="m.url" type="video/mp4" />
            Seu navegador não suporta vídeo.
          </video>

          <img
            v-else
            :src="m.url"
            :alt="m.caption"
            width="200"
          />
          <p>{{ m.caption }}</p>
        </li>
      </ul>
    </div>
  </Card>
</template>

<script>
import Card from './card.vue'
export default {
  name: 'Atividade',
  components:{Card},
  props: {
    atividade: {
      type: Object,
      required: true
    }
  },
  methods:{
    eVideo(url){
      return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg');
    },
  }
};
</script>

<style scoped>
.activity-card {
  display: flex;
  flex-direction: column; 
}

.activity-header {
  text-align: center;
  margin-bottom: 15px;
}

.activity-image {
  width: 100%;
  max-height: 150px; 
  object-fit: cover; 
  border-radius: 6px;
  margin-bottom: 10px;
}

.activity-name {
  font-size: 1.6em;
  color: var(--text-color); 
  margin: 0;
}
</style>