<template>
  <article id="spod">
    <h1>Les podcasts des emissions passées</h1>
    <section id="podcasts">
      <section class="podcast" v-for="pod in podcasts" v-bind:key="pod.key">
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
            <span class="tag" v-for="tag in pod.tags" v-bind:key="tag.name"
              >{{ tag.name.toLowerCase() }}
            </span>
          </li>
        </ul>
      </section>
    </section>
    <section id="more" v-if="more">
      <h1 id="more" @click="getPodcasts">en charger plus</h1>
    </section>
  </article>
</template>
<script>
import axios from 'axios';
export default {
  name: 'Podcasts',
  data() {
    return {
      podcasts: [],
      next: '',
      more: true,
    };
  },
  methods: {
    getPodcasts() {
      axios
        .get(this.next)
        .then(res => {
          if (res.data.paging.next === undefined) this.more = false;
          this.podcasts = this.podcasts.concat(res.data.data);
          this.next = res.data.paging.next;
        })
        .catch();
    },
  },
  mounted() {
    this.next = 'https:    this.getPodcasts();
  },
};
</script>
<style lang="less" scoped>
#spod {
  h1 {
    font-family: Bison;
    font-size: 40px;
  }
  #more {
    text-align: center;
    h1 {
      border: 3px solid #ffffff80;
      color: #ffffff80;
      display: inline;
      margin: 0 auto;
      padding: 3px;
      font-weight: normal;
      cursor: pointer;
      &:hover {
        border: 3px solid white;
        color: white;
      }
    }
  }
  #podcasts {
    display: flex;
    flex-flow: wrap;
    width: 100%;
    justify-content: center;
    .podcast {
      width: 400px;
      margin-left: 4px;
      margin-right: 4px;
      .podinfo {
        font-family: SpaceMonoBold;
        list-style-type: none;
        padding-left: 5px;
        padding-bottom: 5px;
        border: 1px solid #ffffff80;
        margin-top: 0px;
        &:hover {
          border: 1px solid white;
          .genres {
            span {
              color: white;
            }
          }
        }
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
}
</style>
