<template>
  <nav>
    <section id="top">
      <router-link :to="{ path: '/' }">
        <img id="logo" :src="$parent.logo" />
        <img id="logo_mb" src="../assets/imgs/logo.gif" />
      </router-link>
      <article
        class="pcplayer"
        ref="player"
        id="radio"
        :class="loading ? 'blocked' : ''"
        @click="play"
      >
        <img
          class="play_remote"
          src="../assets/imgs/stop.svg"
          v-if="$parent.isPlaying"
        />
        <img class="play_remote" src="../assets/imgs/play.svg" v-else />
        <span class="title">{{ $parent.currentShow }}</span>
      </article>
      <audio ref="audioElm" :src="src" preload="none"></audio>
      <article id="links">
        <router-link :to="{ path: '/podcasts' }">Podcasts</router-link>
        <router-link :to="{ path: '/search' }">Recherche</router-link>
        <router-link v-if="$parent.print_shows" :to="{ path: '/calendar' }"
          >Calendrier</router-link
        >
        <a href="https:      </article>
      <article id="more" class="right">
        <svg
          @click="$parent.chatting = !$parent.chatting"
          class="chaticon unselect"
          :class="$parent.newmsg ? 'shaking' : ''"
          xmlns="http:          xmlns:xlink="http:          viewBox="0 0 16 16"
          version="1.1"
        >
          <g id="surface1">
            <path
              style=" "
              d="M 2.5 2 C 1.675781 2 1 2.675781 1 3.5 L 1 8.5 C 1 9.324219 1.675781 10 2.5
    10 L 3.992188 10 L 3.992188 12 L 6.664063 10 L 9.5 10 C 10.324219 10 11 9.324219 11 8.5 L
    11 3.5 C 11 2.675781 10.324219 2 9.5 2 Z M 2.5 3 L 9.5 3 C 9.78125 3 10 3.21875 10 3.5 L
    10 8.5 C 10 8.78125 9.78125 9 9.5 9 L 6.328125 9 L 4.992188 10 L 4.992188 9 L 2.5 9 C 2.21875
    9 2 8.78125 2 8.5 L 2 3.5 C 2 3.21875 2.21875 3 2.5 3 Z M 12 5 L 12 8.5 C 12 9.878906
    10.878906 11 9.5 11 L 8.1875 11 L 8.183594 11.003906 C 7.683594 11.003906 7.246094
    11.003906 6.988281 11.003906 L 5.242188 12.3125 C 5.511719 12.726563 5.972656 13 6.5 13 L
    9.335938 13 L 12.003906 15 L 12.003906 13 L 13.5 13 C 14.328125 13 15 12.328125 15 11.5
    L 15 6.5 C 15 5.671875 14.328125 5 13.5 5 Z "
            ></path>
          </g>
        </svg>
        <a href="https:          <div class="network _mclink"></div>
        </a>
        <a href="https:          <div class="network _iglink"></div>
        </a>
        <a href="https:          <div class="network _fblink"></div>
        </a>
      </article>
    </section>
    <section class="bottom bplayer">
      <article
        ref="player"
        id="radio"
        :class="loading ? 'blocked' : ''"
        @click="play"
      >
        <img
          class="play_remote"
          src="../assets/imgs/stop.svg"
          v-if="$parent.isPlaying"
        />
        <img class="play_remote" src="../assets/imgs/play.svg" v-else />
        <span class="title">{{ $parent.currentShow }}</span>
      </article>
    </section>
    <section class="bottom bplaying">
      <span
        ><span class="reddot" v-if="livestream">• </span>
        <span v-if="livestream">Live         }}<span v-if="!livestream"> - </span>{{ $parent.title }}</span
      >
    </section>
  </nav>
