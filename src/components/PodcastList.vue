<template>
  <section class="podcasts">
    <WidgetPodcast
      class="podcast"
      v-for="pod in pods"
      v-bind:key="pod.key"
      :pod="pod"
      :nb_tags="innerWidth >= 730 ? 2 : 1"
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
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(auto, auto);
  .podcast {
    margin: 0 auto;
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 770px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
