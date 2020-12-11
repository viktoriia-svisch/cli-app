<template>
  <main id="app">
    <NavBar/>
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
}
</style>
