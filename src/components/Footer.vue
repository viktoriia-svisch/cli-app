<template>
  <footer>
    <div class="links">
      <router-link :to="{path: '/mentions'}"
        ><b>Mentions legales</b></router-link
      >
    </div>
    <div class="moto">
      <span>
        Web Radio &amp; Tv Strasbourgeoise 100% indépendante.<br />
        ODC est une plateforme de rencontre et de diffusion<br />
        pour les passionnés de musique.
      </span>
    </div>
  </footer>
</template>
<script>
export default {
  name: 'Footer',
};
</script>
<style lang="less" scoped>
footer {
  margin: 20px auto;
  display: flex;
  width: 900px;
  padding-top: 100px;
  border-top: 1px solid #ffffff80;
  flex-direction: row;
  .links {
    a {
      font-weight: bold;
      text-decoration-line: underline;
      text-decoration-style: dashed;
      color: white;
      &:hover {
        text-decoration-style: dotted;
      }
    }
  }
  .moto {
    margin-left: 12px;
  }
}
</style>
