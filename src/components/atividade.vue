<template>
  <router-link :to="`/atividade/${atividade.id}`" class="activity-link">
    <div class="activity-card">
      <div class="activity-content">
        <h3 class="activity-title">{{ atividade.title }}</h3>
        <p class="activity-description">{{ atividade.description }}</p>
        <div class="activity-time">
          <span>Início: {{ formatarData(atividade.startDate) }}</span>
          <span>Fim: {{ formatarData(atividade.endDate) }}</span>
        </div>
      </div>

      <div class="activity-meta">
        <div v-if="atividade.group" class="group-tag">{{ atividade.group.name }}</div>
        
        <div v-if="atividade.media && atividade.media.length" class="media-preview">
          <img v-if="!eVideo(atividade.media[0].url)" :src="atividade.media[0].url" alt="Mídia da atividade" class="media-item">
          <video v-else :src="atividade.media[0].url" class="media-item" muted autoplay loop playsinline></video>
          
          <span v-if="atividade.media.length > 1" class="more-media-indicator">
            +{{ atividade.media.length - 1 }}
          </span>
        </div>
        <div v-else class="media-placeholder">
          <img :src="require('@/assets/icon_group.png')" alt="Ícone de Grupo" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>

import { formatarDataParaExibicao } from '@/utils/auth';
export default {
  name: 'atividade',
  props: {
    atividade: {
      type: Object,
      required: true
    }
  },
  methods: {
    eVideo(url) {
      if (!url) return false;
      return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg');
    },
    formatarData(dataString) {
      return formatarDataParaExibicao(dataString);
    },
  }
};
</script>

<style scoped>
.activity-link {
  text-decoration: none;
  color: inherit;
}

.activity-card {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.activity-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
}

.activity-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.activity-title {
  font-size: 1.4em;
  font-weight: bold;
  margin: 0 0 8px 0;
}

.activity-description {
  font-size: 1em;
  color: var(--text-color);
  line-height: 1.5;
  margin: 0 0 16px 0;
  flex-grow: 1;
}

.activity-time {
  font-size: 0.9em;
  color: #e74c3c;
  font-weight: 500;
  display: flex;
  gap: 15px;
}

.activity-meta {
  flex-basis: 150px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
}

.group-tag {
  background-color: var(--button-default-bg);
  color: var(--text-color);
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8em;
  font-weight: bold;
  border: 1px solid var(--border-color);
  white-space: nowrap;
}

.media-preview, .media-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  background-color: var(--body-bg);
  position: relative;
  overflow: hidden;
}

.media-item {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.media-placeholder img {
  width: 50%;
  height: 50%;
  object-fit: contain;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
  filter: invert(var(--icon-filter-invert, 0));
}

.more-media-indicator {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75em;
  font-weight: bold;
}

@media (max-width: 600px) {
  .activity-card {
    flex-direction: column; 
    gap: 15px;
  }
  
  .activity-meta {
    flex-direction: row-reverse; 
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex-basis: auto; 
  }

  .media-preview, .media-placeholder {
    width: 80px;
    height: 80px;
  }
}
</style>