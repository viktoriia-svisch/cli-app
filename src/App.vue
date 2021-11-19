<template>
  <main id="app">
    <NavBar ref="navbar" />
    <article v-html="mix" style="display: none"></article>
    <router-view class="router" />
    <Chat v-if="chatting" />
    <Footer />
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
      mix: "",
      timeout: null,
      currentShow: "Radio",
      title: "",
      artist: "",
      mcwidget: null,
      ding: new Audio(require("@/assets/sounds/light.mp3")),
      mixh: 80
    };
  },
  methods: {
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
  #app {
    font-family: Kiona;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: white;
  }
  #podcasts {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(auto, auto);
    max-width: 1400px;
    margin: 0 auto;
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
  iframe {
    height: 60px;
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
  @media (max-width: 400px) {
    #youtubelive {
      margin-left: 0;
    }
    .router {
      margin: 0px 4px 0 4px;
    }
  }
}
</style>
