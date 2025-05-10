<template>
  <div class="notification-box" :class="{ 'slide-in': shown, 'slide-out': !shown}">
    <div class="notification">
      <svg v-if="iconHref" class="icon-box">
        <use :xlink:href="iconHref"></use>
      </svg>

      <div class="content-container">
        <p class="title">{{ title }}</p>
        <div class="description">{{ content }}</div> <!-- Using a div for content -->
      </div>

      <button class="close-button" @click="togglePopup">
        <svg class="icon-box">
          <use xlink:href="#icon-cross"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/components/popup-notification/popup-notification.scss';
</style>

<script>
import script from './script.js';

export default {
  ...script,
};
</script>

