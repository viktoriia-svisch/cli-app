import Vue from "vue";
import Router from "vue-router";
import Shop from "@/components/Shop";
import ShopMerch from "@/components/ShopMerch";
import Index from "@/components/Index";
import Events from "@/components/Events";
import Podcasts from "@/components/Podcasts";
import Search from "@/components/Search";
import CalendarPage from "@/components/CalendarPage";
import SubmitShow from "@/components/SubmitShow";
import About from "@/components/About";
Vue.use(Router);
const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/shop",
      component: Shop,
      meta: {
        title: "ODC Live - Shop",
      },
    },
    {
      path: "/shop/:type/:merch",
      component: ShopMerch,
      meta: {
        title: "ODC Live - Shop",
      },
    },
    {
      path: "/podcasts",
      component: Podcasts,
      meta: {
        title: "ODC Live - Podcasts",
      },
    },
    {
      path: "/calendar",
      component: CalendarPage,
      meta: {
        title: "ODC Live - Calendrier",
      },
    },
    {
      path: "/search/:query",
      component: Search,
      meta: {
        title: "ODC Live - Recherche",
      },
    },
    {
      path: "/propose_show",
      component: SubmitShow,
      meta: {
        title: "ODC Live - Proposer un show",
      },
    },
    {
      path: "/events",
      component: Events,
      meta: {
        title: "ODC Events",
      },
    },
    {
      path: "/about",
      component: About,
      meta: {
        title: "ODC Live - About",
      },
    },
    {
      path: "/p/:mix_id",
      component: Index,
    },
    {
      path: "/",
      component: Index,
    },
    {
      path: "/*",
      redirect: "/",
    },
  ],
});
const DEFAULT_TITLE = "ODC Live";
router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});
export default router;
