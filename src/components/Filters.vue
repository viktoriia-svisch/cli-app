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
      <span>
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
      this.$router.push({ path: `/search/${this.search}` });
    },
  },
};
</script>
<style lang="less" scoped>
article {
  color: white;
  .input {
    width: 300px;
    max-width: 500px;
    padding: 5px 17px 6px 17px;
    margin: 8px 0;
    box-sizing: border-box;
    font-family: KionaBold;
    border-radius: 0px;
    border: 0px;
    color: white;
    background-color: #ffffff40;
    background-image: url("../assets/imgs/play_white.svg");
    background-repeat: no-repeat;
    background-size: 16px 24px;
    background-position: right 10px top 2px;
  }
  #filters {
    margin: 15px 0px 13px 0px;
    display: flex;
    justify-content: space-between;
    .filter {
      position: relative;
      padding: 2px 4px 2px 20px;
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
      background-image: url("../assets/imgs/square.png");
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
