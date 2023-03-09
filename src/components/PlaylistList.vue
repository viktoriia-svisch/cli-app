<template>
  <section class="playlists">
    <WidgetPlaylist v-for="pl in playlists" v-bind:key="pl.key" :src="pl.url" />
  </section>
</template>
<script>
import WidgetPlaylist from "./WidgetPlaylist.vue";
export default {
  name: "PlaylistList",
  components: {
    WidgetPlaylist,
  },
  data() {
    return {
      playlists: [
        {
          key: 1,
          url:
            "https:        },
        {
          key: 2,
          url:
            "https:        },
        {
          key: 3,
          url:
            "https:        },
        {
          key: 4,
          url:
            "https:        },
        {
          key: 5,
          url:
            "https:        },
      ],
    };
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.playlists {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(auto, auto);
  @media (max-width: 1200px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
