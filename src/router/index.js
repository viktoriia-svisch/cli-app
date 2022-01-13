import Vue from "vue";
import Router from "vue-router";
import Index from "@/components/Index";
import Events from "@/components/Events";
import Search from "@/components/Search";
import Calendar from "@/components/Calendar";
import Mentions from "@/components/Mentions";
import SubmitShow from "@/components/SubmitShow";
import Podcast from "@/components/Podcast";
import Podcasts from "@/components/Podcasts";
Vue.use(Router);
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/search",
      component: Search,
      props: true
    },
    {
      path: "/mentions",
      component: Mentions
    },
    {
      path: "/calendar",
      component: Calendar
    },
    {
      path: "/propose_show",
      component: SubmitShow
    },
    {
      path: "/podcasts",
      component: Podcasts
    },
    {
      path: "/podcasts/:id",
      component: Podcast,
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
