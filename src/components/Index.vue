<template>
  <main>
    <h1 class="title">Les derniers podcasts</h1>
    <PodcastList :pods="podcasts" class="desktop_pods" />
    <PodcastListMobile :pods="podcasts" class="mobile_pods" />
    <TimeTable class="timetable" />
    <section class="flex footer">
      <input
        class="input"
        placeholder="Recherche"
        type="text"
        v-model="search"
        v-on:keyup.enter="sendQuery"
      />
      <div class="more" @click="$router.push({ path: '/podcasts' })">
        <div class="button">En voir plus</div>
      </div>
    </section>
    <section id="events_sec" v-if="events.length">
      <span class="subtitle">Les évènements</span>
      <div class="events">
        <a
          class="event"
          v-for="event in events"
          v-bind:key="event.id"
          :href="event.facebook"
          target="_blank"
        >
          <div>
            <img :src="event.image" />
          </div>
          <p>{{ event.name }}</p>
        </a>
      </div>
    </section>
  </main>
</template>
<script>
import axios from "axios";
import graph from "@/graphaxios";
import PodcastList from "./common/PodcastList.vue";
import PodcastListMobile from "./mobile/PodcastList.vue";
import TimeTable from "./common/TimeTable";
export default {
  name: "Index",
  components: {
    PodcastList,
    PodcastListMobile,
    TimeTable,
  },
  data() {
    return {
      search: "",
      podcasts: [],
      events: [],
      next: "",
      more: true,
    };
  },
  methods: {
    sendQuery() {
      this.$router.push({ path: `/search/${this.search}` });
    },
    async getPodcasts() {
            if (!this.more) return;
      const res = await axios.get(this.next);
      if (res.data.next_href === null) {
        this.more = false;
      }
      this.podcasts = this.podcasts.concat(res.data.collection);
    },
    async getEvents() {
      const res = await graph(
        this.$config,
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
      this.events = this.events.concat(res.Events);
    },
  },
  async mounted() {
    this.next = `${this.$config.VUE_APP_API}/sounds/0?t=${new Date().getTime()}`;
    await this.getPodcasts();
    await this.getEvents();
  },
};
</script>
<style lang="less" scoped>
main {
  width: 70%;
  height: max-content;
  .timetable {
    display: none;
  }
  .mobile_pods {
    display: none;
  }
  .input {
    max-width: 500px;
    padding: 10px 17px 6px 17px;
    box-sizing: border-box;
    border: 0px;
    color: var(--color-text);
    border: 1px solid grey;
    &:hover,
    &:active,
    &:focus {
      background-color: var(--color-primary-bg);
    }
    &:focus,
    &:focus-within,
    &focus-visible {
      outline: 1px solid var(--color-text);
    }
  }
  #playlists_sec {
    margin-top: 25px;
  }
  #events_sec {
    margin-top: 20px;
    .events {
      width: 830px;
      margin-top: 10px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
      grid-auto-rows: minmax(auto, auto);
      .event {
        text-decoration: none;
        div {
          width: 410px;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        p {
          margin: 0;
          padding: 8px;
          color: var(--color-text);
          text-align: center;
          border: 1px solid black;
        }
        &:hover {
          p {
            background-color: var(--color-primary);
          }
        }
      }
    }
  }
  .footer {
    padding: 1rem 0;
  }
  .more {
    img {
      width: 17px;
      position: absolute;
      top: 5px;
      right: 10px;
    }
  }
  @media (max-width: 1200px) {
    #events_sec {
      .events {
        width: initial;
        display: flex;
        flex-direction: column;
        .event {
          div {
            width: 100%;
            height: initial;
            margin-bottom: -6px;
            img {
              height: initial;
              width: 100%;
            }
          }
        }
      }
    }
  }
  @media (max-width: 1000px) {
    .more {
      width: initial;
    }
  }
  @media (max-width: 815px) {
    width: 100%;
    .timetable {
      display: initial;
    }
    .desktop_pods {
      display: none;
    }
    .mobile_pods {
      display: flex;
      width: 100%;
      overflow-x: scroll;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch;
      margin: 0 -1rem 1rem -1rem;
      padding: 0 1rem 2px 1rem;
    }
  }
  @media (max-width: 500px) {
    #events_sec {
      .events {
        width: 100%;
        grid-template-columns: repeat(1, 1fr);
      }
    }
  }
}
</style>
