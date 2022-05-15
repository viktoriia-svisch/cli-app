<template>
  <nav>
    <section id="topnav">
      <span id="burger">burger</span>
      <img
        id="logo"
        alt="ODC Live"
        src="../../assets/imgs/logo.png"
        width="140"
      />
    </section>
    <section id="bottomnav">
      <Radio :today_shows="today_shows" />
      <span>chat</span>
    </section>
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
      hiddenSearch: true,
      search: "",
      second: false
    };
  },
  methods: {
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
    top: 0;
    display: flex;
    justify-content: center;
    #logo {
    }
    #burger {
      position: absolute;
      left: 23px;
      top: 23px;
    }
  }
  #bottomnav {
    z-index: 3;
    width: 100%;
    height: 70px;
    background-color: white;
    position: fixed;
    bottom: 0;
    display: flex;
  }
}
</style>
