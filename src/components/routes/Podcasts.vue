<template>
  <main>
    <h1 class="title title--mt-0">Tous les podcasts</h1>
    <br />
    <Filters />
    <PodcastList :pods="podcasts" />
    <section class="flex">
      <div class="more" @click="getPodcasts">
        <div class="button">En voir plus</div>
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
      search: "",
      podcasts: [],
      next: "",
      more: true,
      offset: 0,
    };
  },
  methods: {
    async getPodcasts() {
            if (!this.more) {
        return;
      }
      const res = await axios.get(this.next);
      if (res.data.next_href === null) {
        this.more = false;
      }
      this.podcasts = this.podcasts.concat(res.data.collection);
      this.offset = res.data.next_href.substring(
        res.data.next_href.indexOf("?offset") + 8
      );
      this.offset = this.offset.split("&")[0];
      this.next = `${this.$config.VUE_APP_API}/sounds/${this.offset}`;
    },
  },
  async mounted() {
    this.next = `${this.$config.VUE_APP_API}/sounds/${
      this.offset
    }?t=${new Date().getTime()}`;
    await this.getPodcasts();
  },
};
</script>
<style lang="less" scoped>
main {
  height: max-content;
  .flex {
    justify-content: end;
    .more {
      position: relative;
      height: 24px;
      cursor: pointer;
      span {
        position: relative;
        top: 2px;
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
