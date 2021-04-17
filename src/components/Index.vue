<template>
  <section id="index">
    <iframe
      id="youtubelive"
      v-if="youtube"
      :src="$parent.embed"
      frameborder="0"
      allow="autoplay; encrypted-media"
      allowfullscreen
    ></iframe>
    <h1 class="subtitle">Les derniers podcasts</h1>
    <section id="podcasts">
      <Podcast v-for="pod in podcasts" v-bind:key="pod.key" :pod="pod" />
    </section>
    <section id="more" v-if="more">
      <router-link :to="{ path: '/podcasts' }" tag="h1" id="more"
        >Voir plus de podcasts</router-link
      >
    </section>
    <Calendar />
    <h1 class="subtitle" v-if="events.length">Les prochains evenements</h1>
    <article id="events">
      <section
        class="event"
        v-for="e in events"
        v-bind:key="e.id"
        @click="getEvent(e.id)"
      >
        <header>
          <h1>{{ e.name }}</h1>
          <ul>
            <li>
              <p>
                {{ new Date(Number(e.starts_at)).toLocaleDateString("fr", {}) }}
                {{
                  new Date(Number(e.starts_at)).toLocaleTimeString("fr", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                }}
                &rarr;
                {{
                  new Date(Number(e.ends_at)).toLocaleTimeString("fr", {
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                }}
              </p>
            </li>
            <li v-if="e.facebook.length">
              <a :href="e.facebook" target="_blank">facebook</a>
            </li>
            <li v-if="e.genres.length" class="right">
              <span v-for="g in e.genres" v-bind:key="g">{{ g }}</span>
            </li>
          </ul>
        </header>
        <article class="e_body">
          <div class="e_img" :style="`background-image: url(${e.image})`"></div>
        </article>
      </section>
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
import Calendar from "@/components/Calendar";
export default {
  name: "Index",
  components: {
    Podcast,
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
  #podcasts {
    display: flex;
    flex-flow: wrap;
    width: 100%;
    justify-content: center;
  }
  #events {
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    .event {
      width: 100%;
      max-width: 400px;
      margin: 10px;
      border: 1px solid #ffffff80;
      cursor: pointer;
      &:hover {
        border: 1px solid white;
        header {
          background-color: white;
          border-bottom: 1px solid white;
          h1 {
            color: white;
            background-color: black;
          }
          ul {
            li {
              a,
              p,
              span {
                background-color: black;
                color: white;
              }
            }
          }
        }
      }
      header {
        padding: 5px;
        border: 1px solid #ffffff80;
        h1 {
          font-size: 34px;
          color: black;
          background-color: white;
          font-family: Bison;
          margin: 0;
          padding-left: 5px;
          padding-right: 5px;
          display: inline;
        }
        ul {
          list-style-type: none;
          font-family: SpaceMonoBold;
          padding-left: 0px;
          display: flex;
          flex-direction: column;
          margin-top: 9px;
          margin-bottom: 0px;
          .right {
            text-align: right;
            display: inline;
            margin-top: 4px;
          }
          li {
            display: table;
            margin-bottom: 3px;
            a,
            span,
            p {
              background-color: white;
              color: black;
              margin: 0;
              padding-left: 5px;
              padding-right: 5px;
            }
            span {
              margin-left: 5px;
            }
          }
        }
      }
      .e_body {
        .e_img {
          height: 451px;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center center;
        }
      }
    }
  }
}
</style>
