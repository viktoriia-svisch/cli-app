ce<template>
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
        placeholder="tag example: acid, house, reggae"
        :disabled="disabled"
      />
    </header>
    <section id="podcasts">
      <Podcast v-for="pod in shows" v-bind:key="pod.key" :pod="pod" />
    </section>
  </section>
</template>
<script>
import axios from 'axios';
import Podcast from '@/components/Podcast_Widget';
export default {
  name: 'Search',
  components: {
    Podcast,
  },
  data() {
    return {
      searchQuery: '',
      disabled: false,
      shows: [],
      next: 'https:    };
  },
  methods: {
    async getGenre() {
      this.disabled = true;
      this.shows = [];
      const reg = new RegExp(this.searchQuery, 'gmi');
      const res = await axios.get(this.next);
      this.disabled = false;
      for (let i = 0; i < 100; i++) {
        for (let j = 0; j < res.data.data[i].tags.length; j++)
          if (res.data.data[i].tags[j].name.match(reg)) {
            this.shows = this.shows.concat(res.data.data[i]);
            break;
          }
      }
    },
  },
};
</script>
<style lang="less" scoped>
#search {
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
      width: ~'calc(100% - 230px)';
    }
    svg {
      fill: white;
      height: 38px;
      width: 38px;
    }
  }
  #podcasts {
    display: flex;
    flex-flow: wrap;
    width: 100%;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
