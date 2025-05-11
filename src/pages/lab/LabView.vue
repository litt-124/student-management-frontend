<template>
  <div class="lab-page">
    <div class="table-container">
      <div class="table-container-top">
        <div class="title">{{ labSnippet.labs }}</div>
        <div class="search-container">
          <form class="form" @submit.prevent="searchLab">
            <div class="form-group">
              <label class="form-label body4">{{ labSnippet.search }}</label>
              <input
                  class="form-control"
                  type="text"
                  v-model="searchText"
                  placeholder=""
              />
            </div>
          </form>
          <button @click="toggleAddLabPopup" class="add-user button button-primary button-with-icon">
            <i class="fa-solid fa-flask"></i>
            {{ labSnippet.addLab }}
          </button>
        </div>
      </div>

      <!-- Add Lab Popup -->
      <PopupComponent :isVisible="showAddPopup" :title="labSnippet.addLab" fasIcon="fa-flask">
        <template v-slot:content>
          <form class="form">
            <div class="form-group">
              <label class="form-label" for="labName">{{ labSnippet.name }}</label>
              <input
                  id="labName"
                  class="form-control"
                  :class="{ 'has-error': !nameIsValid }"
                  type="text"
                  v-model="labName"
                  placeholder=""
              />
            </div>
          </form>
        </template>
        <template v-slot:actions>
          <button @click="toggleAddLabPopup" class="button button-secondary">{{ labSnippet.cancel }}</button>
          <button @click="addLab" class="button button-primary">{{ labSnippet.save }}</button>
        </template>
      </PopupComponent>

      <!-- Delete Lab Popup -->
      <PopupComponent :isVisible="showDeletePopup" :title="labSnippet.deleteLab" fasIcon="fa-trash">
        <template v-slot:actions>
          <button @click="deleteReject" class="button button-secondary">{{ labSnippet.cancel }}</button>
          <button @click="deleteConfirm" class="button button-primary">{{ labSnippet.delete }}</button>
        </template>
      </PopupComponent>

      <!-- Table -->
      <div class="table-container-bottom">
        <EasyDataTable
            :server-items-length="serverItemsLength"
            :headers="headers"
            :items="labs"
            v-model:server-options="serverOptions"
            @update:server-options="loadFromServer"
        >
          <template #item-actions="item">
            <span @click="deleteItem(item)" class="action">
              <i class="fa-solid fa-trash"></i>
            </span>
            <span @click="editItem(item)" class="action">
              <i class="fa-solid fa-edit"></i>
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


