<template>
  <section class="podcast">
    <header @click="getAudio(pod.url)">
      <img
        :src="podImage"
        class="miximg"
        :class="{ blurred: !intersect, noblurred: intersect }"
      />
      <img class="play_mix" src="../assets/imgs/play_icon.png" />
    </header>
    <ul class="podinfo">
      <li class="lititle" @click="toPodcast(pod.slug)">
        <span class="title">{{ pod.title }}</span>
        <span class="time">{{ pod.audio_length }}</span>
      </li>
      <li class="genres">
        <span
          v-for="tag in [pod.genre]"
          v-bind:key="tag.name"
          @click="search(tag.toLowerCase())"
          >{{ tag.toLowerCase() }}
        </span>
      </li>
    </ul>
  </section>
</template>
<script>
import axios from "axios";
export default {
  name: "Podcast_Widget",
  props: ["pod"],
  data() {
    return {
      observer: null,
      podImage: "",
      intersect: false
    };
  },
  methods: {
    toPodcast(key) {
      const tag = key.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      this.$router.push({ path: `/podcasts/${tag}` });
    },
    async getAudio(url) {
      window.open(url, "_blank");
    },
    search(tag) {
      if (this.$route.path == "/search") {
        this.$parent.searchQuery = tag;
        this.$parent.getGenre();
      } else {
        localStorage.setItem("tag", tag);
        this.$router.push({ path: "/search" });
      }
    }
  },
  mounted() {
    const time = Math.floor(this.pod.full_duration / 60000);
    let minutes = Math.floor(time % 60);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    this.pod.audio_length =
      time < 60 ? `${minutes}min` : `${Math.floor(time / 60)}h ${minutes}min`;
    this.podImage = this.pod.artwork_url;
    let large = this.pod.artwork_url;
    large = large.replace("-large", "-t500x500");
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        const img = new Image();
        img.onload = () => {
          this.podImage = large;
          this.intersect = true;
        };
        img.src = large;
        this.observer.disconnect();
      }
    });
    this.observer.observe(this.$el);
  },
  destroyed() {
    this.observer.disconnect();
  }
};
</script>
<style lang="less" scoped>
.podcast {
  border: 1px solid #ffffff80;
  &:hover {
    border: 1px solid white;
    .podinfo {
      .genres {
        span {
          color: white;
        }
      }
    }
  }
  .podinfo {
    font-family: SpaceMonoBold;
    list-style-type: none;
    padding-left: 5px;
    padding-bottom: 5px;
    margin-top: 0px;
    margin-bottom: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-right: 5px;
    .lititle {
      cursor: pointer;
      padding-left: 5px;
      padding-right: 5px;
      .title {
        display: block;
      }
      .time {
        color: #ffffff80;
      }
      &:hover {
        background-color: white;
        .title {
          color: black;
        }
        .time {
          color: #00000080;
        }
      }
    }
    .genres {
      display: flex;
      flex-flow: wrap;
      span {
        margin: 3px 5px 0px 0px;
        border: 1px solid #ffffff80;
        padding: 0px 2px 0px 2px;
        color: #ffffff80;
        cursor: pointer;
        z-index: 1;
        &:hover {
          border: 1px solid white;
        }
      }
    }
  }
  header {
    position: relative;
    overflow: hidden;
    .blurred {
      filter: blur(2px);
    }
    .noblurred {
      transition: all 0.2s;
    }
    .miximg {
      z-index: -1;
      opacity: 1;
      width: ~"calc(100% - 10px)";
      height: ~"calc(100% - 10px)";
      margin-top: 5px;
      margin-left: 5px;
      cursor: pointer;
    }
    .play_mix {
      display: none;
      position: absolute;
      bottom: 43%;
      left: 43%;
      height: 18%;
      transform: rotate(90deg);
      cursor: pointer;
    }
    &:hover {
      .miximg {
        opacity: 0.3;
      }
      .play_mix {
        display: initial;
      }
    }
  }
  @media (max-width: 400px) {
    width: initial;
    margin-left: 0;
    margin-right: 0;
    header {
      .play_mix {
        bottom: 40vw;
        left: 41vw;
      }
    }
    .podinfo {
      height: initial;
    }
  }
}
</style>
