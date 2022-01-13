<template>
  <article id="spod">
    <section id="podcasts">
      <Podcast
        v-for="pod in podcasts"
        v-bind:key="pod.id"
        :pod="pod"
        v-on:play_mix="play_mix"
      />
    </section>
    <section id="more" v-if="more">
      <h1 id="more" @click="getPodcasts">en charger plus</h1>
    </section>
  </article>
</template>
<script>
import axios from "axios";
import Podcast from "@/components/Podcast_Widget";
export default {
  name: "Podcasts",
  components: {
    Podcast
  },
  data() {
    return {
      podcasts: [],
      next: "",
      offset: 0,
      more: true
    };
  },
  methods: {
    play_mix(id) {
      this.$emit("play_mix", id);
    },
    async getPodcasts() {
            if (!this.more) return;
      await axios
        .get(this.next)
        .then(res => {
          if (res.data.next_href === null) this.more = false;
          this.podcasts = this.podcasts.concat(res.data.collection);
          this.offset = res.data.next_href.substring(
            res.data.next_href.indexOf("?offset") + 8
          );
          this.offset = this.offset.split("&")[0];
          this.next = `${process.env.VUE_APP_API}/sounds/${this.offset}`;
        })
        .catch();
    }
  },
  async mounted() {
    this.next = `${process.env.VUE_APP_API}/sounds/${this.offset}`;
    await this.getPodcasts();
  }
};
</script>
<style lang="less" scoped>
#spod {
  h1 {
    font-family: Bison;
    font-size: 40px;
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
      font-weight: normal;
      cursor: pointer;
      &:hover {
        border: 3px solid white;
        color: white;
      }
    }
  }
}
</style>
