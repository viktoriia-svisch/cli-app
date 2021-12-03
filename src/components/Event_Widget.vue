<template>
  <section class="event" @click="getEvent(e.id)">
    <header>
      <h1>{{ e.name }}</h1>
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
    </header>
    <article class="e_body">
      <div class="e_img" :style="`background-image: url(${e.image})`"></div>
    </article>
  </section>
</template>
<script>
import graph from "@/graphaxios";
export default {
  name: "Event",
  props: ["e"],
  methods: {
    getEvent(id) {
      this.$router.push({ path: `/events/${id}` });
    }
  }
};
</script>
<style lang="less" scoped>
.event {
  width: 100%;
  max-width: 400px;
  margin: 10px;
  border: 1px solid #ffffff80;
  cursor: pointer;
  &:hover {
    border: 1px solid white;
    header {
      background-color: white;
      border-bottom: 1px solid white;
      h1 {
        color: white;
        background-color: black;
      }
      ul {
        li {
          a,
          p,
          span {
            background-color: black;
            color: white;
          }
        }
      }
    }
  }
  header {
    padding: 5px;
    border-bottom: 1px solid #ffffff80;
    h1 {
      font-size: 34px;
      color: black;
      background-color: white;
      font-family: Bison;
      margin: 0;
      padding-left: 5px;
      padding-right: 5px;
      display: inline;
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
          background-color: white;
          color: black;
          margin: 0;
          padding-left: 5px;
          padding-right: 5px;
        }
        span {
          margin-left: 5px;
        }
      }
    }
  }
  .e_body {
    .e_img {
      height: 451px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
}
</style>
