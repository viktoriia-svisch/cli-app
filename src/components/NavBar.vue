<template>
  <nav>
    <section class="nav flex">
      <router-link :to="{ path: '/' }"
        ><img alt="ODC Live" src="../assets/imgs/logo.png" width="150"
      /></router-link>
      <div class="flex menu">
        <router-link :to="{ path: '/podcasts' }"><h1>Podcasts</h1></router-link>
        <h1>Events</h1>
        <router-link :to="{ path: '/calendar' }"
          ><h1>Calendrier</h1></router-link
        >
      </div>
      <Radio :today_shows="today_shows" />
      <img src="../assets/imgs/search.svg" class="search" @click="searchVis" />
      <div class="more">•••</div>
    </section>
    <section
      id="search_sec"
      :style="`display: ${hiddenSearch ? 'none' : 'initial'}`"
    >
      <input
        class="input"
        placeholder="Recherche"
        type="text"
        v-model="search"
        v-on:keyup.enter="sendQuery"
      />
    </section>
  </nav>
</template>
<script>
import Radio from "./Radio.vue";
export default {
  name: "NavBar",
  props: ["today_shows"],
  components: {
    Radio
  },
  data() {
    return {
      hiddenSearch: true,
      search: ""
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
  background-color: white;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 3;
  #search_sec {
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    width: 1200px;
    .input {
      position: absolute;
      right: 0;
      max-width: 500px;
      padding: 12px 20px;
      margin: 8px 0;
      box-sizing: border-box;
      font-family: KionaBold;
      border-radius: 0px;
      border: 0px;
      color: white;
      background-color: #ffffff40;
      background-image: url("../assets/imgs/play_white.svg");
      background-repeat: no-repeat;
      background-size: 30px 30px;
      background-position: right 10px top 6px;
    }
  }
  .nav {
    width: 1200px;
    margin: 0 auto;
    left: 0;
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
      padding: 28px 30px 0px 30px;
      color: black;
      cursor: pointer;
    }
    a {
      text-decoration: none;
    }
    a:hover {
      background-color: #ddd;
    }
  }
  .search {
    margin-left: 10px;
    cursor: pointer;
  }
  .more {
    margin: 23px 10px 0px 10px;
    letter-spacing: -4px;
    font-size: 24px;
    cursor: pointer;
  }
  @media (max-width: 1200px) {
    .nav, #search_sec {
      width: 100%;
    }
  }
  @media (max-width: 900px) {
    .menu {
      display: none;
    }
  }
}
</style>
