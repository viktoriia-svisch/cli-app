<template>
  <section id="tim">
    <span class="subtitle">Le programme du jour</span>
    <article id="shows">
      <section v-for="show in today_shows" v-bind:key="show.id" class="show">
        <span class="side">
          <u
            >De {{ enhanceDate(show.starts_at) }} à
            {{ enhanceDate(show.ends_at) }}</u
          ></span
        >
        <span> {{ show.name }}</span
        ><br />
        <span v-if="show.dj.length"
          ><span class="side">Animee par</span> {{ show.dj }}</span
        ><br />
        <span class="side" v-if="show.redundancy"
          >Toutes les
          {{ show.redundancy == 1 ? "" : show.redundancy }} semaines</span
        >
        <span v-else class="side">Emission speciale</span><br />
        <span
          class="genre side"
          v-for="genre in show.genres"
          v-bind:key="genre"
          >{{ genre }}</span
        >
      </section>
    </article>
  </section>
</template>
<script>
import graph from "@/graphaxios";
export default {
  name: "TimeTable",
  data() {
    return {
      shows: [],
      today_shows: []
    };
  },
  methods: {
    enhanceDate(ts) {
      return new Date(Number(ts)).toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC"
      });
    },
    async getCalendar(date) {
      const res = await graph(
        this.$config,
        "Shows",
        `query Shows($start: String!) {
          Shows(start: $start) {
            id
            name
            starts_at
            ends_at
            redundancy
            genres
            dj
          }
        }`,
        { start: date }
      );
      this.shows = res.Shows;
      for (let i = 0; i < res.Shows.length; i++) {
        let DST = new Date().getTimezoneOffset() == -60 ? 3600000 : 7200000;
        let show_date = new Date(Number(res.Shows[i].starts_at) - DST);
        let today_day = new Date().getDay();
        if (show_date.getDay() == today_day) {
          this.today_shows.push(res.Shows[i]);
        }
      }
    }
  },
  async mounted() {
    let date = new Date().toISOString();
    date = date.slice(0, 10);
    console.log(date);
    await this.getCalendar(date);
      }
};
</script>
<style lang="less" scoped>
#tim {
  color: white;
  #shows {
    .show {
      padding: 5px 10px 1px 10px;
      margin-top: 15px;
      margin-bottom: 15px;
      background-color: #2b2b2b3b;
      .side {
        font-family: Kiona;
        letter-spacing: -1px;
      }
      .genre {
        font-size: 15px;
        margin-right: 10px;
        background-color: #00000020;
        padding: 2px 4px 2px 4px;
        cursor: pointer;
        &:hover {
          background-color: #00000080;
        }
      }
    }
  }
}
@media (max-width: 1000px) {
  #shows {
    .show {
      margin-bottom: 0px;
    }
  }
}
</style>
