<template>
  <main>
    <span class="subtitle">Recherche: {{ query }}</span>
    <PodcastList :pods="podcasts" />
    <section class="flex">
      <input
        class="input"
        placeholder="Recherche"
        type="text"
        v-model="query"
        v-on:keyup.enter="sendQuery"
      />
      <div class="more" @click="searchPodcasts" v-if="more">
        <span class="subtitle">En chercher plus</span>
        <img src="../assets/imgs/play_white.svg" width="30" />
      </div>
    </section>
  </main>
</template>
<script>
import axios from "axios";
import PodcastList from "./PodcastList.vue";
export default {
  name: "Index",
  components: {
    PodcastList
  },
  data() {
    return {
      query: "",
      podcasts: [],
      searching: false,
      url: "",
      more: true,
      offset: 0
    };
  },
  methods: {
    sendQuery() {
      this.$router.push({ path: `/search/${this.query}` });
    },
    async searchPodcasts() {
            if (this.searching) return;
      this.searching = true;
            if (!this.more) return;
      const params = {
        search: this.query,
        offset: this.offset
      };
      await axios
        .post(this.url, params)
        .then(res => {
          if (res.data.collection.length == 0) this.more = false;
          res.data.collection.map(pod => {
            if (pod.user && pod.user.permalink == "odc-live") {
              this.podcasts = this.podcasts.concat(pod);
            }
          });
        })
        .catch();
      this.offset += 20;
      this.searching = false;
    }
  },
  async mounted() {
    this.query = this.$route.params.query;
    this.url = `${this.$config.VUE_APP_API}/sounds/search`;
    await this.searchPodcasts();
  }
};
</script>
<style lang="less" scoped>
main {
  width: 100%;
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
  .more {
    max-width: 475px;
    background-color: #00000040;
    position: relative;
    height: 34px;
    padding: 8px 5px 0px 20px;
    margin-top: 8px;
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
  @media (max-width: 1000px) {
    .flex {
      flex-direction: column;
    }
  }
}
</style>
