import Vue from "vue";
import App from "./App.vue";
import router from "./router";
Vue.config.productionTip = false;
fetch(process.env.BASE_URL + "config.json").then(res => {
  res.json().then(config => {
    Vue.prototype.$config = config;
    new Vue({
      render: h => h(App),
      router
    }).$mount("#app");
  });
});
