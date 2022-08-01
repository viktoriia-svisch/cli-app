<template>
  <main>
    <NavBar :today_shows="today_shows" :color="color" />
    <section class="main_section flex_center marged">
      <router-view :key="$route.fullPath" />
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
    };
  },
};
</script>
<style lang="less" scoped></style>
