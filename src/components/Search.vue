<template>
  <main>
    <span class="subtitle">Recherche: {{ query }}</span>
    <Filters />
    <PodcastList :pods="podcasts" />
    <section class="flex">
      <div class="more" @click="searchPodcasts" v-if="more">
        <span class="moretitle">En chercher plus</span>
      </div>
    </section>
  </main>
</template>
<script>
import axios from "axios";
import PodcastList from "./PodcastList.vue";
import Filters from "./Filters.vue";
export default {
  name: "Index",
  components: {
    PodcastList,
    Filters,
  },
  data() {
    return {
      query: "",
      podcasts: [],
      searching: false,
      url: "",
      more: true,
      offset: 0,
    };
  },
  methods: {
    async searchPodcasts() {
            if (this.searching) return;
      this.searching = true;
            if (!this.more) return;
      const params = {
        search: this.query,
        offset: this.offset,
      };
      await axios
        .post(this.url, params)
        .then((res) => {
          if (res.data.collection.length == 0) this.more = false;
          res.data.collection.map((pod) => {
            if (pod.user && pod.user.permalink == "odc-live") {
              this.podcasts = this.podcasts.concat(pod);
            }
          });
        })
        .catch();
      this.offset += 20;
      this.searching = false;
    },
  },
  async mounted() {
    this.query = this.$route.params.query;
    this.url = `${this.$config.VUE_APP_API}/sounds/search`;
    await this.searchPodcasts();
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
    font-family: NexaBold;
    border-radius: 0px;
    border: 0px;
    color: white;
    background-color: #ffffff40;
  }
  .flex {
    justify-content: right;
    .more {
      position: relative;
      width: 250px;
      max-width: 475px;
      background-color: #00000040;
      position: relative;
      height: 24px;
      padding: 5px 5px 0px 20px;
      margin-top: 5px;
      cursor: pointer;
      .moretitle {
        color: white;
      }
      &:hover {
        background-color: #00000080;
      }
      span {
        margin-right: 40px;
      }
      img {
        width: 17px;
        position: absolute;
        top: 5px;
        right: 10px;
      }
    }
  }
  @media (max-width: 1000px) {
    width: initial;
    .flex {
      flex-direction: column;
    }
  }
}
</style>
