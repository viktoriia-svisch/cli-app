<template>
  <section
    :class="`${e.description.length ? 'e_trig ' : ''}event`"
    @click="switchDesc()"
  >
    <article class="e_body">
      <section class="e_title">
        <div class="e_img" :style="`background-image: url(${e.image})`"></div>
        <h1>{{ e.name }}</h1>
      </section>
      <ul>
        <li>
          <p>
            {{ new Date(Number(e.starts_at)).toLocaleDateString("fr", {}) }}
            {{
              new Date(Number(e.starts_at)).toLocaleTimeString("fr", {
                hour: "2-digit",
                minute: "2-digit"
              })
            }}
            &rarr;
            {{
              new Date(Number(e.ends_at)).toLocaleTimeString("fr", {
                hour: "2-digit",
                minute: "2-digit"
              })
            }}
          </p>
        </li>
        <li v-if="e.facebook.length">
          <a :href="e.facebook" target="_blank">facebook</a>
        </li>
        <li v-if="e.genres.length" class="right">
          <span v-for="g in e.genres" v-bind:key="g">{{ g }}</span>
        </li>
      </ul>
    </article>
    <h4 v-if="desc && e.description.length">{{ e.description }}</h4>
  </section>
</template>
<script>
import graph from "@/graphaxios";
export default {
  name: "Event",
  props: ["e"],
  data() {
    return {
      desc: false
    };
  },
  methods: {
    switchDesc() {
      if (!this.desc) this.desc = true;
      else this.desc = false;
    }
  }
};
</script>
<style lang="less" scoped>
.e_trig {
  cursor: pointer;
  &:hover {
    border: 1px solid #fff;
    h1 {
      background-color: white;
      color: black;
    }
  }
}
.event {
  width: 100%;
  margin: 10px;
  border: 1px solid #ffffff80;
  h1 {
    font-size: 34px;
    text-decoration: underline;
    color: white;
    background-color: black;
    font-family: Bison;
    margin: 0;
    padding-left: 5px;
    padding-right: 5px;
    display: table;
  }
  ul {
    list-style-type: none;
    font-family: SpaceMonoBold;
    padding-left: 0px;
    display: flex;
    flex-direction: column;
    margin-top: 9px;
    margin-bottom: 0px;
    .right {
      text-align: right;
      display: inline;
      margin-top: 4px;
    }
    li {
      display: table;
      margin-bottom: 3px;
      a,
      span,
      p {
        background-color: black;
        color: white;
        background-image: linear-gradient(to right, #3c3c4d, black);
        margin: 0;
        padding-left: 5px;
        padding-right: 5px;
      }
      span {
        margin-left: 5px;
      }
    }
  }
  .e_body {
    display: flex;
    justify-content: space-between;
    .e_title {
      display: flex;
      .e_img {
        height: 151px;
        width: 110px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
  }
  h4 {
    margin: 5px;
  }
}
</style>
