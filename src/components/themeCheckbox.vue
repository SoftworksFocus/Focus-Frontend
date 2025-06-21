<template>
<div class="theme-switcher">
    <label class="switch">
      <input type="checkbox" v-model="isDark" @change="toggleTheme"/>
      <span class="slider round"></span>
    </label>
    <span>{{ isDarkTheme ? 'Modo Escuro' : 'Modo Claro' }}</span>
  </div>
</template>

<script>
export default{
    name:'themeCheckbox',
    data(){
        return{
            isDark:false,
        }
    },
    methods:{
        applyTheme(){
        if (this.isDarkTheme) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light'); 
        }
    },
    toggleTheme(){
            this.isDark = !this.isDark;
            this.applyTheme();
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
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: relative;
  cursor: pointer;
  width: 50px;
  height: 25px;
  background-color: #ccc;
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
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  transform: translateX(25px);
}
</style>