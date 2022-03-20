<template>
  <section id="podcast">
    <img
      :src="pod.artwork_url.replace('-large', '-t500x500')"
      class="miximg"
      :class="{ blurred: !intersect, noblurred: intersect }"
      style="width: 200px;"
    />
  </section>
</template>
<script>
export default {
  name: "WidgetPodcast",
  props: {
    pod: null
  }
};
</script>
<style lang="less" scoped>
#podcast {
}
</style>
