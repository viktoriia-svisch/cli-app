<template>
  <section id="shop">
    <h1 class="title title--mt-0">Notre merch</h1>
    <div class="merch" v-for="obj in shop_data.data" v-bind:key="obj.url">
      <div
        id="img"
        @click="toURL(`/shop/${obj.url}`)"
        :style="`background-image: url('${obj.img_url}')`"
      ></div>
      <h3 @click="toURL(`/shop/${obj.url}`)">{{ obj.name }}</h3>
    </div>
  </section>
</template>
<script>
import shopdata from "../../../assets/shop_data.js";
export default {
  name: "shop",
  data() {
    return {
      shop_data: shopdata,
    };
  },
  methods: {
    toURL(dest) {
      this.$router.push(dest);
    },
  },
};
</script>
<style lang="less" scoped>
#shop {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-text);
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
