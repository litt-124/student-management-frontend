<template>
  <div class="main-page">
    <h2>{{ snippet.mainPageTitle }}</h2>
    <form class="form">
      <div class="form-group">
        <label class="form-label">{{ snippet.title }}</label>
        <input v-model="exam.title" class="form-control" />
      </div>
      <div class="form-group">
        <label class="form-label">{{ snippet.userGroup }}</label>
        <select v-model="exam.userGroupId" class="form-control">
          <option v-for="group in userGroups" :key="group.id" :value="group.id">{{ group.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">{{ snippet.user }}</label>
        <select v-model="exam.userId" class="form-control">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.firstName }} {{ user.lastName }}</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">{{ snippet.lab }}</label>
        <select v-model="exam.labId" class="form-control">
          <option :value="null">None</option>
          <option v-for="lab in labs" :key="lab.id" :value="lab.id">{{ lab.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">{{ snippet.status }}</label>
        <select v-model="exam.status" class="form-control">
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">{{ snippet.startTime }}</label>
        <input
            class="form-control"
            type="datetime-local"
            :value="formattedDate(exam.startTime)"
            @input="exam.startTime = $event.target.value"
        />      </div>
      <div class="form-group">
        <label class="form-label">{{ snippet.endTime }}</label>
        <input
            class="form-control"
            type="datetime-local"
            :value="formattedDate(exam.endTime)"
            @input="exam.endTime = $event.target.value"
        />      </div>
    </form>
  </div>
</template>
<script>
import script from './script.js';

export default {
  ...script,
};
</script>

<style lang="scss">
@import '@/styles/components/exam/exam-details-edit.scss';
</style>