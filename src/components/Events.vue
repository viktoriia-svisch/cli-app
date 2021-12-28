<template>
  <section id="events_h">
    <h1 id="title">Evenements a venir</h1>
    <article id="events">
      <div>
        <Event
          v-for="(e, i) in events"
          v-bind:key="e.id"
          :e="e"
          v-if="i % 2 == 0"
        />
      </div>
      <div>
        <Event
          v-for="(e, i) in events"
          v-bind:key="e.id"
          :e="e"
          v-if="i % 2 == 1"
        />
      </div>
    </article>
    <article id="events_mobile">
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
    flex-direction: row;
    div {
      width: 50%;
      margin-left: 2px;
      margin-right: 2px;
    }
  }
  #events_mobile {
    display: none;
  }
  @media (max-width: 1250px) {
    #events_mobile {
      display: flex;
      flex-direction: column;
    }
    #events {
      display: none;
    }
  }
}
</style>
