<script setup>
import { RouterView } from 'vue-router'
import TheHeroSection from './components/TheHeroSection.vue'
</script>

<template>
  <header>
    <TheHeroSection />
  </header>
  <main id="main">
    <RouterView />
  </main>
</template>
