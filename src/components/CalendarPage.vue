<template>
  <section id="cal" v-if="$parent.print_shows">
    <h1 id="title">Le Calendrier des emissions</h1>
    <Calendar v-if="week" :week="week" />
    <Calendar v-if="weekafter" :week="weekafter" />
  </section>
</template>
<script>
import Calendar from "./Calendar.vue";
export default {
  name: "CalendarPage",
  components: {
    Calendar
  },
  data() {
    return {
      week: null,
      weekafter: null
    };
  },
  methods: {
    getMonday(date) {
      const day = date.getDay();
      const diff = date.getDate() - day + (day == 0 ? -6 : 1);
      return new Date(date.setDate(diff));
    },
    getNextMonday(date) {
      const day = date.getDay();
      const diff = date.getDate() - day + (day == 0 ? 1 : 7);
      return new Date(date.setDate(diff));
    }
  },
  mounted() {
    let d = new Date();
    this.week = this.getMonday(d);
    d = new Date();
    this.weekafter = this.getNextMonday(d);
  }
};
</script>
<style lang="less" scoped>
#cal {
  #title {
    font-size: 40px;
    font-family: Bison;
  }
}
</style>
