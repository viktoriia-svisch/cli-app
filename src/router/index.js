import Vue from "vue";
import Router from "vue-router";
import Shop from "@/components/Shop";
import ShopMerch from "@/components/ShopMerch";
import Index from "@/components/Index";
import Events from "@/components/Events";
import Resident from "@/components/Resident";
import Residents from "@/components/Residents";
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
        title: "z⸱est radio - Shop",
      },
    },
    {
      path: "/shop/:type/:merch",
      component: ShopMerch,
      meta: {
        title: "z⸱est radio - Shop",
      },
    },
    {
      path: "/podcasts",
      component: Podcasts,
      meta: {
        title: "z⸱est radio - Podcasts",
      },
    },
    {
      path: "/calendar",
      component: CalendarPage,
      meta: {
        title: "z⸱est radio - Calendrier",
      },
    },
    {
      path: "/search/:query",
      component: Search,
      meta: {
        title: "z⸱est radio - Recherche",
      },
    },
    {
      path: "/propose_show",
      component: SubmitShow,
      meta: {
        title: "z⸱est radio - Proposer un show",
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
        title: "z⸱est radio - About",
      },
    },
    {
      path: "/residents",
      component: Residents,
      meta: {
        title: "z⸱est radio - Résident.e.s"
      },
    },
    {
      path: "/residents/:resident_name",
      component: Resident,
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
const DEFAULT_TITLE = "z⸱est radio";
router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});
export default router;
