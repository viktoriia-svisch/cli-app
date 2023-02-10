<template>
  <article>
    <input
      class="input"
      placeholder="Recherche"
      type="text"
      v-model="search"
      v-on:keyup.enter="sendQuery"
    />
    <p id="filters">
      <span class="filter_head">
        filtres - 
      </span>
      <span class="filter" @click="pushQuery('selecta')">selecta</span>
      <span class="filter" @click="pushQuery('ambient')">ambient</span>
      <span class="filter" @click="pushQuery('house')">house</span>
      <span class="filter" @click="pushQuery('rap')">rap</span>
      <span class="filter" @click="pushQuery('talk')">talk</span>
    </p>
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
      this.$router.push({ path: `/search/${this.search}` }).catch(()=>{});
    },
  },
  mounted() {
    this.search = this.$route.params.query;
  }
};
</script>
<style lang="less" scoped>
article {
  color: white;
  .input {
    width: 300px;
    max-width: 500px;
    padding: 10px 17px 6px 17px;
    margin: 8px 0;
    box-sizing: border-box;
    font-family: NexaBold;
    border-radius: 0px;
    border: 0px;
    color: white;
    background-color: #ffffff40;
  }
  #filters {
    margin: 15px 0px 13px 0px;
    display: flex;
    justify-content: space-between;
    .filter_head {
      position: relative;
      padding: 5px 4px 2px 5px;
    }
    .filter {
      position: relative;
      padding: 5px 4px 2px 5px;
      cursor: pointer;
      text-align: center;
      background-color: #ffffff40;
      width: 100px;
    }
    .filter::before {
      content: "";
      position: absolute;
      top: 8px;
      left: 10px;
      width: 8px;
      height: 8px;
    }
  }
  @media (max-width: 1100px) {
    #filters {
      display: grid;      
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 10px;
      grid-auto-rows: minmax(auto, auto);
    }
  }
  @media (max-width: 500px) {
    #filters {
      grid-template-columns: repeat(2, 1fr);
      .filter {
        width: initial;
      } 
    }
  }
  @media (max-width: 300px) {
    .input {
      width: 100%;
    }
  }
}
</style>
