<template>
  <article id="spod">
    <h1>Les podcasts des emissions passées</h1>
    <section id="podcasts">
      <Podcast v-for="pod in podcasts" v-bind:key="pod.key" :pod="pod" />
    </section>
    <section id="more" v-if="more">
      <h1 id="more" @click="getPodcasts">en charger plus</h1>
    </section>
  </article>
</template>
<script>
import axios from 'axios';
import Podcast from '@/components/Podcast_Widget';
export default {
  name: 'Podcasts',
  components: {
    Podcast,
  },
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
    margin-top: 14px;
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
  @media (max-width: 700px) {
    #podcasts {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 400px) {
    #podcasts {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
