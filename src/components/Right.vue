<template>
  <aside :style="`display: ${$route.path != '/events' ? 'initial' : 'none'}`">
    <div class="sticked">
      <Chat />
      <TimeTable class="timetable" />
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
};
</script>
<style lang="less" scoped>
aside {
  margin-left: 20px;
  margin-right: 20px;
  .sticked {
    position: sticky;
    top: 112px;
  }
  .timetable {
    margin-top: 20px;
  }
  @media (max-width: 770px) {
    margin-left: 0px;
  }
}
</style>
