<template>
  <section id="podcast">
    <div id="background"></div>
    <div id="backimg">
      <div id="backimg2"></div>
    </div>
    <header>
      <h1>{{ podcast.title }}</h1>
      <ul>
        <li>
          <span
            class="tag"
            v-for="tag in podcast.genres"
            v-bind:key="tag.name"
            @click="search(tag.toLowerCase())"
            >{{ tag.toLowerCase() }}</span
          >
        </li>
      </ul>
      <br />
      <p>
        {{ podcast.description }}<br />
        <b>{{ audio_length }}</b>
      </p>
    </header>
    <span class="listen" @click="getAudio(podcast.id)">
      <img src="../assets/imgs/play.svg" />
      ecouter</span
    >
    <article>
      <img :src="pic" :class="{ blurred: isBlurred, noblurred: !isBlurred }" />
    </article>
  </section>
</template>
<script>
import axios from "axios";
export default {
  name: "Podcast",
  data() {
    return {
      key: "",
      podcast: {},
      pic: "",
      audio_length: 0,
      isBlurred: true
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
    getAudio(id) {
      this.$emit("play_mix", id);
    },
    async getPodcast() {
      await axios
        .get(`${process.env.VUE_APP_API}/sounds/tracks/${this.key}`)
        .then(res => {
          this.podcast = res.data;
          this.pic = this.podcast.artwork_url;
          const img = new Image();
          const src = this.podcast.artwork_url;
          let large = this.podcast.artwork_url;
          large = large.replace("-large", "-t500x500");
          img.onload = () => {
            this.pic = large;
            this.isBlurred = false;
          };
          img.src = large;
          const time = Math.floor(this.podcast.full_duration / 60000);
          let minutes = Math.floor(time % 60);
          minutes = minutes < 10 ? `0${minutes}` : minutes;
          this.audio_length =
            time < 60
              ? `${minutes}min`
              : `${Math.floor(time / 60)}h ${minutes}min`;
          this.podcast.genres = this.podcast.tag_list.match(
            /(".*?"|[^"\s]+)+(?=\s*|\s*$)/g
          );
          this.podcast.genres = this.podcast.genres.map(g => {
            if (g[0] == '"') return g.substring(1, g.length - 1);
            return g;
          });
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
  margin-top: 10px;
  position: relative;
  border-top: 5px dashed white;
  border-left: 5px dashed white;
  #backimg {
    position: absolute;
    height: 660px;
    width: 90px;
    background-color: white;
    right: 15px;
    top: 80px;
    #backimg2 {
      position: absolute;
      left: 0;
      background-color: black;
      width: 82px;
      height: 644px;
      top: 8px;
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
    width: 420px;
  }
  header {
    background-color: white;
    color: black;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 10px;
    position: absolute;
    top: 19px;
    h1 {
      padding-left: 10px;
      padding-right: 10px;
      font-family: Bison;
      font-size: 40px;
      margin-bottom: 5px;
      margin-top: 5px;
      width: 429px;
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
    background-color: black;
    position: absolute;
    display: ruby;
    top: 29px;
    right: 15px;
    font-size: 30px;
    font-family: Bison;
    border: 1px solid white;
    padding: 3px 7px 3px 7px;
    cursor: pointer;
    img {
      height: 21px;
    }
    &:hover {
      background-color: white;
      color: black;
    }
  }
  article {
    margin-top: 20px;
    img {
      position: absolute;
      right: 45px;
      top: 110px;
      z-index: 1;
      height: 600px;
    }
    .blurred {
      filter: blur(2px);
    }
    .noblurred {
      transition: all 0.2s;
    }
  }
  @media (max-width: 1000px) {
    margin: 10px;
    .listen {
      img {
        height: 30px;
      }
    }
    #backimg {
      display: none;
    }
    #background {
      display: none;
    }
    header {
      position: relative;
      top: 0;
      margin-bottom: 10px;
    }
    p {
      width: ~"calc(100% - 50px)";
      position: relative;
      top: 0;
    }
    article {
      margin-top: 0px;
      img {
        position: relative;
        top: 10px;
        left: 10px;
        width: ~"calc(100% - 20px)";
        height: ~"calc(100% - 20px)";
      }
    }
    .listen {
      position: relative;
      font-size: 40px;
      top: 0px;
    }
  }
  @media (max-width: 600px) {
    border: none;
    margin: 0;
    header {
      ul {
        flex-wrap: wrap;
        width: initial;
      }
    }
    p {
      width: ~"calc(100% - 30px)";
      margin-left: 0;
    }
    article {
      img {
        width: ~"calc(100% - 19px)";
        height: initial;
      }
    }
    .listen {
      display: block;
      width: ~"calc(100% - 35px)";
      text-align: center;
    }
  }
}
</style>
