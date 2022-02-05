<template>
  <section id="search">
    <header>
      <svg
        xmlns="http:        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
      <span id="title">Recherche:</span>
      <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="getGenre"
        placeholder="tag example: acid, house, lundis"
        :disabled="disabled"
      />
    </header>
    <section id="podcasts">
      <Podcast
        v-for="pod in shows"
        v-bind:key="pod.key"
        :pod="pod"
        v-on:play_mix="play_mix"
      />
    </section>
    <section id="trackd"></section>
  </section>
</template>
<script>
import axios from "axios";
import Podcast from "@/components/Podcast_Widget";
export default {
  name: "Search",
  components: {
    Podcast
  },
  props: ["tag"],
  data() {
    return {
      searchQuery: "",
      disabled: false,
      shows: [],
      observer: null,
      offset: 0,
      base: `${process.env.VUE_APP_API}/sounds/0`,
      next: ""
    };
  },
  methods: {
    play_mix(id) {
      this.$emit("play_mix", id);
    },
    async getGenre() {
      this.next = this.base;
      this.shows = [];
      this.shows = await this.getGenreRec();
    },
    async getGenreRec() {
      this.observer.unobserve(this.$el.childNodes[4]);
      let result = [];
      if (this.searchQuery.length < 2 || !this.next) return result;
      this.disabled = true;
      const reg = new RegExp(this.searchQuery, "gmi");
      const res = await axios.get(this.next);
      this.disabled = false;
            if (res.data.next_href) {
        this.offset = res.data.next_href.substring(
          res.data.next_href.indexOf("?offset") + 8
        );
        this.offset = this.offset.split("&")[0];
        this.next = `${process.env.VUE_APP_API}/sounds/${this.offset}`;
      } else {
        this.next = null;
      }
            for (let i = 0; i < res.data.collection.length; i++) {
        if (
          res.data.collection[i].tag_list.match(reg) ||
          res.data.collection[i].title.match(reg) ||
          res.data.collection[i].genre.match(reg)
        ) {
          result = result.concat(res.data.collection[i]);
        }
      }
      this.observer.observe(this.$el.childNodes[4]);
      return result;
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(async entry => {
        if (!this.next) this.observer.unobserve(this.$el.childNodes[4]);
        else if (entry.isIntersecting) {
          this.shows = this.shows.concat(await this.getGenreRec());
        }
      });
    });
    if (localStorage.getItem("tag")) {
      this.searchQuery = localStorage.getItem("tag");
      localStorage.removeItem("tag");
      this.getGenre();
    }
  },
  destroyed() {
    this.observer.disconnect();
  }
};
</script>
<style lang="less" scoped>
#search {
  margin-top: 50px;
  header {
    position: relative;
    border-bottom: 2px solid white;
    #title {
      font-size: 40px;
      font-family: Bison;
      position: absolute;
      bottom: 0;
    }
    input {
      position: absolute;
      font-size: 20px;
      padding-left: 5px;
      padding-right: 5px;
      font-family: SpaceMonoBold;
      background-color: #545454;
      border: 4px solid #545454;
      color: #edffbc;
      left: 200px;
      bottom: 5px;
      width: ~"calc(100% - 230px)";
    }
    svg {
      fill: white;
      height: 38px;
      width: 38px;
    }
  }
  #podcasts {
    margin-top: 20px;
  }
  @media (max-width: 700px) {
    header {
      #title {
        font-size: 30px;
        padding-bottom: 8px;
      }
      input {
        left: 150px;
        width: ~"calc(100% - 190px)";
      }
    }
  }
  @media (max-width: 400px) {
    header {
      #title {
        font-size: 0px;
      }
      input {
        left: 40px;
        width: ~"calc(100% - 70px)";
      }
    }
  }
}
</style>
