<template>
  <div id="app" :style="'background-color:' + color">
    <NavBar :today_shows="today_shows" />
    <input type="color" v-model="color" />
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
  },
  data() {
    return {
      color: "#7fbaf9",
      today_shows: []
    };
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
  font-family: KionaBold;
  -webkit-font-smoothing: antialiased;
  #app {
    min-height: 100vh;
    padding-bottom: 100px;
  }
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
    margin: 100px auto 0px auto;
  }
  .subtitle {
    font-size: 24px;
    color: white;
  }
  @media (max-width: 1200px) {
    .main_section {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
  @media (max-width: 770px) {
    .main_section {
      flex-direction: column-reverse;
    }
  }
}
</style>
