<template>
  <main>
    <NavBar
      :today_shows="today_shows"
      :color="color"
      :iframe_mix="iframe_mix"
    />
    <section class="main_section flex_center marged">
      <router-view :key="$route.fullPath" v-on:podcast="iframe_set" />
      <Right />
    </section>
  </main>
</template>
<script>
import NavBar from "./NavBar.vue";
import Right from "./Right.vue";
export default {
  name: "Fullscreen",
  props: ["color"],
  components: {
    NavBar,
    Right,
  },
  data() {
    return {
      today_shows: [],
      iframe_mix: "",
    };
  },
  methods: {
    iframe_set(id) {
      this.iframe_mix = id;
    },
  },
  mounted() {
    if (this.$route.params.mix_id) {
      this.iframe_mix = this.$route.params.mix_id;
    }
  },
};
</script>
<style lang="less" scoped></style>
