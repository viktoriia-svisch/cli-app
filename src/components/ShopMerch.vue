<template>
  <section id="shop">
    <span v-if="found_merch" class="subtitle">Shop - {{ merch.name }}</span>
    <article v-if="found_merch">
      <img :src="merch.img_url" />
      <a target="_blank" :href="`https:        >{{ merch.price }} - Plus d'infos sur notre bandcamp</a
      >
    </article>
  </section>
</template>
<script>
import shopdata from "../assets/shop_data.js";
export default {
  name: "shop",
  data() {
    return {
      url: String,
      shop_data: shopdata,
      found_merch: false,
      merch: {
        url: String,
        name: String,
        img_url: String,
      },
    };
  },
  methods: {},
  mounted() {
    this.url = this.$router.currentRoute.path.slice(6);
    this.shop_data.data.some((entry) => {
      if (entry.url == this.url) {
        this.merch = { ...entry };
        this.found_merch = true;
        return;
      }
    });
    if (this.found_merch == false) {
      this.$router.push("/");
    }
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
  article {
    padding: 10px;
    background-color: #ffffff15;
    margin-top: 15px;
    img {
      width: 100%;
    }
    a {
      color: var(--color-text);
      text-align: center;
      display: block;
      margin: 10px 0px 10px 0px;
    }
  }
  @media (max-width: 1150px) {
  }
  @media (max-width: 800px) {
  }
}
</style>
