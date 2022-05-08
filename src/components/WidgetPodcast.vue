<template>
  <section id="podcast">
    <img :src="podImg" class="podimg" @click="play_podcast" />
    <span id="title">
      <span
        class="genre"
        v-for="genre in pod.genres.slice(0, 2)"
        v-bind:key="genre"
        ><router-link :to="{ path: '/search/' + genre }">{{
          genre
        }}</router-link></span
      >
    </span>
  </section>
</template>
<script>
export default {
  name: "WidgetPodcast",
  props: {
    pod: null
  },
  data() {
    return {
      podImg: ""
    };
  },
  methods: {
    play_podcast() {
      alert(this.pod.title);
    }
  },
  beforeMount() {
    this.pod.genres = this.pod.tag_list.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g);
    if (this.pod.genres != null) {
      this.pod.genres = this.pod.genres.map(g => {
        if (g[0] == '"') return g.substring(1, g.length - 1);
        return g;
      });
    }
    if (!this.pod.artwork_url) {
      this.podImg = this.pod.avatar_url;
    } else {
      this.podImg = this.pod.artwork_url;
    }
    this.podImg = this.podImg.replace("-large", "-t500x500");
  }
};
</script>
<style lang="less" scoped>
#podcast {
  position: relative;
  display: grid;
  background-color: #2b2b2b3b;
  #title {
    bottom: 4px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .genre {
      font-size: 15px;
      padding: 5px 8px 5px 8px;
      cursor: pointer;
      font-family: KionaBold;
      letter-spacing: -1px;
      text-align: center;
      a {
        color: white;
        text-decoration: none;
      }
      &:hover {
        background-color: #00000080;
      }
    }
  }
  .podimg {
    width: 200px;
    cursor: pointer;
    opacity: 1;
    &:hover {
      transition: all 0.2s;
      opacity: 0.5;
    }
  }
}
</style>
