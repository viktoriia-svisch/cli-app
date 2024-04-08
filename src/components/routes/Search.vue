<template>
  <main>
    <span class="subtitle">Recherche: {{ query }}</span>
    <Filters />
    <PodcastList :pods="podcasts" />
    <section class="flex">
      <div class="more button" @click="searchPodcasts" v-if="more">
        En chercher plus
      </div>
    </section>
  </main>
</template>
<script>
import axios from "axios";
import PodcastList from "../common/PodcastList.vue";
import Filters from "../common/Filters.vue";
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
            if (pod.user && pod.user.permalink == "zoneestradio") {
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
  width: 70%;
  height: max-content;
  .input {
    max-width: 500px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 0px;
    border: 0px;
    color: var(--color-text);
    &:hover,
    &:active,
    &:active {
      background-color: var(--color-primary-bg);
    }
    &:focus,
    &:focus-within,
    &focus-visible {
      outline: 1px solid var(--color-text);
    }
  }
  .flex {
    justify-content: right;
    .more {
      position: relative;
      margin-top: 1rem;
    }
  }
  @media (max-width: 815px) {
    width: 100%;
    .flex {
      flex-direction: column;
    }
  }
}
</style>
