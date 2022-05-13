<template>
  <div id="app" :style="'background-color:' + color">
    <Fullscreen />
  </div>
</template>
<script>
import Fullscreen from "./components/Fullscreen.vue";
export default {
  name: "App",
  components: {
    Fullscreen,
  },
  data() {
    return {
      color: "#936A54",
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
