<template>
  <div class="exam-details">
    <button type="submit" @click="save" class="button button-primary save-button"><i
        class="fas fa-upload"></i>{{ examSnippet.save }}
    </button>
    <div class="left-side">
      <div class="menu-link" :class="{ 'active': showMain }" @click="showComponent('Main')">{{ examSnippet.mainPageTitle }}</div>
      <div class="menu-link" :class="{ 'active': showQuestions }" @click="showComponent('Questions')">{{ examSnippet.questionsPageTitle }}</div>
      <div class="menu-link" :class="{ 'active': showAnswers }" @click="showComponent('Answers')">{{ examSnippet.answersPageTitle }}</div>

    </div>
    <div class="right-side">
      <ExamEdit v-if="showMain"
                 :exam="examDataToShow"
                 @updated-exam-data="storeUpdatedExamData"
      ></ExamEdit>
      <ExamQuestions v-if="showQuestions" :exam="examDataToShow"
                      @updated-exam-questions="storeUpdatedExamData">
      </ExamQuestions>
      <ExamAnswers v-if="showAnswers" :exam="examDataToShow">
      </ExamAnswers>
    </div>
    <router-link to="/exams" class="back-button">
      <i class="fas fa-arrow-left"></i>
    </router-link>
  </div>
</template>
<script>
import script from './script.js';

export default {
  ...script,
};
</script>

<style lang="scss">
@import '@/styles/components/exam/exam-details.scss';
</style>

