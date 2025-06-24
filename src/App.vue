<template>
<router-view/>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
:root {
  --background-color: #f0f2f5;
  --text-color: #333;
  --header-bg: #fff;
  --card-bg: #ffffff;
  --border-color: #e0e0e0;
}

body.dark-theme {
  --background-color: #2c2c2c;
  --text-color: #e0e0e0;
  --header-bg: #3c3c3c;
  --card-bg: #444444;
  --border-color: #555555;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.app-header {
  background-color: var(--header-bg);
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
}

.card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
