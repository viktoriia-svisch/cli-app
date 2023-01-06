<template>
  <main>
    <NavBar :today_shows="today_shows" :iframe_mix="iframe_mix" />
    <section class="main_section flex_center marged">
      <router-view :key="$route.fullPath" v-on:podcast="iframe_set" />
      <Right style="display: none" />
    </section>
  </main>
</template>
<script>
import axios from "axios";
import NavBar from "./mobile/NavBar.vue";
import Right from "./Right.vue";
export default {
  name: "Mobile",
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
    iframe_set(pod) {
      this.iframe_mix = pod;
    },
  },
  async mounted() {
    const id = this.$route.params.mix_id;
    if (id) {
      await axios
        .get(`${this.$config.VUE_APP_API}/sounds/tracks/${id}`)
        .then((res) => {
          this.iframe_mix = res.data;
          this.iframe_mix.autoplay = false;
        })
        .catch(this.$router.push({ path: "/" }));
    }
  },
};
</script>
<style lang="less" scoped>
main {
  .main_section {
    margin-bottom: 80px;
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
