<template>
  <section id="podcast" @click="play_podcast">
    <img :src="podImg" class="podimg" />
    <span id="title">{{ pod.tag_list }}</span>
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
  #title {
    width: 192px;
    bottom: 4px;
    padding: 2px 4px 2px 4px;
    color: white;
    display: initial;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .podimg {
    width: 200px;
    cursor: pointer;
    opacity: 0.5;
    &:hover {
      transition: all 0.2s;
      opacity: 1;
    }
  }
}
</style>
