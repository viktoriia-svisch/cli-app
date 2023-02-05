<template>
  <div id="app" :style="'background-color:' + color + ';'">
    <img class="bg_img" :src="innerWidth >= 815 ? bg : bg_mb" />
    <div v-if="innerWidth >= 815" class="bg">
      <Fullscreen :color="color" />
    </div>
    <div v-else class="bg">
      <Mobile />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Fullscreen from "./components/Fullscreen.vue";
import Mobile from "./components/Mobile.vue";
export default {
  name: "App",
  components: {
    Fullscreen,
    Mobile,
  },
  data() {
    return {
      color: "#5D58C9",
      bg:
        this.$config.VUE_APP_API +
        "/upload/background?t=" +
        new Date().getTime(),
      bg_mb:
        this.$config.VUE_APP_API +
        "/upload/background_mobile?t=" +
        new Date().getTime(),
      innerWidth: window.innerWidth,
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.innerWidth = window.innerWidth;
    });
    axios
      .get(`${this.$config.VUE_APP_API}/upload/color?t=${new Date().getTime()}`)
      .then((response) => {
        this.color = response.data.color;
      });
  },
};
</script>
<style lang="less">
@font-face {
  font-family: NexaLight;
  src: url("./assets/fonts/nexa_light.otf");
}
@font-face {
  font-family: NexaRegular;
  src: url("./assets/fonts/nexa_regular.otf");
}
@font-face {
  font-family: NexaBold;
  src: url("./assets/fonts/nexa_bold.otf");
}
@font-face {
  font-family: NexaHeavy;
  src: url("./assets/fonts/nexa_heavy.otf");
}
body {
  margin: 0;
  font-family: NexaRegular;
  -webkit-font-smoothing: antialiased;
  #app {
    .bg_img {
      position: fixed;
      z-index: 0;
      top: 0;
      left: 0;
      min-width: 100%;
      min-height: 100%;
    }
    .bg {
      position: relative;
      z-index: 1;
      padding-bottom: 50px;
      min-height: ~"calc(100vh - 50px)";
    }
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
    margin: 50px auto 0px auto;
  }
  .subtitle {
    font-size: 24px;
    color: white;
    margin-bottom: 10px;
    display: inline-block;
    font-family: NexaHeavy;
  }
  .voirplus {
    padding-top: 8px;
    position: absolute;
    top: 9px;
    font-size: 16px;
    color: white;
  }
  @media (max-width: 1200px) {
    .main_section {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
  @media (max-width: 815px) {
    -webkit-user-select: none; 
    -moz-user-select: none; 
    -ms-user-select: none; 
    user-select: none; 
    #app {
      .bg {
        min-height: ~"calc(100vh - 100px)";
        padding-bottom: 15px;
      }
    }
    .main_section {
      flex-direction: column-reverse;
    }
    .marged {
      margin: 70px auto 0px auto;
    }
  }
  @media (max-width: 430px) {
    .podcasts {
      .podcast {
        .podimg {
          width: 100% !important;
        }
      }
    }
    .mobile_pods {
      .podcast {
        .podimg {
          width: 230px !important;
        }
      }
    }
  }
}
</style>
