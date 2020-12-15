import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import App from './App.vue';
import {routes} from './router';
import { createProvider } from './vue-apollo'
Vue.config.productionTip = false;
const router = new VueRouter({
  routes,
  mode: 'history',
});
Vue.use(VueRouter);
Vue.use(Vuetify);
new Vue({
  render: h => h(App),
  apolloProvider: createProvider(),
  router
}).$mount('#app');