</template>
<script>
import axios from "axios";
export default {
  name: "NavBar",
  data() {
    return {
      radio: new Audio(),
      radio: "",
      src: "/radio/8000/radio.mp3",
      loading: false,
      livestream: false
    };
  },
  methods: {
    play() {
      if (this.loading) return;
      if (!this.$parent.isPlaying) {
        this.$refs.audioElm.src = `${this.src}?t=${new Date().getTime()}`;
        this.$refs.audioElm.play();
        this.$parent.isPlaying = true;
      } else {
        this.$refs.audioElm.pause();
        this.$parent.isPlaying = false;
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
                this.$parent.artist = t_shows[i].dj;
                this.$parent.title = `                 show = true;
              }
            }
            this.livestream = true;
            if (!show) this.$parent.title = "Tune In";
                        this.$parent.timeout = setTimeout(this.checkTitle, 60000);
          } else {
            this.livestream = false;
            const now_playing = odc_station.now_playing;
            this.$parent.timeout = setTimeout(
              this.checkTitle,
              (now_playing.remaining + 3) * 1000
            );
            this.$parent.artist = now_playing.song.artist;
            this.$parent.title = now_playing.song.title;
          }
        })
        .catch(() => {
          clearTimeout(this.$parent.timeout);
          this.$parent.timeout = null;
        });
    }
  },
  mounted() {
    this.radio = process.env.VUE_APP_RADIO;
    this.src = `${this.radio}${this.src}`;
    this.checkTitle();
  }
};
</script>
<style lang="less" scoped>
nav {
  width: 100%;
  font-weight: bold;
  position: sticky;
  background-color: black;
  top: 0px;
  z-index: 5;
  .play_remote {
    position: absolute;
    top: 13px;
    left: 98px;
    height: 15px;
  }
  .right {
    right: 0;
    margin-right: 5px;
    position: absolute;
  }
  #top {
    display: flex;
    padding-top: 10px;
    #more {
      .shaking {
        animation: shake 0.5s infinite;
      }
      .chaticon {
        position: absolute;
        fill: white;
        height: 25px;
        width: 25px;
        left: -123px;
        cursor: pointer;
      }
      a {
        .network {
          position: absolute;
          top: 0;
        }
        ._mclink {
          height: 24px;
          width: 24px;
          background: url("../assets/imgs/sprite.png") 1243px 360px;
          background-size: auto auto;
          background-size: 430px;
          right: 63px;
        }
        ._iglink {
          height: 24px;
          width: 24px;
          background: url("../assets/imgs/sprite.png") 974px 355px;
          background-size: auto auto;
          background-size: 328px;
          right: 28px;
        }
        ._fblink {
          height: 24px;
          width: 24px;
          background: url("../assets/imgs/sprite.png") 903px 338px;
          background-size: auto auto;
          background-size: 313px;
          right: 0;
        }
      }
    }
    #links {
      display: flex;
      flex-direction: row;
      margin-top: -6px;
      a {
        margin-left: 10px;
        margin-bottom: 5px;
        color: #fffc;
        text-decoration: none;
        border: 1px solid #fffc;
        padding: 5px;
        cursor: pointer;
        &:hover {
          color: white;
          border: 1px solid white;
        }
      }
      .eventless {
        display: none;
        color: black;
        margin-left: 10px;
        padding-top: 5px;
        padding-bottom: 8px;
      }
    }
    #radio {
      margin-left: 100px;
      cursor: pointer;
      .play {
        position: absolute;
      }
      .title {
        margin-left: 20px;
      }
    }
    #logo {
      width: 80px;
      position: absolute;
      top: 10px;
      left: 10px;
    }
    #logo_mb {
      width: 30px;
      display: none;
      margin-top: -5px;
      margin-left: 8px;
    }
  }
  .bplayer {
    border-top: 1px solid white;
    margin-top: 3px;
    padding-top: 5px;
    padding-bottom: 5px;
    display: none;
    height: 25px;
    position: relative;
    #radio {
      cursor: pointer;
      margin-right: 100px;
      .title {
        position: absolute;
        left: 30px;
      }
    }
  }
  .bplaying {
    background-color: white;
    color: black;
  }
  .bottom {
    padding-left: 100px;
    .reddot {
      color: red;
      animation: live 2.5s linear infinite;
    }
    @keyframes live {
      50% {
        opacity: 0;
      }
    }
  }
  @media (max-width: 900px) {
    .pcplayer {
      display: none;
    }
    .play_remote {
      top: 8px;
      left: 10px;
    }
    .bplayer {
      display: block;
    }
    .bottom {
      padding-left: 10px;
    }
    #top {
      #links {
        flex-flow: wrap;
        .eventless {
          display: initial;
        }
      }
      #logo {
        display: none;
      }
      #logo_mb {
        display: initial;
      }
      #radio {
        margin-left: 10px;
        margin-top: 90px;
        width: 95px;
      }
      #more {
        position: relative;
        .chaticon {
          position: relative;
          margin-left: 8px;
          left: 0;
        }
        a {
          display: none;
        }
      }
    }
  }
  @media (max-width: 300px) {
    #top {
      #links {
        a {
          font-size: 12px;
          padding: 7.5px;
        }
      }
    }
  }
}
@keyframes shake {
  0% {
    transform: translate(2px, 0px);
  }
  10% {
    transform: translate(-2px, 0px);
  }
  20% {
    transform: translate(0px, 0px);
  }
  30% {
    transform: translate(0px, 0px);
  }
  40% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(0px, 0px);
  }
  60% {
    transform: translate(0px, 0px);
  }
  70% {
    transform: translate(0px, 0px);
  }
  80% {
    transform: translate(0px, 0px);
  }
  90% {
    transform: translate(0px, 0px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
</style>
