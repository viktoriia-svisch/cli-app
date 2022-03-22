<template>
  <section id="podcast" @click="play_podcast">
    <img :src="pod.artwork_url.replace('-large', '-t500x500')" class="podimg" />
    <span id="title">{{ pod.title }}</span>
  </section>
</template>
<script>
export default {
  name: "WidgetPodcast",
  props: {
    pod: null
  },
  methods: {
    play_podcast() {
      alert(this.pod.title);
    }
  }
};
</script>
<style lang="less" scoped>
#podcast {
  position: relative;
  #title {
    width: 192px;
    position: absolute;
    bottom: 4px;
    padding: 2px 4px 2px 4px;
    left: 0px;
    color: white;
    display: initial;
    background-color: #7fbaf9;
  }
  .podimg {
    width: 200px;
    cursor: pointer;
    opacity: 0.5;
  }
}
#podcast:hover {
  .podimg {
    transition: all 0.2s;
    opacity: 1;
  }
  #title {
    transition: all 0.2s;
    display: none;
    background: none;
  }
}
</style>
