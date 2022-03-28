import Vue from "vue";
import VueChatScroll from "vue-chat-scroll";
import VueSocket from "vue-socket.io";
import App from "./App.vue";
import router from "./router";
Vue.config.productionTip = false;
fetch(process.env.BASE_URL + "config.json").then(res => {
  res.json().then(config => {
    Vue.prototype.$config = config;
    Vue.use(VueChatScroll);
    Vue.use(
      new VueSocket({
        connection: config.VUE_APP_CHAT
      })
    );
    new Vue({
      render: h => h(App),
      router
    }).$mount("#app");
  });
});
