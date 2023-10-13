<template>
  <section id="tim">
    <span class="subtitle">Le programme du jour</span>
    <article id="shows">
      <section v-for="show in today_shows" v-bind:key="show.id" class="show">
        <span class="side">
          <u
            >De {{ enhanceDate(show.starts_at) }} à {{ enhanceDate(show.ends_at) }}:</u
          ></span
        >
        <span class="show_name"> {{ show.name }}</span
        ><br />
        <span v-if="show.dj.length"
          ><span class="side">Animee par </span>
          <span class="artist_name">{{ show.dj }}</span></span
        ><br />
        <span class="side" v-if="show.redundancy"
          >Toutes les {{ show.redundancy == 1 ? "" : show.redundancy }} semaines</span
        >
        <span v-else class="side">Emission speciale</span><br />
        <span class="genre side" v-for="genre in show.genres" v-bind:key="genre"
          ><router-link :to="{ path: '/search/' + genre }">{{ genre }}</router-link></span
        >
      </section>
    </article>
  </section>
</template>
<script>
export default {
  name: "TimeTable",
  data() {
    return {
      today_shows: [],
    };
  },
  methods: {
    enhanceDate(ts) {
      return new Date(Number(ts)).toLocaleTimeString("fr-FR", {
        hour: "2-digit",
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });
    },
    async getCalendar(date) {
      const oneDayFromDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      this.today_shows = await this.getGoogleCalendar(date, oneDayFromDate);
      this.$parent.$parent.today_shows = this.today_shows;
    },
  },
  async mounted() {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    await this.getCalendar(date);
      },
};
</script>
<style lang="less" scoped>
#tim {
  color: white;
  width: 300px;
  #shows {
    margin-top: 17px;
    .show {
      padding: 5px 10px 8px 10px;
      margin-bottom: 8px;
      background-color: #2b2b2b3b;
      word-break: break-word;
      padding-bottom: 12px;
      .artist_name {
        font-family: ZestBold;
      }
      .show_name {
        font-family: ZestBold;
      }
      .side {
        font-family: ZestMedium;
        letter-spacing: -1px;
      }
      .genre {
        display: inline-block;
        margin-top: 5px;
        text-align: center;
        font-size: 15px;
        margin-right: 10px;
        background-color: #00000020;
        padding: 5px 10px 2px 10px;
        cursor: pointer;
        a {
          color: white;
          text-decoration: none;
        }
        &:hover {
          background-color: #00000080;
        }
      }
    }
  }
  @media (max-width: 815px) {
    max-width: initial;
    margin: 0;
    width: 100%;
  }
}
</style>
