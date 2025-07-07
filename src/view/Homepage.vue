<template>
  <div class="homepage-container">
    <Sidebar />
    <BotaoCriarFlutuante />
    <div class="Feed-section">
      <Feed />
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue';
import BotaoCriarFlutuante from '@/components/botaoCriarFlutuante.vue';
import Feed from '../components/feed.vue';


export default {
  name: 'Homepage',
  components: {
    Sidebar,
    BotaoCriarFlutuante,
    Feed,
  },
  data() {
    return {
      atividades: [],
      erro: '',
    };
  },
  methods:{
    applyTheme(){
            if (this.isDark) {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                localStorage.setItem('theme', 'light');
            }
            console.log("themeCheckbox: applyTheme ativado. Tema:", this.isDark ? 'dark' : 'light');
    },
  },
  created(){
    this.applyTheme
  }
};
</script>

<style scoped>
.homepage-container {
    padding: 20px;
    padding-left: 80px; 
}

.search-section {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 30px;
}
.search-toggle-btn {
    background-color: var(--button-default-bg);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    padding: 8px 12px;
    color: var(--button-text-color);
    cursor: pointer;
    margin-right: 10px;
}
.search-input {
    width: 250px;
    height: 35px;
    padding-left: 15px;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    background-color: var(--body-bg);
    color: var(--text-color); 
}
.Feed-section {
    margin-bottom: 40px;
}
.search-icon, .icon-close {
    width: 20px;
    height: 20px;
    filter: invert(var(--icon-filter-invert, 0));
}
@media (max-width: 768px) {
  .homepage-container {
    padding-left: 20px; 
  }
}
</style>