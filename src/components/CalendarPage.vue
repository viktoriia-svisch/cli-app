<template>
  <section id="calendars">
    <span class="subtitle">Le calendrier</span>
    <h3>Cette semaine</h3>
    <section class="week">
      <div class="day" v-for="day in days" v-bind:key="day.val">
        {{ day.title }}
        <section
          v-for="show in weeks[day.val]"
          v-bind:key="show.id"
          class="show"
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
            ><router-link :to="{ path: '/search/' + genre }">{{
              genre
            }}</router-link></span
          >
        </section>
      </div>
    </section>
  </section>
</template>
<script>
import graph from "@/graphaxios";
export default {
  name: "CalendarPage",
  data() {
    return {
      shows: [],
      days: [
        { val: "monday", title: "Lundi" },
        { val: "tuesday", title: "Mardi" },
        { val: "wednesday", title: "Mercredi" },
        { val: "thursday", title: "Jeudi" },
        { val: "friday", title: "Vendredi" },
        { val: "saturday", title: "Samedi" },
        { val: "sunday", title: "Dimanche" }
      ],
      weeks: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      }
    };
  },
  methods: {
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
        let e = new Date(Number(res.Shows[i].starts_at) - DST);
        switch (e.getDay()) {
          case 0:
            this.weeks.sunday.push(res.Shows[i]);
            break;
          case 1:
            this.weeks.monday.push(res.Shows[i]);
            break;
          case 2:
            this.weeks.tuesday.push(res.Shows[i]);
            break;
          case 3:
            this.weeks.wednesday.push(res.Shows[i]);
            break;
          case 4:
            this.weeks.thursday.push(res.Shows[i]);
            break;
          case 5:
            this.weeks.friday.push(res.Shows[i]);
            break;
          case 6:
            this.weeks.saturday.push(res.Shows[i]);
            break;
        }
      }
    }
  },
  async mounted() {
    let date = new Date().toISOString();
    date = date.slice(0, 10);
    await this.getCalendar(date);
  }
};
</script>
<style lang="less" scoped>
#calendars {
  .week {
    .day {
      padding: 0px 4px 4px 4px;
      margin-bottom: 10px;
      background-color: #ffffff40;
      .show {
        padding: 5px 10px 1px 10px;
        margin-top: 15px;
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
  }
}
</style>
