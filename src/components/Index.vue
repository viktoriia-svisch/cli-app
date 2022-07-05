<template>
  <main>
    <span class="subtitle">Les derniers podcasts</span>
    <PodcastList :pods="podcasts" />
    <section class="flex">
      <input
        class="input"
        placeholder="Recherche"
        type="text"
        v-model="search"
        v-on:keyup.enter="sendQuery"
      />
      <div class="more" @click="$router.push({ path: '/podcasts' })">
        <span class="subtitle">En voir plus</span>
        <img src="../assets/imgs/play_white.svg" width="30" />
      </div>
    </section>
    <section id="events_sec" v-if="events.length">
      <span class="subtitle">Nos prochains évènements</span>
      <div class="events">
        <a
          class="event"
          v-for="event in events"
          v-bind:key="event.id"
          :href="event.facebook"
        >
          <img :src="event.image" />
        </a>
      </div>
    </section>
  </main>
</template>
<script>
import axios from "axios";
import graph from "@/graphaxios";
import PodcastList from "./PodcastList.vue";
export default {
  name: "Index",
  components: {
    PodcastList,
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
      await axios
        .get(this.next)
        .then((res) => {
          if (res.data.next_href === null) this.more = false;
          this.podcasts = this.podcasts.concat(res.data.collection);
        })
        .catch();
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
    this.next = `${
      this.$config.VUE_APP_API
    }/sounds/0?t=${new Date().getTime()}`;
    await this.getPodcasts();
    await this.getEvents();
  },
};
</script>
<style lang="less" scoped>
main {
  width: 830px;
  .input {
    max-width: 500px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    font-family: KionaBold;
    border-radius: 0px;
    border: 0px;
    color: white;
    background-color: #ffffff40;
    background-image: url("../assets/imgs/play_white.svg");
    background-repeat: no-repeat;
    background-size: 30px 30px;
    background-position: right 10px top 6px;
  }
  #events_sec {
    .events {
      width: 830px;
      margin-top: 10px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
      grid-auto-rows: minmax(auto, auto);
      .event {
        img {
          width: 100%;
        }
      }
    }
  }
  .more {
    max-width: 475px;
    background-color: #00000040;
    position: relative;
    height: 34px;
    padding: 5px 5px 0px 20px;
    margin-top: 5px;
    cursor: pointer;
    &:hover {
      background-color: #00000080;
    }
    span {
      margin-right: 40px;
    }
    img {
      width: 30px;
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
  @media (max-width: 1200px) {
    width: initial;
    #events_sec {
      .events {
        width: 500px;
      }
    }
  }
  @media (max-width: 1000px) {
    .flex {
      flex-direction: column;
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
