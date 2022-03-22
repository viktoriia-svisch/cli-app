<template>
  <div id="app">
    <NavBar />
    <section class="flex marged">
      <router-view />
      <section>droite</section>
    </section>
  </div>
</template>
<script>
import NavBar from "./components/NavBar.vue";
export default {
  name: "App",
  components: {
    NavBar
  }
};
</script>
<style lang="less">
@font-face {
  font-family: Kiona;
  src: url("./assets/fonts/Kiona.woff");
}
@font-face {
  font-family: KionaBold;
  src: url("./assets/fonts/KionaBold.woff");
}
body {
  margin: 0;
  background-color: #7fbaf9;
  font-family: KionaBold;
  -webkit-font-smoothing: antialiased;
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .marged {
    margin-top: 100px;
  }
  .subtitle {
    font-size: 20px;
    color: white;
  }
  #app {
  }
}
</style>
