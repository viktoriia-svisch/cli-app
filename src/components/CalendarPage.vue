<template>
  <section id="cal">
    <h1 id="title">Le Calendrier des emissions</h1>
    <div v-if="week && weekafter" id="pick">
      <span
        :class="selected == 'week' ? 'selected' : ''"
        @click="selected = 'week'"
        >Semaine du
        {{
          `${week.getDate()}/${week.getMonth() + 1}/${week.getFullYear()}`
        }}</span
      >
      <span
        :class="selected == 'weekafter' ? 'selected' : ''"
        @click="selected = 'weekafter'"
        >Semaine du
        {{
          `${weekafter.getDate()}/${weekafter.getMonth() +
            1}/${weekafter.getFullYear()}`
        }}</span
      >
    </div>
    <Calendar v-if="week && selected == 'week'" :week="week" />
    <Calendar v-if="weekafter && selected == 'weekafter'" :week="weekafter" />
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
      weekafter: null,
      selected: "week"
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
  #pick {
    margin: 0 auto;
    width: intrinsic; 
    width: -moz-max-content; 
    width: -webkit-max-content; 
    border: 3px solid white;
    span {
      padding: 10px 8px;
      cursor: pointer;
      font-weight: bold;
    }
    .selected {
      background-color: white;
      color: black;
    }
  }
}
</style>
