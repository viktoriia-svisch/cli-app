<template>
  <section
    :class="`${e.description.length ? 'e_trig ' : ''}event`"
    @click="switchDesc()"
  >
    <article class="e_body">
      <section class="e_title">
        <img :src="e.image" class="e_logo" />
      </section>
      <ul>
        <li class="right">
          <h1>{{ e.name }}</h1>
        </li>
        <li class="right">
          <p class="date">
            {{
              new Date(Number(e.starts_at)).toLocaleDateString("fr", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              })
            }}
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
        <li class="right" v-if="e.facebook.length">
          <a :href="e.facebook" target="_blank">facebook</a>
        </li>
        <li v-if="e.genres.length" class="right">
          <span v-for="g in e.genres" v-bind:key="g">{{ g }}</span>
        </li>
      </ul>
    </article>
    <span v-if="!desc && e.description.length" class="more">Plus d'infos</span>
    <h4 v-if="desc && e.description.length">
      <u>Plus d'infos:</u><br />
      <br />{{ e.description }}
    </h4>
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
  }
}
.event {
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 10px auto;
  border: 1px solid #313131;
  padding: 5px;
  h1 {
    font-size: 34px;
    text-decoration: underline;
    color: white;
    background-color: black;
    font-family: Bison;
    margin: 0;
    padding-left: 5px;
    padding-right: 5px;
  }
  ul {
    list-style-type: none;
    font-family: SpaceMonoBold;
    padding-left: 0px;
    display: flex;
    flex-direction: column;
    margin-top: 0px;
    margin-bottom: 0px;
    .right {
      text-align: right;
      display: inline;
    }
    .date {
      display: initial;
      background-image: linear-gradient(to right, #9b0000, #200);
    }
    li {
      display: table;
      margin-bottom: 3px;
      a,
      span,
      p {
        background-color: black;
        color: white;
        margin: 0px 0px 0px 5px;
        padding-left: 5px;
        padding-right: 5px;
      }
      a,
      span {
        background-image: linear-gradient(to right, #3c3c4d, black);
      }
    }
  }
  .e_body {
    display: flex;
    justify-content: space-between;
    .e_title {
      display: flex;
      .e_logo {
        width: 400px;
      }
    }
  }
  .more {
    background-color: #2d2d2d;
    font-weight: bold;
    padding: 2px 3px 2px 3px;
    position: absolute;
    font-size: 15px;
    right: 0px;
    bottom: 0px;
  }
  h4 {
    margin: 5px;
    white-space: pre-line;
  }
  @media (max-width: 800px) {
    width: initial;
    .e_body {
      flex-direction: column;
      .e_title {
        .e_logo {
          width: 100%;
        }
      }
    }
    ul {
      .right {
        text-align: left;
      }
    }
  }
}
</style>
