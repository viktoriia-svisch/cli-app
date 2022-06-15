<template>
  <nav>
    <section id="topnav">
      <img
        id="burger"
        @click="second = !second"
        src="../../assets/imgs/menu.png"
      />
      <img
        id="logo"
        alt="ODC Live"
        src="../../assets/imgs/logo.png"
        width="140"
      />
    </section>
    <section id="bottomnav">
      <Radio :today_shows="today_shows" />
      <img id="chaticon" src="../../assets/imgs/chat.svg" />
    </section>
    <section id="second" :style="`left: ${second ? '0' : '-75%'}`">
      <img
        id="back"
        src="../../assets/imgs/back.png"
        width="30"
        @click="second = !second"
      />
      <img
        id="logo_white"
        @click="toURL('/')"
        alt="ODC Live"
        src="../../assets/imgs/logo_white.png"
        width="140"
      />
      <div id="link_sec">
        <h3 @click="toURL('/podcasts')">Podcasts</h3>
        <h3 @click="toURL('/events')">Events</h3>
        <h3 @click="toURL('/calendar')">Calendar</h3>
        <h3>Proposer un show</h3>
        <br />
        <h3>Merch</h3>
        <h3>About</h3>
      </div>
    </section>
    <section
      id="second_shadow"
      :style="`display: ${second ? 'initial' : 'none'}`"
      @click="second = !second"
    ></section>
  </nav>
</template>
<script>
import Radio from "../Radio.vue";
export default {
  name: "NavBar",
  props: ["today_shows"],
  components: {
    Radio
  },
  data() {
    return {
      second: false
    };
  },
  methods: {
    toURL(dest) {
      this.$router.push(dest);
      this.second = false;
    },
    sendQuery() {
      this.$router.push({ path: `/search/${this.search}` });
    },
    searchVis() {
      if (this.hiddenSearch) {
        this.hiddenSearch = false;
      } else {
        this.hiddenSearch = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
nav {
  #topnav {
    z-index: 3;
    width: 100%;
    height: 70px;
    background-color: white;
    position: fixed;
    top: -1px;
    display: flex;
    justify-content: center;
    #logo {
    }
    #burger {
      position: absolute;
      left: 0;
      top: 0;
      padding: 18px;
      width: 33px;
    }
  }
  #bottomnav {
    z-index: 3;
    width: 100%;
    height: 70px;
    background-color: white;
    position: fixed;
    bottom: -1px;
    display: flex;
    #chaticon {
      position: absolute;
      right: 0;
      bottom: 0;
      padding: 15px;
      width: 40px;
      height: 40px;
    }
  }
  #second {
    position: relative;
    z-index: 4;
    position: fixed;
    top: 0;
    height: 100%;
    width: 75%;
    background-color: black;
    transition: 0.5s;
    color: white;
    #link_sec {
      padding-left: 18px;
      a {
        text-decoration: none;
        color: white;
      }
    }
    #back {
      position: absolute;
      left: 0;
      top: 0;
      padding: 18px;
      width: 33px;
    }
    #logo_white {
      display: block;
      margin: auto;
    }
  }
  #second_shadow {
    z-index: 4;
    width: 25%;
    height: 100vh;
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
