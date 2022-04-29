import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import Events from "@/components/Events";
import Podcasts from "@/components/Podcasts";
import Search from "@/components/Search";
import CalendarPage from "@/components/CalendarPage";
Vue.use(Router);
const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/podcasts",
      component: Podcasts,
      meta: {
        title: "ODC Live - Podcasts"
      }
    },
    {
      path: "/calendar",
      component: CalendarPage,
      meta: {
        title: "ODC Live - Calendrier"
      }
    },
    {
      path: "/search/:query",
      component: Search,
      meta: {
        title: "ODC Live - Recherche"
      }
    },
    {
      path: "/events",
      component: Events
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
const DEFAULT_TITLE = "ODC Live";
router.afterEach(to => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});
export default router;
