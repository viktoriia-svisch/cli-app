<template>
  <section id="radio" class="flex" @click="play">
    <audio ref="audioElm" :src="src" preload="none"></audio>
    <img src="../assets/imgs/play.svg" class="playBtn" v-if="!isPlaying" />
    <img src="../assets/imgs/stop.svg" class="playBtn" v-else />
    <span class="reddot">•</span>
    <div class="title">Live   </section>
</template>
<script>
export default {
  name: "Radio",
  data() {
    return {
      isPlaying: false,
      src: "/radio/8000/radio.mp3"
    };
  },
  methods: {
    play() {
      if (!this.isPlaying) {
        this.$refs.audioElm.src = `${this.src}?t=${new Date().getTime()}`;
        this.$refs.audioElm.play();
        this.isPlaying = true;
      } else {
        this.$refs.audioElm.pause();
        this.isPlaying = false;
      }
    }
  },
  mounted() {
    this.src = `${this.$config.VUE_APP_RADIO}${this.src}`;
  }
};
</script>
<style lang="less" scoped>
#radio {
  margin-top: 14px;
  cursor: pointer;
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .title {
  }
  .playBtn {
    height: 40px;
  }
  .reddot {
    margin-left: 10px;
    margin-right: 20px;
    color: red;
    font-size: 34px;
    animation: live 2.5s linear infinite;
  }
  @keyframes live {
    50% {
      opacity: 0;
    }
  }
}
</style>
