<template>
  <aside>
    <Chat />
    <TimeTable class="timetable" />
  </aside>
</template>
<script>
import Chat from "./Chat.vue";
import TimeTable from "./TimeTable";
export default {
  name: "right",
  components: {
    Chat,
    TimeTable
  }
};
</script>
<style lang="less" scoped>
aside {
  margin-left: 20px;
  margin-right: 20px;
  .timetable {
    margin-top: 60px;
  }
  @media (max-width: 770px) {
    margin-left: 0px;
  }
}
</style>
