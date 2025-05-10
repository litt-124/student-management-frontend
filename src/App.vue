<template>
  <v-app>
    <v-main>
      <HeaderView></HeaderView>
      <router-view/>
      <PopupNotification/>
    </v-main>
  </v-app>
</template>

<script>
import HeaderView from "./components/header/Header.vue";
import PopupNotification from "./components/popup-notification/PopupNotification.vue";

export default {
  name: 'App',
  components: {
    HeaderView,
    PopupNotification,
  },
};
</script>
