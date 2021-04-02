<template>
  <nav>
    <section id="top">
      <router-link :to="{path: '/'}"
        ><img id="logo" :width="$parent.mixh" src="../assets/imgs/odc.jpg"
      /></router-link>
      <article id="radio" @click="play">
        <span class="play">{{ icon }}</span>
        <span class="title">{{ currentShow }}</span>
      </article>
      <audio ref="audioElm" :src="src"></audio>
      <article id="links">
        <router-link :to="{path: '/'}">Accueil</router-link>
        <router-link :to="{path: '/events'}">Evenements</router-link>
        <router-link :to="{path: '/podcasts'}">Podcasts</router-link>
        <router-link :to="{path: '/search'}">Recherche</router-link>
      </article>
      <article id="more" class="right">
        <svg
          @click="$parent.chatting = !$parent.chatting"
          class="chaticon unselect"
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
    <section id="bottom">
      <span
        ><span class="reddot" v-if="livestream">• </span>{{ artist }}
        <span v-if="!livestream">-</span> {{ title }}</span
      >
    </section>
    <section id="mix" v-if="mix.length">
      <article v-html="mix"></article>
      <img
        v-if="mix.length"
        id="closemix"
        src="../assets/imgs/cross_icon.png"
        @click="rm_mix"
      />
    </section>
  </nav>
</template>
<script>
import axios from 'axios';
export default {
  name: 'NavBar',
  props: ['mix'],
  data() {
    return {
      isPlaying: false,
      radio: new Audio(),
      title: '',
      artist: '',
      src: 'https:      currentShow: 'Radio',
      icon: '▶',
      timeout: null,
      livestream: false,
    };
  },
  methods: {
    async getLive() {
      const res = await axios.get('https:      console.log(res);
    },
    rm_mix() {
      this.$parent.mix = '';
      if (window.innerWidth > 800) this.$parent.mixh = 80;
    },
    play() {
      if (!this.isPlaying) {
        this.$refs.audioElm.src = `${this.src}?t=${new Date().getTime()}`;
        this.$refs.audioElm.play();
        this.icon = '■';
        this.isPlaying = true;
      } else {
        this.$refs.audioElm.pause();
        this.isPlaying = false;
        this.icon = '▶';
      }
    },
    checkTitle() {
      axios
        .get('https:        .then(res => {
          if (res.data.current.type == 'livestream') {
            this.livestream = true;
            this.artist = 'Live Radio';
            this.title = '';
            this.timeout = setTimeout(this.checkTitle, 15 * 60000);
          } else {
            this.livestream = false;
            const time = res.data.current.ends.replace(' ', 'T');
            const next = Math.floor(new Date(time).getTime() / 1000);
            const now = Math.floor(new Date().getTime() / 1000);
            this.timeout = setTimeout(this.checkTitle, (next - now - 5) * 1000);
            if (res.data.current.metadata.artist_name !== null)
              this.artist = res.data.current.metadata.artist_name
                .replace('&#039;', "'")
                .replace('amp;', '');
            this.title = res.data.current.metadata.track_title
              .replace('&#039;', "'")
              .replace('amp;', '');
            this.currentShow = res.data.currentShow[0].name;
          }
        })
        .catch(() => {
          clearTimeout(this.timeout);
          this.timeout = null;
        });
    },
  },
  mounted() {
    this.checkTitle();
    this.getLive();
  },
};
</script>
<style lang="less" scoped>
nav {
  width: 100%;
  font-weight: bold;
  position: fixed;
  background-color: black;
  top: 0px;
  z-index: 3;
  .right {
    right: 0;
    margin-right: 5px;
    position: absolute;
  }
  #mix {
    position: fixed;
    top: 61px;
    height: 60px;
    width: ~'calc(100% - 60px)';
    img {
      cursor: pointer;
      background-color: #fcfcfc;
      position: absolute;
      height: 58px;
      top: 0px;
      right: -60px;
      border-top: 1px solid #d7d7d7;
      border-bottom: 1px solid #d7d7d7;
      border-right: 2px solid #d7d7d7;
    }
  }
  #top {
    display: flex;
    padding-top: 10px;
    #more {
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
          background: url('../assets/imgs/sprite.png') 1243px 360px;
          background-size: auto auto;
          background-size: 430px;
          right: 63px;
        }
        ._iglink {
          height: 24px;
          width: 24px;
          background: url('../assets/imgs/sprite.png') 974px 355px;
          background-size: auto auto;
          background-size: 328px;
          right: 28px;
        }
        ._fblink {
          height: 24px;
          width: 24px;
          background: url('../assets/imgs/sprite.png') 903px 338px;
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
      position: absolute;
      top: 10px;
      left: 10px;
    }
  }
  #bottom {
    background-color: white;
    color: black;
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
  @media (max-width: 800px) {
    #mix {
      position: relative;
      top: 0px;
      img {
      }
    }
    #bottom {
      padding-left: 10px;
    }
    #top {
      #links {
        flex-direction: column;
        width: ~'calc(100% - 143px)';
      }
      #radio {
        margin-left: 10px;
        margin-top: 90px;
        width: 95px;
      }
      #more {
        .chaticon {
          position: relative;
          left: 0;
        }
        a {
          .network {
            position: relative;
          }
          ._iglink {
            right: 0px;
            margin-bottom: 15px;
          }
          ._fblink {
            right: 0px;
          }
          ._mclink {
            right: 0px;
            margin-bottom: 15px;
            margin-top: 5px;
          }
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
</style>
