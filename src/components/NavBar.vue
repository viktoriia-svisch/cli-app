<template>
  <nav>
    <section class="nav flex">
      <router-link :to="{ path: '/' }"
        ><img
          v-if="$route.path != '/events'"
          alt="ODC Live"
          src="../assets/imgs/logo.png"
          height="75"
        />
        <img v-else src="../assets/imgs/events.png" height="75" />
      </router-link>
      <div class="flex menu">
        <router-link :to="{ path: '/podcasts' }"><h1>Podcasts</h1></router-link>
        <router-link :to="{ path: '/events' }"><h1>Events</h1></router-link>
        <router-link :to="{ path: '/calendar' }"
          ><h1>Calendrier</h1></router-link
        >
        <router-link id="bigshop" :to="{ path: '/shop' }"
          ><h1>Shop</h1></router-link
        >
      </div>
      <Radio
        ref="radio"
        :today_shows="today_shows"
        :iframe_update="iframe_mix"
        :style="`display: ${iframe_mix == '' ? 'flex' : 'none'}`"
      />
      <IframeSC :iframe_mix="iframe_mix" />
      <section id="search_sec">
        <img
          src="../assets/imgs/search.svg"
          class="search"
          @click="searchVis"
        />
        <input
          :style="
            `display: ${hiddenSearch ? 'none' : 'initial'};
            bottom: ${iframe_mix != '' ? '-8px' : '13px'}
          `
          "
          class="input"
          placeholder="Recherche"
          type="text"
          v-model="search"
          v-on:keyup.enter="sendQuery"
        />
      </section>
      <div class="more" @click="second = !second">
        <img v-if="second == false" width="40" src="../assets/imgs/menu.png" />
        <img
          v-else
          width="40"
          src="../assets/imgs/back_black.png"
          style="position: relative; top: 5px;"
        />
      </div>
    </section>
    <section class="second" :style="`right: ${second ? '0' : '-350px'}`">
      <img
        id="logo_white"
        alt="ODC Live"
        src="../assets/imgs/logo_white.png"
        width="140"
      />
      <div class="main">
        <h3 @click="toURL('/podcasts')">Podcasts</h3>
        <h3 @click="toURL('/events')">Events</h3>
        <h3 @click="toURL('/calendar')">Calendrier</h3>
        <h3 @click="toURL('/shop')">Shop</h3>
        <br />
        <h3 @click="toURL('/propose_show')">Proposer un show</h3>
        <h3>
          <a href="https:            >Soundcloud</a
          >
        </h3>
        <h3>
          <a href="https:        </h3>
        <h3>
          <a href="https:        </h3>
        <br />
        <h3 @click="toURL('/About')">About</h3>
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
import Radio from "./Radio.vue";
import IframeSC from "./IframeSC.vue";
import "../assets/js/soundcloud.js";
export default {
  name: "NavBar",
  props: ["today_shows", "color", "iframe_mix"],
  watch: {
    color: (newCol) => {
      const css = `.menu a:hover {color: ${newCol}35;}`;
      const style = document.createElement("style");
      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
      document.getElementsByTagName("head")[0].appendChild(style);
    },
  },
  components: {
    Radio,
    IframeSC,
  },
  data() {
    return {
      hiddenSearch: true,
      search: "",
      second: false,
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
    },
  },
};
</script>
<style lang="less" scoped>
nav {
  background-color: white;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 3;
  #search_sec {
    position: relative;
    .search {
      margin-left: 10px;
      cursor: pointer;
      width: 24px;
      height: 24px;
      position: relative;
      top: 27px;
    }
    .input {
      z-index: 5;
      position: absolute;
      right: 49px;
      width: 260px;
      max-width: 500px;
      padding: 10px 20px;
      margin: 8px 0;
      font-family: KionaBold;
      border-radius: 0px;
      border: 0px;
      color: black;
      background-color: #e8e8e8;
      background-image: url("../assets/imgs/play_white.svg");
      background-repeat: no-repeat;
      background-size: 30px 30px;
      background-position: right 10px top 4px;
    }
  }
  #second_shadow {
    z-index: 4;
    width: ~"calc(100% - 0px)";
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #00000040;
  }
  .second {
    color: white;
    z-index: 5;
    position: fixed;
    top: -2px;
    right: 0;
    height: ~"calc(100% + 2px)";
    width: 350px;
    background-color: #000;
    transition: 0.5s;
    #logo_white {
      display: block;
      margin: auto;
      width: 185px;
    }
    #back {
      cursor: pointer;
      top: 18px;
      position: absolute;
      right: 10px;
    }
    .main {
      margin: 0px 20px 0px 20px;
      padding: 2px;
      h3 {
        padding: 4px 10px 4px 10px;
        cursor: pointer;
        a {
          color: white;
          text-decoration: none;
          &:hover {
            background-color: #9191912e;
          }
        }
      }
    }
  }
  .nav {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    left: -14px;
    right: 0;
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .menu {
    h1 {
      padding-left: 30px;
      padding-right: 30px;
      padding-top: 20px;
      margin: 0px;
      padding: 30px 30px 0px 30px;
      color: black;
      cursor: pointer;
    }
    a {
      text-decoration: none;
    }
  }
  .more {
    margin: 18px 10px 0px 10px;
    letter-spacing: -4px;
    font-size: 24px;
    cursor: pointer;
  }
  @media (max-width: 1200px) {
    .nav {
      .menu {
        #bigshop {
          display: none;
        }
      }
    }
    .nav,
    #search_sec {
      width: 100%;
      .input {
        left: -186px;
        max-width: 150px;
      }
    }
    .second {
      .main {
        width: 100%;
        padding: 2px 0px 2px 0px;
      }
    }
  }
  @media (max-width: 900px) {
    .menu {
      display: none;
    }
    .nav {
      left: 5px;
    }
  }
}
</style>
