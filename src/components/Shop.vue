<template>
  <section id="shop">
    <span class="subtitle">Notre merch</span>
    <div class="merch" v-for="obj in shop_data.data" v-bind:key="obj.url">
      <div id="img" :style="`background-image: url('${obj.img_url}')`"></div>
      <h3>{{ obj.name }}</h3>
    </div>
  </section>
</template>
<script>
import shopdata from "../assets/shop_data.js";
export default {
  name: "shop",
  data() {
    return {
      shop_data: shopdata,
    };
  },
};
</script>
<style lang="less" scoped>
#shop {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  width: 100%;
  .merch {
    margin: 10px;
    padding: 10px;
    background-color: #ffffff15;
    &:hover {
      background-color: #ffffff40;
      cursor: pointer;
    }
    #img {
      width: 100%;
      height: 150px;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  @media (max-width: 1150px) {
  }
  @media (max-width: 800px) {
  }
}
</style>
