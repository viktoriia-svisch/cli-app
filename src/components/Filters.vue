<template>
  <article>
    <input
      class="input"
      placeholder="Recherche"
      type="text"
      v-model="search"
      v-on:keyup.enter="sendQuery"
    />
    <section id="filters">
      <span>
        filtres:
      </span>
      <span class="filter" @click="pushQuery('selecta')">selecta</span>
      <span class="filter" @click="pushQuery('ambient')">ambient</span>
      <span class="filter" @click="pushQuery('house')">house</span>
      <span class="filter" @click="pushQuery('rap')">rap</span>
      <span class="filter" @click="pushQuery('dnb')">dnb</span>
    </section>
  </article>
</template>
<script>
export default {
  name: "Filters",
  data() {
    return {
      search: "",
    };
  },
  methods: {
    pushQuery(filter) {
      this.search = filter;
      this.sendQuery();
    },
    sendQuery() {
      this.$router.push({ path: `/search/${this.search}` });
    },
  },
};
</script>
<style lang="less" scoped>
article {
  color: white;
  .input {
    max-width: 500px;
    padding: 10px 20px;
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
    background-position: right 10px top 3px;
  }
  #filters {
    margin: 5px 0px 13px 0px;
    .filter {
      margin-right: 10px;
      position: relative;
      padding: 2px 4px 2px 20px;
      cursor: pointer;
      background-color: #ffffff40;
    }
    .filter::before {
      content: "";
      position: absolute;
      top: 8px;
      left: 5px;
      width: 8px;
      height: 8px;
      background-image: url("../assets/imgs/square.png");
    }
  }
}
</style>
