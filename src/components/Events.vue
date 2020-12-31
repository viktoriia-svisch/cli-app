<template>
  <section id="events_h">
    <h1 id="title">Evenements a venir</h1>
    <h2>{{ events }}</h2>
    <article id="events">
      <section class="event" v-for="e in events" v-bind:key="e.id">
        <header>
          <h1>
            {{ e.name }} {{ e.name }} {{ e.name }} {{ e.name }} {{ e.name }}
          </h1>
          <ul>
            <li>
              <p>
                {{
                  new Date(Number(e.starts_at)).toLocaleDateString('fr', {})
                }}
                {{
                  new Date(Number(e.starts_at)).toLocaleTimeString('fr', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                }}
                &rarr;
                {{
                  new Date(Number(e.ends_at)).toLocaleTimeString('fr', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                }}
              </p>
            </li>
            <li v-if="e.facebook.length">
              <a :href="e.facebook" target="_blank">facebook</a>
            </li>
            <li v-if="e.genres.length" class="right">
              <span v-for="g in e.genres">{{ g }}</span>
            </li>
          </ul>
        </header>
        <article class="e_body"><img :src="e.image" /></article>
      </section>
    </article>
  </section>
</template>
<script>
import gql from 'graphql-tag';
export default {
  name: 'Events',
  data() {
    return {
      events: [],
    };
  },
  methods: {
    async getEvents() {
      await this.$apollo
        .query({
          query: gql`
            query Events {
              Events {
                id
                name
                starts_at
                ends_at
                genres
                image
                facebook
              }
            }
          `,
        })
        .then(res => {
          this.events = res.data.Events;
        });
    },
  },
  mounted() {
    this.getEvents();
  },
};
</script>
<style lang="less" scoped>
#events_h {
  #title {
    font-family: Bison;
    font-size: 40px;
  }
  #events {
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    .event {
      width: 100%;
      max-width: 400px;
      margin: 10px;
      border: 1px solid white;
      cursor: pointer;
      header {
        padding: 5px;
        border-bottom: 1px solid white;
        h1 {
          font-size: 34px;
          color: black;
          background-color: white;
          font-family: Bison;
          margin: 0;
          padding-left: 5px;
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
        img {
          height: 300px;
        }
      }
    }
  }
}
</style>
