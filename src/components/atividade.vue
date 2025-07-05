<template>
<router-link :to="`/atividade/${atividade.id}`" class="activity-link">
  <Card class="activity-card">
    <div>
    <h3>{{ atividade.title }}</h3>
    <p>{{ atividade.description }}</p>
    <p>{{ atividade.startDate }} → {{ atividade.endDate }}</p>
    <p>Status: {{ atividade.status ? 'Ativa' : 'Inativa' }}</p>
    <p>Usuário: {{ atividade.user.username }}</p>
    <p>Grupo: {{ atividade.group.name }}</p>
    </div>
    <div v-if="atividade.media && atividade.media.length">
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
</router-link>
</template>

<script>
import Card from './card.vue'
export default {
  name: 'atividade',
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
ul{
  list-style-type: none;
}
.activity-card {
  background-color: var(--card-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  margin: 20px auto;
  max-width: 700px;
  box-shadow: 0 4px 10px var(--border-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}
.activity-card h2 {
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 8px;
}

.activity-card p {
  margin: 6px 0;
  color: var(--text-color);
}

.midia-container {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.midia img,
.midia video {
  border-radius: 8px;
  max-width: 100%;
  box-shadow: 0 2px 8px var(--border-color);
}

.activity-header {
  text-align: center;
  margin-bottom: 15px;
}


.activity-name {
  font-size: 1.6em;
  color: var(--text-color); 
  margin: 0;
}
.activity-link{
  text-decoration: none;
}
</style>