<template>
  <section id="podcast">
    <div id="background"></div>
    <div id="backimg">
      <div id="backimg2"></div>
    </div>
    <article>
      <img :src="podcast.pictures.extra_large" />
    </article>
    <header>
      <h1>{{ podcast.name }}</h1>
      <ul>
        <li
          v-for="tag in podcast.tags"
          v-bind:key="tag.name"
          @click="search(tag.name.toLowerCase())"
        >
          <span class="tag">{{ tag.name.toLowerCase() }}</span>
        </li>
      </ul>
      <br />
    </header>
    <span class="listen" @click="getAudio(podcast.key)">▶ ecouter</span>
    <p>
      {{ podcast.description }}
    </p>
  </section>
</template>
<script>
import axios from "axios";
export default {
  name: "Podcast",
  data() {
    return {
      key: "",
      podcast: {}
    };
  },
  methods: {
    search(tag) {
      if (this.$route.path == "/search") {
        this.$parent.searchQuery = tag;
        this.$parent.getGenre();
      } else {
        localStorage.setItem("tag", tag);
        this.$router.push({ path: "/search" });
      }
    },
    async getAudio(key) {
      const res = await axios.get(`${process.env.VUE_APP_API}/mix`, {
        params: { key: key }
      });
      this.$parent.mix = res.data;
      if (window.innerWidth > 800) this.$parent.mixh = 45;
    },
    async getPodcast() {
      await axios
        .get(`${process.env.VUE_APP_API}/mix/${this.key}`)
        .then(res => {
          this.podcast = res.data;
        })
        .catch(() => {
          this.$router.push({ path: "/" });
        });
    }
  },
  mounted() {
    this.key = this.$route.params.id;
    this.getPodcast();
  }
};
</script>
<style lang="less" scoped>
#podcast {
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  border-top: 5px dashed white;
  border-left: 5px dashed white;
  #backimg {
    position: absolute;
    height: 660px;
    width: 90px;
    background-color: white;
    right: 0;
    top: 80px;
    #backimg2 {
      position: absolute;
      left: 0;
      background-color: black;
      width: 82px;
      height: 644px;
      top: 10px;
    }
  }
  #background {
    height: ~"calc(100vh - 203px)";
  }
  p {
    font-family: sans-serif;
    background-color: white;
    color: black;
    z-index: 2;
    padding: 15px;
    position: absolute;
    top: 225px;
    margin-left: 10px;
    width: 410px;
  }
  header {
    background-color: white;
    color: black;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    position: absolute;
    top: 0;
    h1 {
      padding-left: 10px;
      padding-right: 10px;
      font-family: Bison;
      font-size: 40px;
      margin-bottom: 5px;
      margin-top: 5px;
    }
    ul {
      list-style-type: none;
      padding-left: 10px;
      margin-top: 0;
      text-align: right;
      display: flex;
      li {
        margin-bottom: 5px;
        .tag {
          font-family: SpaceMonoBold;
          margin: 3px 5px 0px 0px;
          border: 1px solid #000000b3;
          padding: 0px 2px 0px 2px;
          color: #000000b3;
          cursor: pointer;
          z-index: 1;
          &:hover {
            border: 1px solid black;
            color: black;
          }
        }
      }
    }
  }
  .listen {
    position: absolute;
    top: 150px;
    left: 10px;
    font-size: 30px;
    font-family: Bison;
    border: 1px solid white;
    padding: 3px 7px 3px 7px;
    cursor: pointer;
    &:hover {
      background-color: white;
      color: black;
    }
  }
  article {
    margin-top: 20px;
    img {
      position: absolute;
      right: 30px;
      top: 110px;
      z-index: 1;
      height: 600px;
    }
  }
}
</style>
