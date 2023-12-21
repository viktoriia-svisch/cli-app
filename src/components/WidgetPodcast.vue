<template>
  <section id="podcast">
    <img :src="podImg" class="podimg" @click="play_podcast" :title="pod.title" />
    <div class="podcast__footer">
      <div class="podcast__genres">
        <span
          class="genre"
          v-for="genre in pod.genres ? pod.genres.slice(0, nb_tags) : []"
          v-bind:key="genre"
          ><router-link :to="{ path: '/search/' + genre }"
            >#{{ genre }}</router-link
          ></span
        >
      </div>
      <div class="podcast__buttons">
        <span>{{ pod.dj }}</span>
        <span class="soundcloud" @click="open_soundcloud">
          <img src="../assets/imgs/soundcloud.svg" />
        </span>
        <span class="share" @click="share_mix">
          <img src="../assets/imgs/share.svg" />
        </span>
      </div>
    </div>
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
    };
  },
  methods: {
    share_mix() {
            var input = document.createElement("input");
      input.setAttribute("value", `${this.$config.VUE_APP_WEB}/p/${this.pod.id}`);
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    },
    open_soundcloud() {
        window.open(this.pod.permalink_url);
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
        if (g[0] == '"') return g.substring(1, g.length - 1);
        else return g;
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
  display: flex;
  flex-direction: column;
  .podcast__footer {
    display: flex;
    flex-direction: row;
  }
  .podcast__genres {
    display: flex;
    gap: 2px .2rem;
    flex-wrap: wrap;
    margin-top: 4px;
    flex-grow: 1;
    align-items: center;
  }
  .podcast__buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    padding: 2px 0 0 0;
    .share,
    .soundcloud {
      font-size: 18px;
      cursor: pointer;
      border-radius: 50%;
      height: 24px;
      width: 24px;
      transition: all 0.2s;
      img {
        padding: 3.2px;
      }
      &:hover {
        background-color: var(--color-primary);
      }
    }
  }
  .podimg {
    width: 100%;
    cursor: pointer;
    opacity: 1;
    transition: all 0.3s;
    border: 2px solid var(--color-text);
    box-sizing: border-box;
    &:hover {
      border-color: var(--color-primary);
    }
  }
}
</style>
