<template>
  <section id="calendars">
    <span class="subtitle">Le calendrier</span>
    <article class="week_header">
      <h3 class="chgWeek" @click="changeWeek('-')">
        <img id="prec" src="../assets/imgs/play_white.svg" />
        Semaine précédente
      </h3>
      <h3 class="semaine_title" v-if="date">
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
        <section v-for="show in weeks[day.val]" v-bind:key="show.id" class="show">
          <u
            >De
            {{
              new Date(Number(show.starts_at)).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: timeZone,
              })
            }}
            à
            {{
              new Date(Number(show.ends_at)).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: timeZone,
              })
            }}:</u
          >
          <span> {{ show.name }} </span>
          <br />
          <span v-if="show.dj && show.dj.length"
            ><span class="side">Animee par</span> {{ show.dj }}</span
          ><br />
          <span class="side" v-if="show.redundancy"
            >Toutes les {{ show.redundancy == 1 ? "" : show.redundancy }} semaines</span
          >
          <span v-else class="side">Emission speciale</span><br />
          <div class="genreHld">
            <span class="genre side" v-for="genre in show.genres" v-bind:key="genre"
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
export default {
  name: "CalendarPage",
  data() {
    return {
      shows: [],
      days: [
        { val: "monday", title: "Lundi", id: 1 },
        { val: "tuesday", title: "Mardi", id: 2 },
        { val: "wednesday", title: "Mercredi", id: 3 },
        { val: "thursday", title: "Jeudi", id: 4 },
        { val: "friday", title: "Vendredi", id: 5 },
        { val: "saturday", title: "Samedi", id: 6 },
        { val: "sunday", title: "Dimanche", id: 0 },
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
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
  },
  methods: {
    async getCalendar() {
      this.dispatchShowsInWeek([]);
      const monday = this.date;
      const oneWeekFromMonday = new Date(monday.getTime() + 7 * 24 * 60 * 60 * 1000);
      this.shows = await this.getGoogleCalendar(monday, oneWeekFromMonday);
            if (!this.shows || !this.shows[0] || !this.shows[0].starts_at) {
        return;
      }
      const firstShowStart = new Date(Number(this.shows[0].starts_at)).getTime();
      if (monday.getTime() > firstShowStart || oneWeekFromMonday.getTime() < firstShowStart) {
        return;
      }
      this.dispatchShowsInWeek(this.shows);
    },
    dispatchShowsInWeek(shows) {
      this.weeks.monday = [];
      this.weeks.tuesday = [];
      this.weeks.wednesday = [];
      this.weeks.thursday = [];
      this.weeks.friday = [];
      this.weeks.saturday = [];
      this.weeks.sunday = [];
      for (let i = 0; i < shows.length; i++) {
        let e = new Date(Number(shows[i].starts_at));
        const dayName = this.days.find((d) => d.id === e.getDay()).val;
        this.weeks[dayName].push(shows[i]);
      }
    },
    async changeWeek(sign) {
      let date = new Date(this.date);
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
      let ret = new Date(curr.setDate(first));
      ret.setHours(12, 0, 0);       return ret;
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
    .semaine_title {
      font-family: ZestBold;
    }
    .chgWeek {
      padding: 5px 10px 2px 10px;
      background-color: #ffffff2e;
      cursor: pointer;
      font-size: 15px;
      font-family: ZestMedium;
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
      font-family: ZestBold;
      .show {
        padding: 5px 10px 1px 0px;
        margin-top: 15px;
        u {
          font-family: ZestMedium;
        }
        .side {
          letter-spacing: -1px;
        }
        .genreHld {
          .genre {
            font-family: ZestMedium;
            position: relative;
            top: 4px;
            font-size: 15px;
            margin-right: 10px;
            background-color: #00000020;
            padding: 5px 10px 2px 10px;
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
      font-family: ZestBold;
    }
    .week {
      width: 630px;
      .day {
        .show {
          padding: 5px 0px 1px 0px;
          .genreHld {
            display: grid;
            grid-gap: 5px;
            .genre {
              margin-right: 0px;
            }
          }
        }
      }
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
