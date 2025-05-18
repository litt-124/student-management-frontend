<template>
  <div class="home-page">
    <h2 class="title">{{ snippet.dashboardTitle }}</h2>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <div v-if="upcomingExams.length > 0">
        <div v-for="exam in upcomingExams" :key="exam._id" class="exam-card">
          <h3>{{ exam.title }}</h3>
          <p>{{ snippet.startsAt }}: {{ formatDateTime(exam.startTime) }}</p>
          <p>{{ snippet.status }}: {{ exam.status }}</p>
          <router-link :to="`/take-exam/${exam.id}`" class="button button-primary">
            {{ snippet.startExam }}
          </router-link>
        </div>
      </div>
      <div v-else>
        <p>{{ snippet.noExams }}</p>
      </div>
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