import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import VueChatScroll from 'vue-chat-scroll';
import VueSocket from 'vue-socket.io';
import App from './App.vue';
import {routes} from './router';
import en from './locales/en.ts';
import fr from './locales/fr.ts';
Vue.config.productionTip = false;
const router = new VueRouter({
  routes,
  mode: 'history',
});
Vue.use(VueRouter);
Vue.use(Vuetify, {
  lang: {
    locales: {
      en,
      fr,
    },
  },
});
Vue.use(VueChatScroll);
Vue.use(
  new VueSocket({
    connection: process.env.VUE_APP_CHAT,
  }),
);
new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
