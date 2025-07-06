<template>
  <div>
    <button @click="toggleSidebar" class="sidebar-toggle-btn">
      <img v-if="!isOpen" :src="require('@/assets/menu_icon.png')" alt="Menu" class="sidebar-btn"/>
      <img v-else :src="require('@/assets/X_icon.png')" alt="Fechar Menu" class="sidebar-btn"/>
    </button>

    <transition name="slide">
      <div v-if="isOpen" class="sidebar">
        <nav class="sidebar-nav">
          <button @click="irPara('Homepage')" class="sidebar-btn">
            <img src="@/assets/icon_home.png" alt="Homepage" class="icon-sidebar"/>
            Homepage
          </button>
          <button @click="irPara('Perfil')" class="sidebar-btn">
            <img src="@/assets/icon.png" alt="Perfil" class="icon-sidebar">
            Perfil
          </button>

          <button @click="irPara('Config')" class="sidebar-btn">
            <img src="@/assets/config_icon.png" alt="Configurações" class="icon-sidebar">
            Configurações
          </button> 
          <button  @click="irPara('ExplorarGrupos')" class="sidebar-btn">
            <img src="@/assets/icon_group.png" alt="Grupos" class="icon-sidebar"/>
            Explorar Grupos
          </button>
        <div class="sidebar-footer">
           <button @click="irPara('Login', true)" class="sidebar-btn logout-btn">
            Sair
          </button>
        </div>
        </nav>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      isOpen: false,
    };
  },
    methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    irPara(routeName, isLogout = false) {
      if (isLogout) {
        localStorage.removeItem('authToken');
      }
      this.$router.push({ name: routeName });
      this.isOpen = false;
    }
  }

}
</script>

<style scoped>
.sidebar-toggle-btn {
  position: fixed; top: 20px; left: 20px; z-index: 1001;
  background-color: var(--primary-color); 
color: white;
border: none;
border-radius: 50%; 
width: 40px;
height: 40px;
box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
transition: background-color 0.3s ease;
margin: 10px auto; 
}

.sidebar-toggle-button:hover {
background-color: var(--primary-color-darker);
}


.sidebar-toggle-button i,
.floating-button i {
font-size: 1.2rem; 
}
.sidebar-toggle-btn:hover { transform: scale(1.05); }
.icon-menu, .icon-close { width: 24px; height: 24px; filter: invert(var(--icon-filter-invert, 0)); }

.sidebar {
  position: fixed; top: 0; left: 0; height: 100%; width: 250px;
  background-color: var(--header-bg); box-shadow: 2px 0 5px rgba(0,0,0,0.2);
  padding: 80px 0 20px; z-index: 1000; display: flex; 
  flex-direction: column; justify-content: space-between; 
}

.sidebar-nav, .sidebar-footer {
  padding: 0 20px; box-sizing: border-box; width: 100%;
}

.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }

.sidebar-btn {
  width: 100%; padding: 15px 10px; margin-bottom: 10px; background: none;
  border: none; text-align: left; font-size: 1.1em; color: var(--text-color);
  cursor: pointer; display: flex; align-items: center; gap: 10px;
  border-radius: 5px; transition: background-color 0.2s ease;
}
.sidebar-btn:hover { background-color: var(--button-default-bg); }
.icon-sidebar { width: 20px; height: 20px; filter: invert(var(--icon-filter-invert, 0)); }
.logout-btn { color: #e74c3c; margin-bottom: 0; }
</style>