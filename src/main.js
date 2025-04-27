import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { EventBus } from './eventBus.js';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
const app = createApp(App)

app.use(router)
app.use(mdiVue, {icons: mdijs})
app.component('EasyDataTable', Vue3EasyDataTable);
app.provide('eventBus', EventBus);
app.mount('#app')


