<template>
  <div id="app">
    <NavBar />
    <section class="flex marged">
      <router-view />
      <Right />
    </section>
  </div>
</template>
<script>
import NavBar from "./components/NavBar.vue";
import Right from "./components/Right.vue";
export default {
  name: "App",
  components: {
    NavBar,
    Right
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
    max-width: 1200px;
    margin: 100px auto;
  }
  .subtitle {
    font-size: 20px;
    color: white;
  }
  #app {
  }
}
</style>
