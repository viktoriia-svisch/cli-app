<template>
  <section id="podcast">
    <img :src="podImg" class="podimg" @click="play_podcast" />
    <span id="title">
      <span class="genre side" v-for="genre in pod.genres" v-bind:key="genre"
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
      console.log(this.pod.genre);
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
  background-color: #ffffff40;
  #title {
    width: 192px;
    bottom: 4px;
    padding: 5px 4px 5px 4px;
    color: white;
    display: initial;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .genre {
      font-size: 15px;
      margin-right: 10px;
      background-color: #00000020;
      padding: 2px 4px 2px 4px;
      cursor: pointer;
      a {
        color: white;
        text-decoration: none;
      }
      &:hover {
        background-color: #00000080;
      }
    }
    .side {
      font-family: Kiona;
      letter-spacing: -1px;
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
