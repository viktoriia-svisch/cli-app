import Vue from "vue";
import VueRouter from "vue-router";
import VueChatScroll from "vue-chat-scroll";
import VueSocket from "vue-socket.io";
import { createProvider } from "./vue-apollo";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import router from "./router";
import en from "./locales/en.ts";
import fr from "./locales/fr.ts";
const messages = {
  en: en,
  fr: fr
};
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: "fr",
  messages
});
Vue.config.productionTip = false;
Vue.use(VueChatScroll);
Vue.use(
  new VueSocket({
    connection: process.env.VUE_APP_CHAT
  })
);
new Vue({
  i18n,
  render: h => h(App),
  apolloProvider: createProvider(),
  router
}).$mount("#app");
