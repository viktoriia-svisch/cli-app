<template>
  <main>
    <article id="content">
      <section>
        <span class="subtitle">Derniers podcasts</span>
        <div id="podcasts"></div>
        <section class="flex">
          <div>
            <section id="podcasts">
              <WidgetPodcast v-for="pod in podcasts" v-bind:key="pod.key"
              :pod="pod"/>
            </section>
            <input
              class="input"
              placeholder="Recherche"
              type="text"
              v-model="search"
              v-on:keyup.enter="send_req"
            />
          </div>
          <span class="subtitle"
            >Tout afficher <img src="../assets/imgs/play_white.svg"
          /></span>
        </section>
      </section>
      <section>droite</section>
    </article>
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
        })
        .catch();
    }
  },
  mounted() {
    this.next = `${this.$config.VUE_APP_API}/sounds/${
      this.offset
    }?t=${new Date().getTime()}`;
    this.getPodcasts();
  }
};
</script>
<style lang="less" scoped>
main {
  .input {
    width: 100%;
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
  #content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
}
</style>
