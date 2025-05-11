<template>
  <div class="user-details">
    <button type="submit" @click="save" class="button button-primary save-button"><i
        class="fas fa-upload"></i>{{ userSnippet.save }}
    </button>
    <div class="left-side">
      <div class="menu-link" :class="{ 'active': showMain }" @click="showComponent('Main')">{{ userSnippet.main }}</div>

    </div>
    <div class="right-side">
      <user-edit v-if="showMain"
                 :user="userDataToShow"
                 @updated-user-data="storeUpdatedUserData"
      ></user-edit>
    </div>
    <router-link to="/users" class="back-button">
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
@import '@/styles/components/user/user-details.scss';
</style>

