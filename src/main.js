import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;
fetch(process.env.BASE_URL + "config.json").then(res => {
  res.json().then(config => {
    Vue.prototype.$config = config;
    new Vue({
      render: h => h(App)
    }).$mount("#app");
  });
});
