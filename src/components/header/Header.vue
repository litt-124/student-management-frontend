<template>
  <div class="header-container">
    <div class="logo-box">
    </div>
    <div v-if="!$route.path.includes('login')" class="dropdown-menu f_dropdown-menu" @click="toggleMenu">
      <svg class="icon-box">
        <use xlink:href="#icon-menu"></use>
      </svg>
      <div class="dropdown-content" v-if="isMenuOpen">

        <router-link v-if="isUserAdmin" to="/users" class="menu-link">{{ headerSnippet.users }}</router-link>
        <router-link v-if="isUserAdmin" to="/labs" class="menu-link">{{ headerSnippet.labs }}</router-link>
        <router-link v-if="isUserAdmin" to="/computers" class="menu-link">{{ headerSnippet.computers }}</router-link>
        <router-link v-if="isUserAdmin" to="/user-groups" class="menu-link">{{ headerSnippet.userGroups }}</router-link>
        <router-link v-if="isUserAdmin" to="/exams" class="menu-link">{{ headerSnippet.exams }}</router-link>


        <hr class="menu-divider">
        <button @click="logout" class="logout-button">
          <i class="fas fa-sign-out-alt"></i>
          {{ headerSnippet.logout }}
        </button>
      </div>
    </div>
  </div>
  <div class="loader" v-if="showLoader">
    <div class="spinner">
      <div class="bounce1"></div>
      <div class="bounce2"></div>
      <div class="bounce3"></div>
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
@import '@/styles/components/header/header.scss';
</style>
