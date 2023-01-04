<template>
  <section id="mix_frame" v-if="iframe_mix">
    <iframe
      ref="sc_iframe"
      height="0"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      :src="
        `https:      "
    ></iframe>
    <div id="mix_frame_inner">
      <img
        src="../assets/imgs/play.svg"
        class="playBtn"
        v-if="!isPlaying"
        @click="toggleSound"
      />
      <img
        src="../assets/imgs/stop.png"
        class="playBtn"
        v-else
        @click="toggleSound"
      />
      <span @click="toggleSound" class="title_mix">{{ iframe_mix.title }}</span>
      <div>
        <img
          class="close_mix"
          src="../assets/imgs/cross_icon.png"
          @click="close_mix"
        />
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "IframeSC",
  props: ["iframe_mix"],
  watch: {
    iframe_mix: function(newMix) {
      this.isPlaying = false;
            if (newMix != "") {
        setTimeout(() => {
                    SC.Widget(this.$refs.sc_iframe).bind(
            SC.Widget.Events.READY,             () => {
              if (this.iframe_mix.autoplay) {
                this.toggleSound();
              }
                            SC.Widget(this.$refs.sc_iframe).unbind(SC.Widget.Events.READY);
            }
          );
        }, 1000);
      }
    },
  },
  data() {
    return {
      isPlaying: false,
    };
  },
  methods: {
    close_mix() {
            SC.Widget(this.$refs.sc_iframe).unbind(SC.Widget.Events.READY);
      this.isPlaying = false;
      this.$parent.$parent.iframe_mix = "";
    },
    toggleSound() {
      if (this.iframe_mix) {
        SC.Widget(this.$refs.sc_iframe).toggle();         this.isPlaying = !this.isPlaying;
      } else {
        this.$parent.$refs.radio.play();
      }
    },
  },
  mounted() {
    window.addEventListener("focus", () => {
            SC.Widget(this.$refs.sc_iframe).isPaused((paused) => {
        this.isPlaying = !paused;
      });
    });
    window.addEventListener("keydown", (event) => {
            if (event.keyCode == 32 && event.target == document.body) {
        event.preventDefault();
        this.toggleSound();
      }
    });
  },
};
</script>
<style lang="less" scoped>
#mix_frame {
  border: 10px solid #db2916;
  position: relative;
  z-index: 5;
  width: 262px;
  height: 59px;
  iframe {
    width: 400px;
    position: fixed;
    top: 280px;
    left: -180px;
    height: 20px;
    transform: rotate(-90deg);
  }
  #mix_frame_inner {
    display: flex;
    .playBtn {
      margin-top: 8px;
      height: 40px;
      cursor: pointer;
    }
    .title_mix {
      font-size: 13px;
      margin-top: 12px;
      height: 30px;
      overflow: hidden;
      cursor: pointer;
    }
    div {
      .close_mix {
        cursor: pointer;
        width: 25px;
        height: 25px;
        padding: 5px 5px 5px 5px;
        z-index: 3;
        margin-top: 10px;
        &:hover {
          background-color: #e8e8e8;
        }
      }
    }
  }
}
</style>
