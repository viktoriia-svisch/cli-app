<template>
  <aside
    class="sticked"
    :class="{ 'centred-chat': $route.path === '/chat' }"
    :style="`display: ${$route.path != '/events' ? 'initial' : 'none'};`"
  >
    <div>
      <Chat />
      <TimeTable class="timetable" v-if="!isChatOnly" />
    </div>
  </aside>
</template>
<script>
import Chat from "./Chat.vue";
import TimeTable from "./TimeTable";
export default {
  name: "right",
  components: {
    Chat,
    TimeTable,
  },
  computed: {
    isChatOnly() {
      const path = window.location.pathname.split("/")[1];
            this.$route.name;
      return path === "chat";
    },
  },
};
</script>
<style lang="less" scoped>
aside {
  padding: 2rem 2rem 2rem 1rem;
  width: 30%;
  min-width: 200px;
  background: var(--color-chat-bg);
  margin: -2rem -2rem -4rem 0;
  &.centred-chat {
    height: 100%;
    width: 40%;
    > div {
      height: 100%;
    }
  }
  &.sticked {
    position: sticky;
    top: -4rem;
  }
  .timetable {
    margin-top: 2rem;
  }
  @media (max-width: 815px) {
    margin-left: 0px;
  }
}
</style>
