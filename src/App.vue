<template>
  <main id="app">
    <NavBar ref="navbar" />
    <router-view class="router" v-on:play_mix="play_mix" />
    <Chat v-if="chatting" />
    <Footer />
    <section id="mix_frame" v-if="iframe_mix">
      <iframe
        width="100%"
        height="20"
        scrolling="no"
        frameborder="no"
        allow="autoplay"
        :src="
          `https:        "
      >
      </iframe>
      <img
        @click="close_mix"
        src="./assets/imgs/cancel.svg"
        height="20"
        alt="Close the mix"
      />
    </section>
  </main>
</template>
<script>
import graph from "@/graphaxios";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
export default {
  name: "app",
  components: {
    NavBar,
    Footer,
    Chat
  },
  data() {
    return {
      chatting: false,
      youtube: false,
      window: window.innerWidth,
      logo: require("./assets/imgs/odc.jpg"),
      embed: "",
      msgs: [],
      newmsg: false,
      isPlaying: false,
      timeout: null,
      currentShow: "Radio",
      title: "",
      artist: "",
      ding: new Audio(require("@/assets/sounds/light.mp3")),
      print_shows: false,
      print_events: false,
      iframe_mix: ""
    };
  },
  methods: {
    play_mix(id) {
      this.iframe_mix = id;
    },
    close_mix() {
      this.iframe_mix = "";
    },
    async getStream() {
      const res = await graph(
        null,
        `{
          Stream {
            link
            embed
            __typename
          }
        }`,
        {}
      );
      if (res.Stream.embed.length) {
        this.embed = res.Stream.embed;
        this.youtube = true;
      }
    },
    async getPrints() {
      const res = await graph(
        null,
        `{
          PrintShows
          PrintEvents
      }`
      );
      this.print_shows = res.PrintShows;
      this.print_events = res.PrintEvents;
    }
  },
  sockets: {
    listen(msgs) {
      this.msgs = msgs;
    },
    msg(message) {
      this.msgs.push(message);
      if (
        message.pseudo != localStorage.getItem("username") &&
        !this.chatting
      ) {
        this.ding.play();
        this.newmsg = true;
        setTimeout(() => {
          this.newmsg = false;
        }, 5000);
      }
    }
  },
  mounted() {
    this.ding.volume = 0.3;
    this.getStream();
    this.getPrints();
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.window = window.innerWidth;
      });
    });
  }
};
</script>
<style lang="less">
@import "./assets/fonts/fonts.css";
body {
  margin: 0;
  background-color: black;
  #mix_frame {
    iframe {
      padding: 10px;
      margin-bottom: -4px;
      background-color: #f2f2f2;
      width: ~"calc(100% - 56px)";
      position: fixed;
      bottom: 0px;
      z-index: 5;
    }
    img {
      cursor: pointer;
      height: 36px;
      background-color: #f2f2f2;
      position: fixed;
      bottom: 0px;
      right: 0;
      z-index: 5;
    }
  }
  #app {
    font-family: Kiona;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: white;
  }
  #podcasts {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(auto, auto);
    margin: 40px auto;
  }
  .blocked {
    opacity: 0.5;
    position: relative;
  }
  .blocked:after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    background: transparent;
  }
  #youtubelive {
    height: ~"calc(100vh - 77px)";
    margin-top: -38px;
    margin-left: -27px;
    width: ~"calc(100vw - 5px)";
  }
  .router {
    margin: 0px 30px 0px 30px;
  }
  @media (max-width: 700px) {
    #podcasts {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 400px) {
    #youtubelive {
      margin-left: 0;
    }
    .router {
      margin: 0px 4px 0 4px;
    }
    #podcasts {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
