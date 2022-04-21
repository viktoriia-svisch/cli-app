<template>
  <section id="calendars">
    <div class="day" v-for="i in 30" v-bind:key="i">{{ i }}</div>
  </section>
</template>
<script>
export default {
  name: "CalendarPage",
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
#calendars {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(auto, auto);
  color: white;
  .day {
    background-color: #00000020;
  }
}
</style>
