<template>
  <main>
    <NavBar :today_shows="today_shows" />
    <section class="main_section flex_center marged">
      <router-view :key="$route.fullPath" />
      <Right />
    </section>
  </main>
</template>
<script>
import NavBar from "./mobile/NavBar.vue";
import Right from "./Right.vue";
export default {
  name: "Mobile",
  components: {
    NavBar,
    Right
  },
  data() {
    return {
      today_shows: []
    };
  }
};
</script>
<style lang="less" scoped></style>
