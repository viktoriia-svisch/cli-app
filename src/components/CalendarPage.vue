<template>
  <section id="calendars">
    <span class="subtitle">Le calendrier</span>
    <article class="week_header">
      <h3 class="chgWeek" @click="changeWeek('-')">
        <img id="prec" src="../assets/imgs/play_white.svg" />
        Semaine précédente
      </h3>
      <h3 v-if="date">
        Semaine du
        {{
          `${new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
          ).toLocaleDateString("fr-FR")}`
        }}
      </h3>
      <h3 class="chgWeek" @click="changeWeek('+')">
        Semaine suivante
        <img src="../assets/imgs/play_white.svg" />
      </h3>
    </article>
    <h3 v-if="date" class="mobile_week_title">
      Semaine du
      {{
        `${new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        ).toLocaleDateString("fr-FR")}`
      }}
    </h3>
    <article class="mobile_week_header">
      <h3 class="chgWeek" @click="changeWeek('-')">
        <img id="prec" src="../assets/imgs/play_white.svg" />
        Précédente
      </h3>
      <h3 class="chgWeek" @click="changeWeek('+')">
        Suivante
        <img src="../assets/imgs/play_white.svg" />
      </h3>
    </article>
    <section class="week" v-if="date">
      <div class="day" v-for="(day, k) in days" v-bind:key="day.val">
        {{ day.title }}
        {{
          `${new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + k
          ).toLocaleDateString("fr-FR")}`
        }}
        <section
          v-for="show in weeks[day.val]"
          v-bind:key="show.id"
          class="show"
        >
          <u
            >De
            {{
              new Date(Number(show.starts_at)).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                timeZone: "UTC",
              })
            }}
            à
            {{
              new Date(Number(show.ends_at)).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                timeZone: "UTC",
              })
            }}:</u
          >
          <span> {{ show.name }} </span>
          <br />
          <span v-if="show.dj.length"
            ><span class="side">Animee par</span> {{ show.dj }}</span
          ><br />
          <span class="side" v-if="show.redundancy"
            >Toutes les
            {{ show.redundancy == 1 ? "" : show.redundancy }} semaines</span
          >
          <span v-else class="side">Emission speciale</span><br />
          <div class="genreHld">
            <span
              class="genre side"
              v-for="genre in show.genres"
              v-bind:key="genre"
              ><router-link :to="{ path: '/search/' + genre }">{{
                genre
              }}</router-link></span
            >
          </div>
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
        { val: "sunday", title: "Dimanche" },
      ],
      weeks: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      },
      week: String,
      date: null,
    };
  },
  methods: {
    async getCalendar() {
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
        { start: this.week }
      );
            this.weeks.monday = [];
      this.weeks.tuesday = [];
      this.weeks.wednesday = [];
      this.weeks.thursday = [];
      this.weeks.friday = [];
      this.weeks.saturday = [];
      this.weeks.sunday = [];
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
    },
    async changeWeek(sign) {
      let date = new Date(this.week);
      if (sign == "+") {
        date.setDate(date.getDate() + 7);
      } else {
        date.setDate(date.getDate() - 7);
      }
      this.date = date;
      date = date.toISOString();
      this.week = date.slice(0, 10);
      await this.getCalendar();
    },
    getMonday() {
      const curr = new Date();
      const first = curr.getDate() - curr.getDay() + 1;
      return new Date(curr.setDate(first));
    },
  },
  async mounted() {
    this.date = this.getMonday();
    this.week = this.date.toISOString();
    this.week = this.week.slice(0, 10);
    await this.getCalendar();
  },
};
</script>
<style lang="less" scoped>
#calendars {
  color: white;
  .week_header,
  .mobile_week_header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .chgWeek {
      padding: 5px 4px 2px 4px;
      background-color: #ffffff2e;
      cursor: pointer;
      font-size: 15px;
      img {
        position: relative;
        top: 2px;
        width: 15px;
      }
      #prec {
        -webkit-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        transform: rotate(180deg);
      }
    }
  }
  .mobile_week_header,
  .mobile_week_title {
    display: none;
  }
  .week {
    width: 830px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(auto, auto);
    .day {
      padding: 10px 4px 20px 4px;
      background-color: #ffffff40;
      .show {
        padding: 5px 10px 1px 0px;
        margin-top: 15px;
        .side {
          font-family: Kiona;
          letter-spacing: -1px;
        }
        .genreHld {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 10px;
          grid-auto-rows: minmax(auto, auto);
          .genre {
            position: relative;
            top: 4px;
            font-size: 15px;
            margin-right: 10px;
            background-color: #00000020;
            padding: 0px 4px 2px 4px;
            cursor: pointer;
            text-align: center;
            padding-top: 5px;
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
  @media (max-width: 1200px) {
    .week_header {
      display: none;
    }
    .mobile_week_header,
    .mobile_week_title {
      display: flex;
    }
    .week {
      width: 630px;
    }
  }
  @media (max-width: 1000px) {
    .week {
      width: initial;
      grid-template-columns: repeat(1, 1fr);
    }
  }
}
</style>
