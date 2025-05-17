<template>
  <div class="exam-page">
    <div class="table-container">
      <div class="table-container-top">
        <div class="title">{{ snippet.exams }}</div>
        <div class="search-container">
          <form class="form" @submit.prevent="search">
            <div class="form-group">
              <label class="form-label body4">{{ snippet.search }}</label>
              <input class="form-control" v-model="searchText" placeholder="" />
            </div>
          </form>
          <button @click="toggleAddPopup" class="button button-primary button-with-icon">
            <i class="fa-solid fa-plus"></i>
            {{ snippet.addExam }}
          </button>
        </div>
      </div>

      <PopupComponent :isVisible="showAddPopup" :title="snippet.addExam" fasIcon="fa-plus">
        <template v-slot:content>
          <form class="form">
            <div class="form-group">
              <label class="form-label">{{ snippet.title }}</label>
              <input v-model="form.title" class="form-control" />
            </div>
            <div class="form-group">
              <label class="form-label">{{ snippet.userGroup }}</label>
              <select v-model="form.userGroupId" class="form-control">
                <option v-for="group in userGroups" :key="group.id" :value="group.id">{{ group.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">{{ snippet.user }}</label>
              <select v-model="form.userId" class="form-control">
                <option v-for="user in users" :key="user.id" :value="user.id">{{ user.firstName }} {{ user.lastName }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">{{ snippet.lab }}</label>
              <select v-model="form.labId" class="form-control">
                <option :value="null">None</option>
                <option v-for="lab in labs" :key="lab.id" :value="lab.id">{{ lab.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">{{ snippet.status }}</label>
              <select v-model="form.status" class="form-control">
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">{{ snippet.startTime }}</label>
              <input v-model="form.startTime" class="form-control" type="datetime-local" />
            </div>
            <div class="form-group">
              <label class="form-label">{{ snippet.endTime }}</label>
              <input v-model="form.endTime" class="form-control" type="datetime-local" />
            </div>
          </form>
        </template>
        <template v-slot:actions>
          <button @click="closeAddPopup" class="button button-secondary">{{ snippet.cancel }}</button>
          <button @click="submitAddExam" class="button button-primary">{{ snippet.save }}</button>
        </template>
      </PopupComponent>

      <PopupComponent :isVisible="showDeletePopup" :title="snippet.deleteExam" fasIcon="fa-trash">
        <template v-slot:actions>
          <button @click="cancelDelete" class="button button-secondary">{{ snippet.cancel }}</button>
          <button @click="confirmDelete" class="button button-primary">{{ snippet.delete }}</button>
        </template>
      </PopupComponent>

      <div class="table-container-bottom">
        <EasyDataTable
            :server-items-length="totalCount"
            :headers="headers"
            :items="exams"
            v-model:server-options="serverOptions"
            @update:server-options="loadFromServer"
        >
          <template #item-actions="item">
            <span class="action" @click="editExam(item)">
              <i class="fa-solid fa-pen"></i>
            </span>
            <span class="action" @click="prepareDelete(item)">
              <i class="fa-solid fa-trash"></i>
            </span>
          </template>
        </EasyDataTable>
      </div>
    </div>
  </div>
</template>
<script>
import script from './script.js';

export default {
  ...script,
};
</script>


