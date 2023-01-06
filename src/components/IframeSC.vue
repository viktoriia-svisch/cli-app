<template>
  <section id="mix_frame" v-if="iframe_mix">
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
          class="more_mix"
          src="../assets/imgs/more_icon.png"
          @click="showMore = !showMore"
          v-if="!showMore"
        />
        <img
          class="more_mix"
          src="../assets/imgs/less_icon.png"
          @click="showMore = !showMore"
          v-else
        />
        <img
          class="close_mix"
          src="../assets/imgs/cross_icon.png"
          @click="close_mix"
        />
      </div>
    </div>
    <section
      id="more_info_shadow"
      :style="`display: ${showMore ? 'initial' : 'none'}`"
      @click="showMore = !showMore"
    ></section>
    <section
      class="more_info"
      :style="`bottom: ${showMore ? '68px' : '-220px'}`"
    >
      <div>
        <img :src="iframe_mix.podImg" />
        <span
          >{{ iframe_mix.title }}<br /><br /><i
            >{{ Math.round(iframe_mix.duration / 60000) }} min</i
          ><br /><br />{{ iframe_mix.description.slice(0, 150) }}...</span
        >
      </div>
      <iframe
        ref="sc_iframe"
        height="0"
        scrolling="no"
        frameborder="no"
        allow="autoplay"
        :src="
          `https:        "
      ></iframe>
    </section>
  </section>
</template>
<script>
export default {
  name: "IframeSC",
  props: ["iframe_mix"],
  watch: {
    iframe_mix: function(newMix) {
      this.isPlaying = false;
      this.showMore = true;
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
      showMore: true,
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
  .more_info {
    background-color: white;
    position: fixed;
    top: 280px;
    left: -180px;
    transform: rotate(-90deg);
    transition: 0.5s;
    iframe {
      width: 400px;
      height: 20px;
    }
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
      display: flex;
      .close_mix {
        cursor: pointer;
        width: 25px;
        height: 25px;
        padding: 5px 5px 5px 5px;
        margin-top: 10px;
        &:hover {
          background-color: #e8e8e8;
        }
      }
      .more_mix {
        cursor: pointer;
        width: 25px;
        height: 25px;
        padding: 5px 5px 5px 5px;
      }
    }
  }
  @media (max-width: 815px) {
    border: 6px solid #db2916;
    height: 57px;
    width: ~"calc(100% - 90px)";
    #mix_frame_inner {
      .playBtn {
        margin-top: 7px;
      }
      .title_mix {
        margin-top: 12px;
      }
      div {
        .close_mix {
          margin-top: 10px;
        }
        .more_mix {
          margin-top: 10px;
        }
      }
    }
    #more_info_shadow {
      z-index: 2;
      width: ~"calc(100% - 0px)";
      height: ~"calc(100% - 140px)";
      position: fixed;
      left: 0;
      top: 69px;
      background-color: #00000040;
    }
    .more_info {
      transform: initial;
      top: initial;
      left: 0;
      width: 100vw;
      z-index: 2;
      div {
        padding-top: 7px;
        padding-bottom: 7px;
        img {
          width: ~"calc(50% - 15px)";
          margin-left: 7px;
        }
        span {
          width: ~"calc(50% - 15px)";
          position: absolute;
          right: 7px;
          font-size: 12px;
        }
      }
      iframe {
        width: inherit;
        height: 20px;
        margin-left: -20px;
        width: ~"calc(100% + 120px)";
      }
    }
  }
}
</style>
