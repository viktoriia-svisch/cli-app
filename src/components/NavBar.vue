<template>
  <nav>
    <section class="nav flex">
      <img alt="ODC Live" src="../assets/imgs/logo.png" width="150" />
      <div class="flex menu">
        <h1>Podcasts</h1>
        <h1>Events</h1>
        <h1>Calendrier</h1>
      </div>
      <Radio />
      <div class="more">•••</div>
    </section>
  </nav>
</template>
<script>
import Radio from "./Radio.vue";
export default {
  name: "NavBar",
  components: {
    Radio
  }
};
</script>
<style lang="less" scoped>
nav {
  background-color: white;
  position: sticky;
  top: 0;
  width: 100%;
  .nav {
    width: 1200px;
    margin: 0 auto;
    left: 0;
    right: 0;
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }
  .menu {
    margin-top: 6px;
    h1 {
      margin-left: 30px;
      margin-right: 30px;
    }
  }
  .more {
    letter-spacing: -4px;
    margin-top: 20px;
    font-size: 24px;
    margin-right: 10px;
  }
  @media (max-width: 1200px) {
    .nav {
      width: 100%;
    }
  }
  @media (max-width: 900px) {
    .menu {
      display: none;
    }
  }
}
</style>
