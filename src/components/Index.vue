<template>
  <main>
    <article id="content">
      <section>
        <span class="subtitle">Derniers podcasts</span>
        <div id="podcasts"></div>
        <section class="flex">
          <div>
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
export default {
  name: "Index",
  data() {
    return {
      search: ""
    };
  },
  methods: {
    send_req() {
      alert(this.search);
    }
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
