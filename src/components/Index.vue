<template>
  <section id="index">
    <iframe
      id="youtubelive"
      v-if="$parent.youtube"
      :src="$parent.embed"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
    <section id="podcasts">
      <Podcast v-for="pod in podcasts" v-bind:key="pod.key" :pod="pod" />
    </section>
    <section id="more" v-if="more">
      <router-link :to="{ path: '/podcasts' }" tag="h1" id="more"
        >Voir plus de podcasts</router-link
      >
    </section>
    <Calendar v-if="$parent.print_shows" />
    <h1 class="subtitle" v-if="events.length">Les prochains evenements</h1>
    <article id="events">
      <Event v-for="e in events" v-bind:key="e.id" :e="e" />
    </article>
    <article id="odc">
      <img src="../assets/imgs/logo.gif" />
      <h1>DC Live</h1>
    </article>
  </section>
</template>
<script>
import axios from "axios";
import graph from "@/graphaxios";
import Podcast from "@/components/Podcast_Widget";
import Event from "@/components/Event_Widget";
import Calendar from "@/components/Calendar";
export default {
  name: "Index",
  components: {
    Podcast,
    Event,
    Calendar
  },
  data() {
    return {
      events: [],
      podcasts: [],
      next: "",
      more: true
    };
  },
  methods: {
    getPodcasts() {
      axios
        .get(this.next)
        .then(res => {
          if (res.data.paging.next === undefined) this.more = false;
          this.podcasts = this.podcasts.concat(res.data.data);
          this.next = res.data.paging.next;
        })
        .catch();
    },
    getEvent(id) {
      this.$router.push({ path: `/events/${id}` });
    },
    async getEvents() {
      const res = await graph(
        "Events",
        `query Events { 
          Events {
            id
            name
            starts_at
            ends_at
            description
            genres
            image
            facebook
            __typename
          }
        }`,
        {}
      );
      this.events = res.Events;
    }
  },
  mounted() {
    this.next = "https:    this.getPodcasts();
    this.getEvents();
  }
};
</script>
<style lang="less" scoped>
#index {
  #shows {
    width: 1100px;
    margin: 30px auto;
    .show {
      border-left: 1px solid #7e7e7e;
      padding-left: 10px;
      margin-bottom: 30px;
      p {
        font-family: SpaceMono;
        font-size: 14px;
      }
      .genre {
        background-color: #a71313;
        font-weight: bold;
        margin-right: 10px;
        padding: 4px;
        border-radius: 2px;
        font-size: 12px;
      }
      .once {
        background-color: #161671;
        padding: 3px;
        border-radius: 3px;
      }
    }
  }
  #odc {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: flex;
    justify-content: center;
    h1 {
      font-family: Kiona;
      font-weight: 300;
      text-align: center;
      font-size: 60px;
      margin: 0;
    }
    img {
      height: 63px;
      padding-top: 8px;
      margin-right: -9px;
    }
  }
  .subtitle {
    font-family: Bison;
    font-size: 40px;
    max-width: 1100px;
    margin: 25px auto;
  }
  #more {
    margin-top: 14px;
    text-align: center;
    h1 {
      border: 3px solid #ffffff80;
      color: #ffffff80;
      display: inline;
      margin: 0 auto;
      padding: 3px;
      font-family: Bison;
      font-size: 35px;
      font-weight: normal;
      cursor: pointer;
      &:hover {
        border: 3px solid white;
        color: white;
      }
    }
  }
  #events {
    display: flex;
    flex-flow: wrap;
    justify-content: center;
  }
}
</style>
