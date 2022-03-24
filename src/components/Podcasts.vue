<template>
  <main>
    <span class="subtitle">Tous les podcasts</span>
    <div id="podcasts"></div>
    <section class="flex">
      <div>
        <section id="podcasts">
          <WidgetPodcast
            v-for="pod in podcasts"
            v-bind:key="pod.key"
            :pod="pod"
          />
        </section>
        <section class="flex">
          <input
            class="input"
            placeholder="Recherche"
            type="text"
            v-model="search"
            v-on:keyup.enter="send_req"
          />
          <div class="more" @click="getPodcasts">
            <span class="subtitle">En voir plus</span>
            <img src="../assets/imgs/play_white.svg" width="30" />
          </div>
        </section>
      </div>
    </section>
  </main>
</template>
<script>
import axios from "axios";
import WidgetPodcast from "./WidgetPodcast.vue";
export default {
  name: "Index",
  components: {
    WidgetPodcast
  },
  data() {
    return {
      search: "",
      podcasts: [],
      next: "",
      more: true,
      offset: 0
    };
  },
  methods: {
    send_req() {
      alert(this.search);
    },
    async getPodcasts() {
            if (!this.more) return;
      await axios
        .get(this.next)
        .then(res => {
          if (res.data.next_href === null) this.more = false;
          this.podcasts = this.podcasts.concat(res.data.collection);
          this.offset = res.data.next_href.substring(
            res.data.next_href.indexOf("?offset") + 8
          );
          this.offset = this.offset.split("&")[0];
          this.next = `${this.$config.VUE_APP_API}/sounds/${this.offset}`;
        })
        .catch();
    }
  },
  async mounted() {
    this.next = `${this.$config.VUE_APP_API}/sounds/${
      this.offset
    }?t=${new Date().getTime()}`;
    await this.getPodcasts();
    await this.getPodcasts();
  }
};
</script>
<style lang="less" scoped>
main {
  width: 100%;
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
    background-color: #00000080;
    position: relative;
    height: 34px;
    padding: 8px 5px 0px 20px;
    margin-top: 8px;
    cursor: pointer;
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
  #podcasts {
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(auto, auto);
  }
  .flex {
    display: flex;
    justify-content: space-between;
  }
}
</style>
