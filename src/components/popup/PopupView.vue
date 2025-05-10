<template>
  <div v-if="isVisible" class="overlay">
    <div :class="['popup-container', ...classList]">
      <div class="popup-header">
        <div class="icon-container" :class="{isCategory: icon?.includes('category')}">
          <svg v-if="icon">
            <use :xlink:href="icon"></use>
          </svg>
          <i v-if="fasIcon" class="fas" :class="fasIcon"></i>
        </div>
        <span class="title">{{ title }}</span>
        <span v-if="shareLink" class="share-icon" @click="copyShareLink">
          <svg>
            <use xlink:href="#icon-share"></use>
          </svg>
        </span>
      </div>
      <div class="popup-body f_popup-body">
        <slot name="content"></slot>
      </div>
      <div class="popup-actions">
        <slot name="actions">
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles/components/popup/popup.scss';
</style>

<script>
import script from './script.js';

export default {
  ...script,
};
</script>


