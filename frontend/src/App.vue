<script setup>
import Sidebar from './components/sidebar.vue'
</script>

<template>
  <div class="app">
    <Sidebar />

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

html,
body,
#app {
  margin: 0;
  min-height: 100%;
  width: 100%;
  min-height: 100vh;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  background: #f3f4f6;
  color: #111827;
}

.app {
  min-height: 100vh;
  display: flex;
  width: 100%;
}

.main {
  flex: 1;
  min-width: 0;
  width: calc(100% - 240px);
}
</style>
