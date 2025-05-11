<template>
  <div class="computer-page">
    <div class="table-container">
      <div class="table-container-top">
        <div class="title">{{ computerSnippet.computers }}</div>
        <div class="search-container">
          <form class="form" @submit.prevent="searchComputer">
            <div class="form-group">
              <label class="form-label body4">{{ computerSnippet.search }}</label>
              <input class="form-control" type="text" v-model="searchText" placeholder="" />
            </div>
          </form>
          <button @click="toggleAddComputerPopup" class="button button-primary button-with-icon">
            <i class="fa-solid fa-desktop"></i>
            {{ computerSnippet.addComputer }}
          </button>
        </div>
      </div>

      <PopupComponent :isVisible="showPopup" :title="popupTitle" fasIcon="fa-desktop">
        <template v-slot:content>
          <form class="form">
            <div class="form-group">
              <label class="form-label" for="name">{{ computerSnippet.name }}</label>
              <input id="name" class="form-control" :class="{ 'has-error': !nameIsValid }" type="text" v-model="computerName" />
            </div>
            <div class="form-group">
              <label class="form-label" for="ip">{{ computerSnippet.ipAddress }}</label>
              <input id="ip" class="form-control" :class="{ 'has-error': !ipIsValid }" type="text" v-model="computerIp" />
            </div>
            <div class="form-group">
              <label class="form-label">{{ computerSnippet.lab }}</label>
              <select class="form-control" v-model="selectedLabId">
                <option :value="null">{{ computerSnippet.noLab }}</option>
                <option v-for="lab in labs" :key="lab.id" :value="lab.id">{{ lab.name }}</option>
              </select>
            </div>
          </form>
        </template>
        <template v-slot:actions>
          <button @click="closePopup" class="button button-secondary">{{ computerSnippet.cancel }}</button>
          <button @click="saveComputer" class="button button-primary">{{ computerSnippet.save }}</button>
        </template>
      </PopupComponent>

      <PopupComponent :isVisible="showDeletePopup" :title="computerSnippet.deleteComputer" fasIcon="fa-trash">
        <template v-slot:actions>
          <button @click="cancelDelete" class="button button-secondary">{{ computerSnippet.cancel }}</button>
          <button @click="confirmDelete" class="button button-primary">{{ computerSnippet.delete }}</button>
        </template>
      </PopupComponent>

      <div class="table-container-bottom">
        <EasyDataTable
            :server-items-length="serverItemsLength"
            :headers="headers"
            :items="computers"
            v-model:server-options="serverOptions"
            @update:server-options="loadFromServer"
        >
          <template #item-actions="item">
            <span class="action" @click="editComputer(item)">
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


