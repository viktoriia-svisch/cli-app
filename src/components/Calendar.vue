<template>
  <section>
    <h1>Le Calendrier</h1>
    <h2>{{ week }}</h2>
    <h2>{{ weekafter }}</h2>
  </section>
</template>
<script>
export default {
  name: 'Calendar',
  data() {
    return {
      week: null,
      weekafter: null,
    };
  },
  methods: {
    getMonday(date) {
      const day = date.getDay();
      const diff = date.getDate() - day + (day == 0 ? -6: 1);
      return new Date(date.setDate(diff));
    },
    getNextMonday(date) {
      const day = date.getDay();
      const diff = date.getDate() - day + (day == 0 ? 1: 7);
      return new Date(date.setDate(diff));
    },
  },
  mounted() {
    this.week = new Date();
    this.getMonday(this.week); 
    this.weekafter = new Date();
    this.getNextMonday(this.weekafter); 
  }
};
</script>
<style lang="less" scoped>
</style>
