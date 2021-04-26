<template>
  <section class="podcast">
    <header @click="getAudio(pod.key)">
      <section
        class="miximg"
        :style="
          `background: url(${pod.pictures.large})
					no-repeat center center; background-size: cover;`
        "
      >
        <img class="play_mix" src="../assets/imgs/play_icon.png" />
      </section>
    </header>
    <ul class="podinfo">
      <li @click="toPodcast(pod.slug)">
        <span class="title">{{ pod.name }}</span
        ><br />
        <span class="time">{{ Math.floor(pod.audio_length / 60) }} min</span>
      </li>
      <li class="genres">
        <span
          v-for="tag in pod.tags"
          v-bind:key="tag.name"
          @click="search(tag.name.toLowerCase())"
          >{{ tag.name.toLowerCase() }}
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
  methods: {
    toPodcast(key) {
      const tag = key.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      this.$router.push({ path: `/podcasts/${tag}` });
    },
    async getAudio(key) {
      const res = await axios.get(`${process.env.VUE_APP_API}/mix`, {
        params: { key: key }
      });
      this.$parent.$parent.mix = res.data;
      if (window.innerWidth > 800) this.$parent.$parent.mixh = 45;
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
  }
};
</script>
<style lang="less" scoped>
.podcast {
  width: 400px;
  margin-left: 4px;
  margin-right: 4px;
  cursor: pointer;
  &:hover {
    .podinfo {
      border: 1px solid white;
      .genres {
        span {
          color: white;
        }
      }
    }
    header {
      .miximg {
        opacity: 1;
      }
    }
  }
  .podinfo {
    font-family: SpaceMonoBold;
    list-style-type: none;
    padding-left: 5px;
    padding-bottom: 5px;
    border: 1px solid #ffffff80;
    margin-top: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 131px;
    .title {
    }
    .time {
      color: #ffffff80;
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
    .miximg {
      height: 300px;
      width: 400px;
      position: relative;
      z-index: -1;
      opacity: 0.7;
      .play_mix {
        position: absolute;
        bottom: 43%;
        left: 43%;
        height: 18%;
        transform: rotate(90deg);
      }
    }
  }
  @media (max-width: 400px) {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    header {
      .miximg {
        width: 100%;
        height: 250px;
      }
    }
    .podinfo {
      height: initial;
    }
  }
  @media (max-width: 250px) {
    header {
      .miximg {
        height: 150px;
      }
    }
  }
}
</style>
