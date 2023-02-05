<template>
  <main>
    <span class="subtitle">Les derniers podcasts</span>
    <PodcastList :pods="podcasts" class="desktop_pods" />
    <PodcastListMobile :pods="podcasts" class="mobile_pods" />
    <TimeTable class="timetable" />
    <section class="flex">
      <input
        class="input"
        placeholder="Recherche"
        type="text"
        v-model="search"
        v-on:keyup.enter="sendQuery"
      />
      <div class="more" @click="$router.push({ path: '/podcasts' })">
        <span class="voirplus">En voir plus</span>
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
import PodcastList from "./PodcastList.vue";
import PodcastListMobile from "./mobile/PodcastList.vue";
import TimeTable from "./TimeTable";
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
  .timetable {
    display: none;
  }
  .mobile_pods {
    display: none;
  }
  .input {
    max-width: 500px;
    padding: 10px 17px 6px 17px;
    margin: 8px 0;
    box-sizing: border-box;
    font-family: NexaBold;
    border-radius: 0px;
    border: 0px;
    color: white;
    background-color: #ffffff40;
    background-image: url("../assets/imgs/play_white.svg");
    background-repeat: no-repeat;
    background-size: 16px 24px;
    background-position: right 10px top 2px;
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
          height: 240px;
          width: 410px;
          overflow: hidden;
          img {
            height: 100%;
          }
        }
        p {
          margin: 0;
          padding: 8px;
          background-color: #2b2b2b3b;
          color: white;
          text-align: center;
        }
        &:hover {
          p {
            background-color: #00000080;
          }
        }
      }
    }
  }
  .more {
    position: relative;
    max-width: 475px;
    width: 250px;
    background-color: #00000040;
    position: relative;
    height: 24px;
    padding: 8px 5px 0px 20px;
    margin-top: 10px;
    cursor: pointer;
    &:hover {
      background-color: #00000080;
    }
    span {
      position: relative;
      top: -1px;
      margin-right: 40px;
    }
    img {
      width: 17px;
      position: absolute;
      top: 5px;
      right: 10px;
    }
  }
  @media (max-width: 1200px) {
    width: initial;
    #events_sec {
      .events {
        width: initial;
        display: flex;
        flex-direction: column;
        .event {
          div {
            width: 100%;
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
    .flex {
      flex-direction: column;
    }
  }
  @media (max-width: 815px) {
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
