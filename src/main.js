import Vue from "vue";
import VueChatScroll from "vue-chat-scroll";
import VueSocket from "vue-socket.io";
import App from "./App.vue";
import router from "./router";
Vue.config.productionTip = false;
fetch(process.env.BASE_URL + "config.json").then(res => {
  res.json().then(config => {
    Vue.prototype.$config = config;
    Vue.use(VueChatScroll);
    Vue.use(
      new VueSocket({
        connection: config.VUE_APP_CHAT
      })
    );
    new Vue({
      render: h => h(App),
      router
    }).$mount("#app");
  });
});
const googleCalendarUrl =
  "https:
const googleCalendarApiKey = "AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs";
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
Vue.mixin({
  methods: {
    stripHtml(infoHtml, index) {
      return (
        infoHtml[index] &&
        infoHtml[index].textContent &&
        infoHtml[index].textContent.trim()
      );
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
    async getGoogleCalendar(dateStart, dateEnd) {
      const response = await fetch(
        `${googleCalendarUrl}?` +
        [
          "singleEvents=true",
          "timeZone=" + timeZone,
          "maxAttendees=1",
          "maxResults=250",
          "sanitizeHtml=true",
          "timeMin=" + dateStart.toISOString(),
          "timeMax=" + dateEnd.toISOString(),
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
      shows.sort((showA, showB) => {
        return Number(showA.starts_at) - Number(showB.starts_at);
      });
      return shows;
    }
  },
})
