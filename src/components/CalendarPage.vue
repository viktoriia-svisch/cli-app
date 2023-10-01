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
                minute: "2-digit",
                timeZone: "Europe/Paris",
              })
            }}
            à
            {{
              new Date(Number(show.ends_at)).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Europe/Paris",
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
const googleCalendarUrl =
  "https:const googleCalendarApiKey = "AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs";
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
      const now = new Date();
            this.weeks.monday = [];
      this.weeks.tuesday = [];
      this.weeks.wednesday = [];
      this.weeks.thursday = [];
      this.weeks.friday = [];
      this.weeks.saturday = [];
      this.weeks.sunday = [];
      this.shows = res.Shows.map((show) => {
        return {
          ...show,
          starts_at: new Date(Number(show.starts_at) + now.getTimezoneOffset() * 60000),
          ends_at: new Date(Number(show.ends_at) + now.getTimezoneOffset() * 60000),
        };
      });
      await this.getGoogleCalendar();
      this.dispatchShowsInWeek(this.shows);
    },
    async getGoogleCalendar() {
      const monday = this.date;
      const oneWeekFromMonday = new Date(monday.getTime() + 7 * 24 * 60 * 60 * 1000);
      const response = await fetch(
        `${googleCalendarUrl}?` +
          [
            "singleEvents=true",
            "timeZone=Europe%2FParis",
            "maxAttendees=1",
            "maxResults=250",
            "sanitizeHtml=true",
            "timeMin=" + monday.toISOString(),
            "timeMax=" + oneWeekFromMonday.toISOString(),
            "key=" + googleCalendarApiKey,
          ].join("&")
      );
      const body = await response.json();
      if (!body?.items) {
        return;
      }
      let shows = body.items.filter(
        (item) => item.summary && item.summary.toLowerCase().indexOf("#show") != -1
      );
      const parser = new DOMParser();
      shows = await Promise.all(
        shows.map(async (show) => {
          if (!show.description) {
            return;
          }
          const htmlDescription = parser.parseFromString(
            show.description.replace(/<br>/g, ""),
            "text/xml"
          );
          const info = htmlDescription.getElementsByTagName("li");
          if (!info) {
            return;
          }
          return {
            starts_at: new Date(show.start.dateTime).getTime().toString(),
            ends_at: new Date(show.end.dateTime).getTime().toString(),
            name: this.stripHtml(info, 0),
            dj: this.stripHtml(info, 1),
            redundancy: await this.getRecurrences(show.recurringEventId),
            genres:
              this.stripHtml(info, 2) &&
              this.stripHtml(info, 2).replace(/#/g, "").split(" "),
          };
        })
      );
      this.shows = this.shows.concat(shows);
    },
    stripHtml(infoHtml, index) {
      return (
        infoHtml[index] &&
        infoHtml[index].textContent &&
        infoHtml[index].textContent.trim()
      );
    },
    dispatchShowsInWeek(shows) {
      for (let i = 0; i < shows.length; i++) {
        let e = new Date(Number(shows[i].starts_at));
        const dayName = this.days.find((d) => d.id === e.getDay()).val;
        this.weeks[dayName].push(shows[i]);
      }
    },
    async getRecurrences(id) {
      if (!id) {
        return;
      }
      const response = await fetch(
        `${googleCalendarUrl}/${id}?` +
          ["sanitizeHtml=true", "key=" + googleCalendarApiKey].join("&")
      );
      const body = await response.json();
      if (
        !body?.recurrence ||
        !body.recurrence[0] ||
        body.recurrence[0].indexOf("RRULE:FREQ=WEEKLY") === -1
      ) {
        return;
      }
      const rules = body.recurrence[0].split(";");
      const interval = rules.find((r) => r.startsWith("INTERVAL="));
      if (!interval) {
        return 1;
      }
      return Number(interval.replace("INTERVAL=", ""));
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
