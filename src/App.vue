<template>
  <main id="app">
    <NavBar />
    <router-view class="router" />
    <Footer />
  </main>
</template>
<script>
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
export default {
  name: 'app',
  components: {
    NavBar,
    Footer,
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
