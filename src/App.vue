<script setup>
import Navbar from './components/Navbar.vue';
import RegisterForm from './components/funcionalidad_1/RegisterForm.vue';
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main class="p-3">
    <router-view></router-view>
  </main>
</template>

<style scoped>
</style>
