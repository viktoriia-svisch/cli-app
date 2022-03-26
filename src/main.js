import Vue from "vue";
import VueChatScroll from "vue-chat-scroll";
import App from "./App.vue";
import router from "./router";
Vue.config.productionTip = false;
fetch(process.env.BASE_URL + "config.json").then(res => {
  res.json().then(config => {
    Vue.prototype.$config = config;
    Vue.use(VueChatScroll);
    new Vue({
      render: h => h(App),
      router
    }).$mount("#app");
  });
});
