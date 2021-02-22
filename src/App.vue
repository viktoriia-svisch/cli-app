<template>
  <main id="app">
    <NavBar />
    <section id="mix">
      <article v-html="mix"></article>
      <img
        v-if="mix.length"
        id="closemix"
        src="./assets/imgs/cross_icon.png"
        @click="rm_mix"
      />
    </section>
    <router-view class="router" />
    <Chat v-if="chatting" />
    <Footer />
  </main>
</template>
<script>
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Chat from '@/components/Chat';
export default {
  name: 'app',
  components: {
    NavBar,
    Footer,
    Chat,
  },
  data() {
    return {
      chatting: false,
      msgs: [],
      mix: '',
      mixh: 80,
    };
  },
  methods: {
    rm_mix() {
      this.mix = '';
      if (window.innerWidth > 800) this.mixh = 80;
    },
  },
  sockets: {
    listen(msgs) {
      this.msgs = msgs;
    },
    msg(message) {
      this.msgs.push(message);
    },
  },
};
</script>
<style lang="less">
@import './assets/fonts/fonts.css';
body {
  margin: 0;
  background-color: black;
  #app {
    font-family: Kiona;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: white;
  }
  #mix {
    position: fixed;
    top: 61px;
    width: ~'calc(100% - 60px)';
    iframe {
      height: 60px;
    }
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
  .router {
    margin: 150px 30px 0px 30px;
  }
  @media (max-width: 800px) {
    #mix {
      position: relative;
      top: 0px;
      img {
      }
    }
    .router {
      margin: 10px 30px 0 30px;
    }
  }
  @media (max-width: 400px) {
    .router {
      margin: 10px 4px 0 4px;
    }
  }
}
</style>
