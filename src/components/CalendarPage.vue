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
    <Calendar
      :style="`display: ${selected == 'week' ? 'initial' : 'none'}`"
      v-if="week"
      :week="week"
    />
    <Calendar
      :style="`display: ${selected == 'week' ? 'none' : 'initial'}`"
      v-if="weekafter"
      :week="weekafter"
    />
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
    getMonday() {
      let date = new Date();
      const day = date.getDay();
      const diff = date.getDate() - day + (day == 0 ? -6 : 1);
      return new Date(date.setDate(diff));
    },
    getNextMonday() {
      let today = getMonday();
      let nextweek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 7
      );
      return nextweek;
    }
  },
  mounted() {
    this.week = this.getMonday();
    this.weekafter = this.getNextMonday();
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
  @media (max-width: 500px) {
    #pick {
      width: inherit;
      display: flex;
      flex-direction: column;
      span {
        font-size: 14px;
      }
    }
  }
}
</style>
