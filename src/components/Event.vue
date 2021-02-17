<template>
  <section class="ev_h">
    <h1 id="title">{{ e.name }}</h1>
    <article id="event" v-if="e.starts_at">
      <header>
        <ul>
          <li>
            <p class="time">
              {{ new Date(Number(e.starts_at)).toLocaleDateString('fr', {}) }}
            </p>
            <p class="time">
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
          <li>
            <h4>{{ e.description }}</h4>
          </li>
          <li v-if="e.facebook">
            <a :href="e.facebook" target="_blank">facebook</a>
          </li>
          <li v-if="e.genres.length" class="right">
            <span v-for="g in e.genres" v-bind:key="g">{{ g }}</span>
          </li>
        </ul>
      </header>
      <section class="e_body">
        <a :href="e.image" target="_blank">
          <img :src="e.image" class="e_img" />
          <img :src="e.image" class="e_img notmob" />
          <img :src="e.image" class="e_img notmob" />
        </a>
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
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  #title {
    font-family: Bison;
    font-size: 40px;
  }
  #event {
    display: flex;
    flex-flow: column;
    header {
      margin-left: 20px;
      ul {
        list-style-type: none;
        margin: 0px;
        padding: 0px;
        .right {
          float: right;
          margin-right: 20px;
          span {
            margin-left: 10px;
            padding: 3px;
            font-family: SpaceMonoBold;
            color: black;
            background-color: white;
            cursor: pointer;
            &:hover {
              color: white;
              background-color: black;
            }
          }
        }
        li {
          .time {
            font-size: 20px;
            font-family: SpaceMonoBold;
            color: black;
            background-color: white;
            padding: 0px 3px 0px 3px;
            display: inline;
            margin-right: 10px;
          }
          a {
            padding: 3px;
            color: #4040e0;
            background-color: white;
            font-family: SpaceMonoBold;
            text-decoration: none;
          }
        }
      }
    }
    .e_body {
      margin-top: 20px;
      .e_img {
        width: 33.33%;
      }
    }
  }
  @media (max-width: 450px) {
    #event {
      .e_body {
        .e_img {
          width: 100%;
        }
        .notmob {
          display: none;
        }
      }
    }
  }
}
</style>
