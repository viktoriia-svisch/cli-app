<template>
  <section id="radio" class="flex" @click="play">
    <audio ref="audioElm" :src="src" preload="none"></audio>
    <img src="../assets/imgs/play.svg" class="playBtn" v-if="!isPlaying" />
    <img src="../assets/imgs/stop.png" class="playBtn" v-else />
    <span class="reddot">•</span>
    <div class="title">
      <span class="live_info" v-if="titleVisible">
        <span v-if="livestream">Live         <span class="invis">{{ artist }}</span>
        <span class="dash" v-if="!livestream"> - </span>
        <span class="show_title invis">{{ title }}</span>
        <span style="margin-left: 15px"></span>
        <span v-if="livestream">Live         <span>{{ artist }}</span>
        <span class="dash" v-if="!livestream"> - </span>
        <span class="show_title">{{ title }}</span>
        <span style="margin-left: 15px"></span>
        <span v-if="livestream">Live         <span class="invis">{{ artist }}</span>
        <span class="dash invis" v-if="!livestream"> - </span>
        <span class="show_title invis">{{ title }}</span>
      </span>
    </div>
  </section>
</template>
<script>
import axios from "axios";
export default {
  name: "Radio",
  props: ["today_shows", "iframe_update"],
  watch: {
    today_shows: function(newVal, oldVal) {
            newVal;
      oldVal;
      if (!this.updated) {
        this.updated = true;
        this.src = this.$config.VUE_APP_RADIO.listen_ep;
        this.now = this.$config.VUE_APP_RADIO.now_ep;
        this.checkTitle();
      }
    },
    iframe_update: function(newVal) {
      if (newVal != "" && this.isPlaying == true) {
        this.play();
      }
      this.canPlay = newVal != "" ? false : true;
      this.titleVisible = newVal != "" ? false : true;
    },
  },
  data() {
    return {
      canPlay: true,
      updated: false,
      isPlaying: false,
      livestream: false,
      title: "",
      artist: "",
      src: "",
      now: "",
      titleVisible: true,
    };
  },
  methods: {
    play() {
      if (!this.isPlaying && this.canPlay) {
        this.$refs.audioElm.src = `${this.src}?t=${new Date().getTime()}`;
        this.$refs.audioElm.play();
        this.isPlaying = true;
      } else {
        this.$refs.audioElm.pause();
        this.isPlaying = false;
      }
    },
    checkTitle() {
      axios
        .get(`${this.now}?t=${new Date().getTime()}`)
        .then((res) => {
          let odc_station = res.data[0];
          if (
            odc_station.live.is_live ||
            odc_station.now_playing.elapsed == null ||
            odc_station.now_playing.song.title == "Stream Offline"
          ) {
            const t_shows = this.today_shows;
            let show = false;
            for (let i = 0; i < t_shows.length; i++) {
              let start = new Date(Number(t_shows[i].starts_at));
              let end = new Date(Number(t_shows[i].ends_at));
              let now = new Date();
              let beg = 60 * start.getUTCHours() + start.getMinutes();
              let stop = 60 * end.getUTCHours() + end.getMinutes();
              let rn = 60 * now.getHours() + now.getMinutes();
              if (beg <= rn && rn <= stop) {
                this.artist = t_shows[i].dj;
                this.title = `                 show = true;
              }
            }
            this.livestream = true;
            if (!show) this.title = "Tune In";
                        this.timeout = setTimeout(this.checkTitle, 60000);
          } else {
            this.livestream = false;
            const now_playing = odc_station.now_playing;
            this.timeout = setTimeout(
              this.checkTitle,
              (now_playing.remaining + 3) * 1000
            );
            this.artist = now_playing.song.artist;
            this.title = now_playing.song.title;
          }
        })
        .catch(() => {
          clearTimeout(this.timeout);
          this.timeout = null;
        });
    },
  },
};
</script>
<style lang="less" scoped>
#radio {
  margin-top: 17px;
  cursor: pointer;
  width: 282px;
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .title {
    margin-top: -14px;
    line-height: 75px;
    text-align: center;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    box-sizing: border-box;
    .live_info {
      display: inline-block;
      vertical-align: middle;
      line-height: normal;
      --end-percent: ~"calc(-33% - 9px)";
      animation: marquee 10s linear infinite;
    }
    &:hover {
      .live_info {
        animation-play-state: paused;
      }
    }
    @keyframes marquee {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(var(--end-percent), 0);
      }
    }
  }
  .playBtn {
    height: 40px;
  }
  .reddot {
    margin-top: 7px;
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
  @media (max-width: 1200px) {
    .title {
      width: 150px;
    }
  }
  @media (max-width: 815px) {
    width: calc(100% - 125px);
    margin-left: 20px;
    .title {
      margin-top: -15px;
      width: calc(100% - 90px);
    }
    .reddot {
      margin-top: 5px;
    }
  }
}
</style>
