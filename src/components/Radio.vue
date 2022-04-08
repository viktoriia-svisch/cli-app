<template>
  <section id="radio" class="flex" @click="play">
    <audio ref="audioElm" :src="src" preload="none"></audio>
    <img src="../assets/imgs/play.svg" class="playBtn" v-if="!isPlaying" />
    <img src="../assets/imgs/stop.svg" class="playBtn" v-else />
    <span class="reddot">•</span>
    <div class="title">
      <span class="live_info">
        <span v-if="livestream">Live         }}<span v-if="!livestream"> - </span>{{ title }}</span
      >
    </div>
  </section>
</template>
<script>
import axios from "axios";
export default {
  name: "Radio",
  data() {
    return {
      isPlaying: false,
      livestream: false,
      radio: "",
      title: "",
      artist: "",
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
    },
    checkTitle() {
      axios
        .get(`${this.radio}/api/nowplaying`)
        .then(res => {
          let odc_station = res.data[0];
          if (
            odc_station.live.is_live ||
            odc_station.now_playing.elapsed == null
          ) {
            const t_shows = JSON.parse(localStorage.getItem("today_shows"));
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
    }
  },
  mounted() {
    this.radio = this.$config.VUE_APP_RADIO;
    this.src = `${this.radio}${this.src}`;
    this.checkTitle();
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
    margin-top: -14px;
    line-height: 75px;
    text-align: center;
    .live_info {
      display: inline-block;
      vertical-align: middle;
      line-height: normal;
    }
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
