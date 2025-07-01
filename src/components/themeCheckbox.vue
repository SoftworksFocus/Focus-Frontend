<template>
<div class="theme-switcher">
      <input type="checkbox" v-model="isDark" @change="toggleTheme"/>
    <span class="theme-label-text">{{ isDark ? 'Modo Escuro' : 'Modo Claro' }}</span>
  </div>
</template>

<script>
export default{
    name:'themeCheckbox',
    data(){
        const savedTheme = localStorage.getItem('theme');
        const initialIsDark = savedTheme === 'dark';

        if (initialIsDark) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        console.log("themeCheckbox: Tema inicial aplicado via data(). isDark:", initialIsDark);

        return{
            isDark: initialIsDark,
        }
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
         toggleTheme(){
            this.applyTheme();
            console.log("themeCheckbox: toggleTheme ativado. isDark agora é:", this.isDark);
        },
}
}
</script>

<style scoped>
.theme-switcher {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px;
  user-select: none; 
  color: var(--text-color); 
}


.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}


.slider-round {
  position: relative;
  cursor: pointer;
  width: 50px;
  height: 25px;
  background-color: var(--switcher-bg); 
  transition: 0.4s;
  border-radius: 25px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 19px;
  width: 19px;
  left: 3px;
  bottom: 3px;
  background-color: var(--switcher-slider-bg);
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--switcher-active-bg);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--switcher-active-bg); 
}

input:checked + .slider:before {
  transform: translateX(25px);
}

.theme-label-text {
  font-size: 0.9em;
  font-weight: bold;
}
</style>