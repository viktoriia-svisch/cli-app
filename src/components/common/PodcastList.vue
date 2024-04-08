<template>
  <section class="podcasts">
    <WidgetPodcast
      class="podcast"
      v-for="pod in pods"
      v-bind:key="pod.key"
      :pod="pod"
      :nb_tags="innerWidth >= 815 ? 2 : 1"
    />
  </section>
</template>
<script>
import WidgetPodcast from "./WidgetPodcast.vue";
export default {
  name: "PodcastList",
  components: {
    WidgetPodcast,
  },
  props: ["pods"],
  data() {
    return {
      innerWidth: window.innerWidth,
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.innerWidth = window.innerWidth;
    });
  },
};
</script>
<style lang="less" scoped>
.podcasts {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2rem .5rem;
  grid-auto-rows: minmax(auto, auto);
  .podcast {
    margin: 0 auto;
  }
  @media (max-width: 2400px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 1800px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1300px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
