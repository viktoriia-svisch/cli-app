<template>
  <main id="app">
    <NavBar />
    <router-view
      class="router"
      :style="
        `margin-top: ${
          mix.length ? (window > 800 ? 150 : 240) : window > 800 ? 100 : 200
        }px`
      "
    />
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
      embed: "",
      msgs: [],
      mix: "",
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
    }
  },
  mounted() {
    this.getStream();
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.window = window.innerWidth;
        if (this.window > 800 && this.mix.length) {
          this.mixh = 45;
        } else if (this.window <= 800 && this.mix.length) {
          this.mixh = 80;
        }
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
    margin: 150px 30px 0px 30px;
  }
  @media (max-width: 800px) {
    .router {
      margin: 240px 30px 0 30px;
    }
  }
  @media (max-width: 400px) {
    #youtubelive {
      margin-left: 0;
    }
    .router {
      margin: 240px 4px 0 4px;
    }
  }
}
</style>
