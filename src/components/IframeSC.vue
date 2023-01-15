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
    <section class="more_info" :style="`opacity: ${showMore ? '1' : '0'}`">
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
        if (this.$refs.sc_iframe) {
          SC.Widget(this.$refs.sc_iframe).toggle();                     SC.Widget(this.$refs.sc_iframe).isPaused((paused) => {
            this.isPlaying = !paused;
          });
        }
      } else {
        if (this.$parent.$refs.radio) {
          this.$parent.$refs.radio.play();
        } else if (this.$parent.$parent.$refs.radio) {
          this.$parent.$parent.$refs.radio.play();
        }
      }
    },
  },
  mounted() {
    window.addEventListener("focus", () => {
      if (this.$refs.sc_iframe) {
                SC.Widget(this.$refs.sc_iframe).isPaused((paused) => {
          this.isPlaying = !paused;
        });
      }
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
  width: 262px;
  height: 59px;
  .more_info {
    background-color: white;
    position: fixed;
    left: 0px;
    transition: 0.5s;
    width: 100%;
    top: 79px;
    iframe {
      width: ~"calc(100% + 125px)";
      margin-left: -21px;
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
        margin-top: 11px;
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
        width: ~"calc(100% - 110px)";
      }
      div {
        position: absolute;
        right: 0;
        .close_mix {
          margin-top: 10px;
        }
        .more_mix {
          margin-top: 10px;
        }
      }
    }
    #more_info_shadow {
      z-index: 1;
      width: ~"calc(100% - 0px)";
      height: ~"calc(100% - 138px)";
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
      z-index: 1;
      padding-top: 8px;
      bottom: 69px;
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
