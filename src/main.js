import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import App from './App.vue';
import {routes} from './router';
Vue.config.productionTip = false;
const router = new VueRouter({
  routes,
  mode: 'history',
});
Vue.use(VueRouter);
Vue.use(Vuetify);
new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
