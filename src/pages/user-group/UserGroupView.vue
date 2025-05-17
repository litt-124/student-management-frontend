<template>
  <div class="user-group-page">
    <div class="table-container">
      <div class="table-container-top">
        <div class="title">{{ groupSnippet.userGroups }}</div>
        <div class="search-container">
          <form class="form" @submit.prevent="searchGroups">
            <div class="form-group">
              <label class="form-label body4">{{ groupSnippet.search }}</label>
              <input class="form-control" type="text" v-model="searchText" placeholder="" />
            </div>
          </form>
          <button @click="toggleAddPopup" class="button button-primary button-with-icon">
            <i class="fa-solid fa-users"></i>
            {{ groupSnippet.addGroup }}
          </button>
        </div>
      </div>

      <PopupComponent :isVisible="showPopup" :title="popupTitle" fasIcon="fa-users">
        <template v-slot:content>
          <form class="form">
            <div class="form-group">
              <label class="form-label">{{ groupSnippet.name }}</label>
              <input class="form-control" :class="{ 'has-error': !nameIsValid }" v-model="groupName" />
            </div>
            <div class="form-group">
              <label class="form-label">{{ groupSnippet.description }}</label>
              <input class="form-control" v-model="groupDescription" />
            </div>
            <div class="form-group">
              <label class="form-label">{{ groupSnippet.user }}</label>
              <select class="form-control" v-model="selectedUserId" required>
                <option :value="null">{{ groupSnippet.noUser }}</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ user.firstName }} {{ user.lastName }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">{{ groupSnippet.assignedUsers }}</label>
              <Multiselect
                  v-model="selectedMembers"
                  :options="users"
                  :multiple="true"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :preserve-search="true"
                  placeholder="Select users..."
                  label="fullName"
                  track-by="id"
              >
                <template #option="{ option }">
                  <span>{{ option.firstName }} {{ option.lastName }}</span>
                </template>
                <template #tag="{ option, remove }">
      <span class="custom-tag">
        {{ option.firstName }} {{ option.lastName }}
        <span class="remove" @click="remove(option)">✕</span>
      </span>
                </template>
              </Multiselect>
            </div>

          </form>
        </template>
        <template v-slot:actions>
          <button @click="closePopup" class="button button-secondary">{{ groupSnippet.cancel }}</button>
          <button @click="saveGroup" class="button button-primary">{{ groupSnippet.save }}</button>
        </template>
      </PopupComponent>

      <PopupComponent :isVisible="showDeletePopup" :title="groupSnippet.deleteGroup" fasIcon="fa-trash">
        <template v-slot:actions>
          <button @click="cancelDelete" class="button button-secondary">{{ groupSnippet.cancel }}</button>
          <button @click="confirmDelete" class="button button-primary">{{ groupSnippet.delete }}</button>
        </template>
      </PopupComponent>

      <div class="table-container-bottom">
        <EasyDataTable
            :server-items-length="serverItemsLength"
            :headers="headers"
            :items="groups"
            v-model:server-options="serverOptions"
            @update:server-options="loadFromServer"
        >
          <template #item-actions="item">
            <span class="action" @click="editGroup(item)">
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


