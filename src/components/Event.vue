<template>
  <section class="ev_h">
    <h1 id="title">{{ e.name }}</h1>
    <article id="event">
      <header>
        <h4>{{ e.description }}</h4>
        <ul>
          <li>
            <p>
              {{ new Date(Number(e.starts_at)).toLocaleDateString('fr', {}) }}
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
          <li v-if="e.facebook">
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
    </article>
  </section>
</template>
<script>
import gql from 'graphql-tag';
export default {
  name: 'Events',
  data() {
    return {
      e: {
        name: '',
        genres: [],
      },
    };
  },
  async mounted() {
    await this.$apollo
      .query({
        query: gql`
          query Event($id: String!) {
            Event(id: $id) {
              name
              starts_at
              ends_at
              genres
              image
              facebook
              description
            }
          }
        `,
        variables: {
          id: this.$route.params.id,
        },
      })
      .then(res => {
        this.e = res.data.Event;
      })
      .catch(() => {
        this.$router.push({path: '/'});
      });
  },
};
</script>
<style lang="less" scoped>
.ev_h {
  #title {
    font-family: Bison;
    font-size: 44px;
  }
  #event {
    header {
      ul {
        list-style-type: none;
        margin: 0px;
        padding: 0px;
      }
    }
  }
}
</style>
