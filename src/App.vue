<template>
  <main id="app">
    <NavBar />
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
    };
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
  .router {
    margin: 100px 30px 0px 30px;
  }
}
</style>
