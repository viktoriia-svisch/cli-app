<template>
  <section id="podcast" v-if="pod.genres">
    <img
      :src="podImg"
      class="podimg"
      @click="play_podcast"
      :title="pod.title"
    />
    <span id="title">
      <span
        class="genre"
        v-for="genre in pod.genres.slice(0, nb_tags)"
        v-bind:key="genre"
        ><router-link :to="{ path: '/search/' + genre }">{{
          genre
        }}</router-link></span
      >
      <div class="share" @click="share_mix">
        <div class="innershare">
          <span>{{ share_msg }}</span>
          <img src="../assets/imgs/copy_icon.png" />
        </div>
      </div>
    </span>
  </section>
</template>
<script>
export default {
  name: "WidgetPodcast",
  props: {
    pod: null,
    nb_tags: Number,
  },
  data() {
    return {
      podImg: "",
      share_msg: "Partager",
    };
  },
  methods: {
    share_mix() {
            var input = document.createElement("input");
      input.setAttribute(
        "value",
        `${this.$config.VUE_APP_WEB}/p/${this.pod.id}`
      );
      document.body.appendChild(input);
      input.select();
      var result = document.execCommand("copy");
      document.body.removeChild(input);
      if (result == true) {
        this.share_msg = "Copié";
        setTimeout(() => {
          this.share_msg = "Partager";
        }, 1000);
      }
    },
    play_podcast() {
      this.$parent.$parent.$emit("podcast", "");
      setTimeout(() => {
        this.pod.autoplay = true;
        this.$parent.$parent.$emit("podcast", this.pod);
      }, 300);
    },
  },
  beforeMount() {
    this.pod.genres = this.pod.tag_list.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g);
    if (this.pod.genres != null) {
      this.pod.genres = this.pod.genres.map((g) => {
        if (g[0] == '"') return g.substring(1, g.length - 1).toUpperCase();
        else return g.toUpperCase();
      });
    }
    if (!this.pod.artwork_url) {
      this.podImg = this.pod.avatar_url;
    } else {
      this.podImg = this.pod.artwork_url;
    }
    this.podImg = this.podImg.replace("-large", "-t500x500");
    this.pod.podImg = this.podImg;
  },
};
</script>
<style lang="less" scoped>
#podcast {
  position: relative;
  display: grid;
  #title {
    bottom: 4px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .genre {
      font-size: 15px;
      padding: 10px 8px 5px 8px;
      cursor: pointer;
      font-family: NexaBold;
      text-align: center;
      background-color: #2b2b2b3b;
      margin-top: 5px;
      a {
        color: white;
        text-decoration: none;
        display: block;
      }
      &:hover {
        background-color: #000000a0;
      }
    }
    .share {
      font-size: 15px;
      padding: 9px 8px 3px 3px;
      cursor: pointer;
      font-family: NexaBold;
      letter-spacing: -1px;
      text-align: center;
      background-color: #dbdbdb3b;
      margin-top: 5px;
      color: white;
      &:hover {
        background-color: #dddddda1;
      }
      .innershare {
        display: flex;
        justify-content: space-around;
        width: 110px;
        margin: 0 auto;
        span {
          width: 65px;
        }
        img {
          margin-top: -3px;
          margin-bottom: 5px;
          width: 20px;
        }
      }
    }
  }
  .podimg {
    width: 200px;
    cursor: pointer;
    opacity: 1;
    &:hover {
      transition: all 0.2s;
      opacity: 0.5;
    }
  }
}
</style>
