<template>
  <div class="take-exam-page">
    <h2>{{ exam.title }}</h2>
    <form @submit.prevent="submitAnswers" v-if="!loading">
      <div v-for="(question, index) in exam.questions" :key="index" class="question-block">
        <h4>{{ index + 1 }}. {{ question.title }}</h4>

        <div v-if="question.type === 'text'">
          <textarea v-if="answers[question._id]" v-model="answers[question._id].value" class="form-control" rows="5"></textarea>
        </div>

        <div v-else-if="question.type === 'multiple-choice'">
          <div v-if="answers[question._id]" v-for="(option, oIndex) in question.answerOptions" :key="oIndex">
            <input type="radio"
                   :name="`q-${question._id}`"
                   :value="option"
                   v-model="answers[question._id].value" />
            <label>{{ option }}</label>
          </div>
        </div>

        <div v-else-if="question.type === 'file-upload'">
          <input type="file" multiple @change="handleFileUpload($event, question._id)" />
          <ul>
            <li v-for="(file, fIndex) in answers[question._id].attachments" :key="fIndex">
              {{ file.name }}
            </li>
          </ul>
        </div>
      </div>
      <button class="button button-primary" type="submit">Submit Exam</button>
    </form>
  </div>
</template>
<style lang="scss">
@import '@/styles/components/take-exam/take-exam.scss';
</style>

<script>
import script from './script.js';

export default {
  ...script,
};
</script>