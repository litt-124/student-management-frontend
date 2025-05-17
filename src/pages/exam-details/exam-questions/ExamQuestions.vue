<template>
  <div class="questions-page">
    <h2>{{ snippet.questionsPageTitle }}</h2>
<form class="form">
    <div class="question-list">
      <div v-for="(question, index) in questions" :key="index" class="question-block">
        <div class="question-header form-group">
          <h4>Question {{ index + 1 }}</h4>
          <button type="button" class="button button-secondary small-button danger" @click="removeQuestion(index)">×</button>
        </div>

        <label class="form-label">{{ snippet.questionTitle }}</label>
        <input v-model="question.title" class="form-control" placeholder="Enter question title" />

        <label class="form-label">{{ snippet.questionType }}</label>
        <select v-model="question.type" class="form-control">
          <option value="text">Text</option>
          <option value="multiple-choice">Multiple Choice</option>
          <option value="file-upload">File Upload</option>
        </select>

        <div v-if="question.type === 'multiple-choice'">
          <label class="form-label">{{ snippet.answerOptions }}</label>
          <div v-for="(option, oIndex) in question.answerOptions" :key="oIndex" class="option-line">
            <input v-model="question.answerOptions[oIndex]" class="form-control option-input" placeholder="Option text" />
            <button type="button" class="button button-secondary small-button" @click="removeOption(index, oIndex)">×</button>
          </div>
          <button type="button" class="button button-secondary add-option" @click="addOption(index)">{{ snippet.addOption }}</button>
        </div>

        <div>
          <label class="form-label">{{ snippet.attachments }}</label>
          <input type="file" multiple @change="handleFileUpload($event, index)" class="form-control" />

          <ul class="attachment-list">
            <li v-for="(file, fIndex) in question.attachments" :key="fIndex">
              {{ file.name }}
              <button type="button" class="button button-secondary small-button" @click="removeAttachment(index, fIndex)">×</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
</form>
    <button type="button" class="button button-primary add-question" @click="addQuestion">{{ snippet.addQuestion }}</button>
  </div>
</template>

<script>
import script from './script.js';

export default {
  ...script,
};
</script>

<style lang="scss">
@import '@/styles/components/exam/exam-details-questions.scss';
</style>