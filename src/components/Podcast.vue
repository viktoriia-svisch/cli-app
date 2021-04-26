<template>
  <section id="podcast">
    <article>
      <img :src="podcast.pictures.extra_large" />
    </article>
    <header>
      <h1>{{ podcast.name }}</h1>
      <p>{{ podcast.description }}</p>
      <ul>
        <li
          v-for="tag in podcast.tags"
          v-bind:key="tag.name"
          @click="search(tag.name.toLowerCase())"
        >
          <span class="tag">{{ tag.name.toLowerCase() }}</span>
        </li>
      </ul>
      <span class="listen" @click="getAudio(podcast.key)">▶ ecouter</span>
    </header>
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
  display: flex;
  header {
    margin-left: 10px;
    ul {
      list-style-type: none;
      margin-left: 0;
      text-align: right;
      li {
        margin-bottom: 5px;
        .tag {
          font-family: SpaceMonoBold;
          margin: 3px 5px 0px 0px;
          border: 1px solid #ffffff80;
          padding: 0px 2px 0px 2px;
          color: #ffffff80;
          cursor: pointer;
          z-index: 1;
          &:hover {
            border: 1px solid white;
            color: white;
          }
        }
      }
    }
    .listen {
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
  }
  article {
    margin-top: 20px;
  }
}
</style>
