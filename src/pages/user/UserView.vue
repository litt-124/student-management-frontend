<template>
  <div class="user-page">
    <div class="table-container">
      <div class="table-container-top">
        <div class="title">{{ userSnippet.users }}</div>
        <div class="search-container">
          <form class="form" @submit.prevent="searchUser">
            <div class="form-group">
                          <label class="form-label body4">{{ userSnippet.search }}</label>

              <input
                  class="form-control"
                  type="text"
                  v-model="searchText"
                  placeholder=""/>
            </div>
          </form>
          <button @click="toggleAddUserPopup" class="add-user button button-primary button-with-icon">
            <svg>
              <use xlink:href="#icon-user"></use>
            </svg>
            {{ userSnippet.addUser }}
          </button>

        </div>
      </div>
      <PopupComponent :isVisible="showAddPopup" :title='userSnippet.addUser' icon="#icon-user">
        <template v-slot:content>
          <form class="form" >
            <div class="form-group">
                          <label class="form-label " for="firstName"> {{ userSnippet.firstName }}</label>
              <input
                  id="firstName"
                  class="form-control "
                  :class="{ 'has-error': !firstNameIsValid }"
                  type="text"
                  v-model="firstName"
                  placeholder=""/>
            </div>
            <div class="form-group">
                          <label class="form-label body4" for="lastName"> {{ userSnippet.lastName }}</label>

              <input
                  id="lastName"
                  class="form-control body4"
                  :class="{ 'has-error': !lastNameIsValid}"
                  type="text"
                  v-model="lastName"
                  placeholder=""/>
            </div>
            <div class="form-group">
                            <label class="form-label body4" for="email"> {{ userSnippet.type }}</label>

              <custom-select
                  :options="options"
                  :selectedTypeIsValid="selectedTypeIsValid"
                  @selected="handleSelectedOption"
              />
            </div>
            <div class="form-group">
                <label class="form-label body4" for="email"> {{ userSnippet.email }}</label>

                <input
                    id="email"
                    autocomplete="new-email"
                    name="new-email"
                    class="form-control body4"
                    :class="{ 'has-error': !emailIsValid}"
                    type="email"
                    v-model="email"
                    placeholder=""/>
            </div>
            <div class="form-group">
                          <label class="form-label body4" for="userName"> {{ userSnippet.username }}</label>
              <input
                  id="userName"
                  class="form-control body4"
                  :class="{ 'has-error': !userNameIsValid}"
                  type="text"
                  v-model="userName"
                  placeholder=""/>
            </div>
            <div class="form-group  password-form-group">
                              <label class="form-label body4" for="password">{{ userSnippet.password }}</label>

                <input id="password"
                       autocomplete="new-password"
                       name="new-password"
                       class="form-control body4"
                       :class="{ 'has-error': !passwordIsValid }"
                       :type="isPasswordVisible ? 'text' : 'password'"
                       v-model="password"
                       placeholder=""/>

                <div class="show-password-icon" @click="showPassword">

                  <svg v-if="!isPasswordVisible" width="21.553" height="14.023"
                       viewBox="0 0 21.553 14.023">
                    <use xlink:href="#icon-hidden-password"></use>
                  </svg>
                  <svg v-else width="21.131" height="14.026"
                       viewBox="0 0 21.131 14.026">
                    <use xlink:href="#icon-shown-password"></use>

                  </svg>
                </div>
            </div>

          </form>
        </template>
        <template v-slot:actions>
          <button @click="toggleAddUserPopup" class=" button button-secondary">{{ userSnippet.cancel }}</button>
          <button @click="addUser" class=" button button-primary">{{ userSnippet.save }}</button>
        </template>
      </PopupComponent>
      <PopupComponent :isVisible="showDeletePopup" :title='userSnippet.deleteUser'icon="#icon-user">
        <template v-slot:actions>
          <button @click="deleteReject" class=" button button-secondary">{{ userSnippet.cancel }}</button>
          <button @click="deleteConfirm" class=" button button-primary">{{ userSnippet.delete }}</button>
        </template>
      </PopupComponent>
      <div class="table-container-bottom">

        <EasyDataTable
            :server-items-length="serverItemsLength"
            :headers="headers"
            :items="users"
            v-model:server-options="serverOptions"
            @update:server-options="loadFromServer"
        >
          <template #item-actions="item">
           <span @click="editItem(item)" class="action">
              <mdicon name="pencil-outline"/>
           </span>
            <span @click="deleteItem(item)" class="action">
              <mdicon name="trash-can-outline"/>
            </span>
          </template>
        </EasyDataTable>
      </div>
    </div>
  </div>
</template>


<style lang="scss">
@import '@/styles/components/user/user.scss';
</style>

<script>
import script from './script.js';

export default {
  ...script,
};
</script>


