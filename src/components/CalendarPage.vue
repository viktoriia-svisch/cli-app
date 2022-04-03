<template>
  <section id="calendars">
    <Calendar v-if="week" />
  </section>
</template>
<script>
import Calendar
export default {
name: 'CalendarPage',
  components: {
    Calendar
  },
  data() {
    return {
      week: null
    }
  }
}
</script>
