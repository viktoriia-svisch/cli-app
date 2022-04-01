import Vue from 'vue';
import Router from "vue-router";
import Index from "@/components/Index";
import Podcasts from "@/components/Podcasts";
import Search from "@/components/Search";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/podcasts",
      component: Podcasts
    },
    {
      path: "/search/:query",
      component: Search
    },
    {
      path: "/",
      component: Index
    },
    {
      path: "/*",
      redirect: "/"
    }
  ]
});
