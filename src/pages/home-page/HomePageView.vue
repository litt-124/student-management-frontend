<template>
  <div class="home-page">
    <div class="home-card">
      <h1 class="home-title">{{ homePageSnippet.welcomeTitle }}</h1>
      <p class="home-desc">{{ homePageSnippet.welcomeDescription }}</p>

      <router-link to="/exams" class="button button-primary">
        {{ homePageSnippet.goToExams }}      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/components/home-page/home-page.scss';
</style>

<script>
import script from './script.js';

export default {
  ...script,
};
</script>