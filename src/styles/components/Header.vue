<template>
  <div class="user-page-top">
    <div class="logo-box">
router link
    </div>
    <div v-if="!$route.path.includes('login')" class="dropdown-menu f_dropdown-menu" @click="toggleMenu">
      <svg class="icon-box">
        <use xlink:href="#icon-menu"></use>
      </svg>
      <div class="dropdown-content" v-if="isMenuOpen">

        <router-link to="/dashboard" class="menu-link">{{ headerSnippet.dashboard }}</router-link>
        <router-link v-if="isUserAdmin" to="/users" class="menu-link">{{ headerSnippet.users }}</router-link>
        <router-link v-if="isUserAdmin" to="/categories" class="menu-link">{{ headerSnippet.categories }}</router-link>
        <router-link v-if="isDashboard && isNarrowScreen" :to="{ path: '/projects', query: { status: 'done' } }"
                     class="menu-link">{{ headerSnippet.doneProjects }}
        </router-link>
        <router-link v-if="isDashboard && isNarrowScreen" :to="{ path: '/projects', query: { status: 'lost' } }"
                     class="menu-link">{{ headerSnippet.lostProjects }}
        </router-link>

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
