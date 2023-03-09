<template>
  <section id="playlist" v-if="src">
    <iframe
      width="100%"
      height="320"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      :src="src"
    ></iframe>
  </section>
</template>
<script>
export default {
  name: "WidgetPlaylist",
  props: {
    src: String,
  },
  data() {
    return {};
  },
  methods: {
    play_playlist() {
      this.$parent.$parent.$emit("podcast", "");
      setTimeout(() => {
        this.pod.autoplay = true;
        this.$parent.$parent.$emit("podcast", this.pod);
      }, 300);
    },
  },
};
</script>
<style lang="less" scoped>
#playlist {
  iframe {
  }
}
</style>
