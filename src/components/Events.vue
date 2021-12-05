<template>
  <section id="events_h">
    <h1 id="title">Evenements a venir</h1>
    <article id="events">
      <Event v-for="e in events" v-bind:key="e.id" :e="e" />
    </article>
  </section>
</template>
<script>
import graph from "@/graphaxios";
import Event from "@/components/Event_Widget";
export default {
  name: "Events",
  components: {
    Event
  },
  data() {
    return {
      events: []
    };
  },
  methods: {
    getEvent(id) {
      this.$router.push({ path: `/events/${id}` });
    },
    async getEvents() {
      const res = await graph(
        "Events",
        `query Events { 
          Events {
            id
            name
            starts_at
            ends_at
            description
            genres
            image
            facebook
            __typename
          }
        }`,
        {}
      );
      this.events = res.Events;
    }
  },
  mounted() {
    this.getEvents();
  }
};
</script>
<style lang="less" scoped>
#events_h {
  #title {
    font-family: Bison;
    font-size: 40px;
  }
  #events {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
