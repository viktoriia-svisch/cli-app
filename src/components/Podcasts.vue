<template>
  <section id="podcasts">
    <h1>podcasts</h1>
    <section class="podcast" v-for="pod in podcasts">
      <header>
        <section
          class="miximg"
          :style="
            `background: url(${pod.pictures.extra_large})
					no-repeat center center; background-size: cover;`
          "
        >
          <img class="play_mix" src="../assets/imgs/play_icon.png" />
        </section>
      </header>
      <ul class="podinfo">
        <li class="title">{{ pod.name }}</li>
        <li class="time">{{ Math.floor(pod.audio_length / 60) }} min</li>
        <li class="genres">
          <span class="tag" v-for="(tag, i) in pod.tags" v-bind:key="tag.name"
            >{{ tag.name.toLowerCase() }}
          </span>
        </li>
      </ul>
    </section>
  </section>
</template>
<script>
import axios from 'axios';
export default {
  name: 'Podcasts',
  data() {
    return {
      podcasts: [],
      next: '',
    };
  },
  mounted() {
    axios
      .get('https:      .then(res => {
        this.podcasts = res.data.data;
        this.next = res.data.paging.next;
      })
      .catch();
  },
};
</script>
<style lang="less" scoped>
#podcasts {
  h1 {
    font-family: Bison;
    font-size: 40px;
  }
  .podcast {
    width: 400px;
    .podinfo {
      font-family: SpaceMonoBold;
      list-style-type: none;
      padding-left: 5px;
      .title {
      }
      .time {
      }
      .genres {
        display: flex;
        flex-flow: wrap;
        span {
          border: 1px solid;
          margin: 3px 5px 0px 0px;
          padding: 0px 2px 0px 2px;
        }
      }
    }
    header {
      .miximg {
        height: 300px;
        width: 400px;
        position: relative;
        z-index: -1;
        .play_mix {
          position: absolute;
          bottom: 43%;
          left: 43%;
          height: 18%;
          transform: rotate(90deg);
        }
      }
    }
  }
}
</style>
