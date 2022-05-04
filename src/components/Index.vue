<template>
  <main>
    <span class="subtitle">Les derniers podcasts</span>
    <PodcastList :pods="podcasts" />
    <section class="flex">
      <input
        class="input"
        placeholder="Recherche"
        type="text"
        v-model="search"
        v-on:keyup.enter="sendQuery"
      />
      <div class="more" @click="$router.push({ path: '/podcasts' })">
        <span class="subtitle">En voir plus</span>
        <img src="../assets/imgs/play_white.svg" width="30" />
      </div>
    </section>
  </main>
</template>
<script>
import axios from "axios";
import PodcastList from "./PodcastList.vue";
export default {
  name: "Index",
  components: {
    PodcastList
  },
  data() {
    return {
      search: "",
      podcasts: [],
      next: "",
      more: true
    };
  },
  methods: {
    sendQuery() {
      this.$router.push({ path: `/search/${this.search}` });
    },
    async getPodcasts() {
            if (!this.more) return;
      await axios
        .get(this.next)
        .then(res => {
          if (res.data.next_href === null) this.more = false;
          this.podcasts = this.podcasts.concat(res.data.collection);
        })
        .catch();
    }
  },
  async mounted() {
    this.next = `${
      this.$config.VUE_APP_API
    }/sounds/0?t=${new Date().getTime()}`;
    await this.getPodcasts();
  }
};
</script>
<style lang="less" scoped>
main {
  .input {
    max-width: 500px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    font-family: KionaBold;
    border-radius: 0px;
    border: 0px;
    color: white;
    background-color: #ffffff40;
    background-image: url("../assets/imgs/play_white.svg");
    background-repeat: no-repeat;
    background-size: 30px 30px;
    background-position: right 10px top 6px;
  }
  .more {
    max-width: 475px;
    background-color: #00000040;
    position: relative;
    height: 34px;
    padding: 5px 5px 0px 20px;
    margin-top: 5px;
    cursor: pointer;
    &:hover {
      background-color: #00000080;
    }
    span {
      margin-right: 40px;
    }
    img {
      width: 30px;
      position: absolute;
      top: 5px;
      right: 5px;
    }
  }
  @media (max-width: 1000px) {
    .flex {
      flex-direction: column;
    }
  }
}
</style>
