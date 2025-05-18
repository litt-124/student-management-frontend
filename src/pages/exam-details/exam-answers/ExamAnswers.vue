<template>
  <div class="exam-review-page">
    <h2>{{ snippet.reviewAnswers }}</h2>
<form class="form">
    <div class="form-group">
      <label class="form-label">{{ snippet.selectStudent }}</label>
      <select v-model="selectedStudentId" @change="loadStudentAnswers" class="form-control">
        <option disabled value="">-- {{ snippet.selectStudent }} --</option>
        <option v-for="student in studentList" :key="student.id" :value="student.id">
          {{ student.firstName }} {{ student.lastName }}
        </option>
      </select>
    </div></form>

    <div v-if="studentAnswers.length">
      <div v-for="answer in studentAnswers" :key="answer.questionId" class="answer-block">
        <h4>{{ answer.title }}</h4>
        <div v-if="answer.type === 'text' || answer.type === 'multiple-choice'">
          <p>{{ answer.studentAnswer || snippet.noAnswer }}</p>
        </div>
        <div v-else-if="answer.type === 'file-upload'">
          <a v-if="answer.studentAnswer" :href="answer.studentAnswer" target="_blank">Download File</a>
          <p v-else>{{ snippet.noAnswer }}</p>
        </div>
      </div>
    </div>
    <div v-else-if="selectedStudentId">
      <p>{{ snippet.noAnswer }}</p>
    </div>
  </div>
</template>
<script>
import script from './script.js';

export default {
  ...script,
};
</script>

<style lang="scss">
@import '@/styles/components/exam/exam-details-answers.scss';
</style>