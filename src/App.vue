<template>
  <div id="app">
    <NavBar />
    <section class="main_section flex_center marged">
      <router-view :key="$route.fullPath" />
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
  .flex_center {
    display: flex;
    justify-content: center;
  }
  .marged {
    max-width: 1200px;
    margin: 100px auto;
  }
  .subtitle {
    font-size: 20px;
    color: white;
  }
  @media (max-width: 770px) {
    .main_section {
      flex-direction: column-reverse;
    }
  }
}
</style>
