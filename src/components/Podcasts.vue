<template>
  <main>
    <span class="subtitle">Tous les podcasts</span>
    <br />
    <Filters />
    <PodcastList :pods="podcasts" />
    <section class="flex">
      <div class="more" @click="getPodcasts">
        <span class="voirplus">En voir plus</span>
        <img src="../assets/imgs/play_white.svg" width="30" />
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
      search: "",
      podcasts: [],
      next: "",
      more: true,
      offset: 0,
    };
  },
  methods: {
    async getPodcasts() {
            if (!this.more) return;
      await axios
        .get(this.next)
        .then((res) => {
          if (res.data.next_href === null) this.more = false;
          this.podcasts = this.podcasts.concat(res.data.collection);
          this.offset = res.data.next_href.substring(
            res.data.next_href.indexOf("?offset") + 8
          );
          this.offset = this.offset.split("&")[0];
          this.next = `${this.$config.VUE_APP_API}/sounds/${this.offset}`;
        })
        .catch();
    },
  },
  async mounted() {
    this.next = `${this.$config.VUE_APP_API}/sounds/${
      this.offset
    }?t=${new Date().getTime()}`;
    await this.getPodcasts();
    await this.getPodcasts();
  },
};
</script>
<style lang="less" scoped>
main {
  width: 830px;
  color: white;
  .more {
    position: relative;
    width: 250px;
    max-width: 475px;
    background-color: #00000040;
    position: relative;
    height: 24px;
    padding: 5px 5px 0px 20px;
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
  @media (max-width: 1000px) {
    width: initial;
    .more {
      width: initial;
    }
  }
  @media (max-width: 1000px) {
    .flex {
      flex-direction: column;
    }
  }
}
</style>
