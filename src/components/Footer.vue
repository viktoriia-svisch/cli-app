<template>
  <footer>
    <div class="links">
      <router-link :to="{path: '/mentions'}"
        ><b>Mentions legales</b></router-link
      >
      <router-link :to="{path: '/propose_show'}"
        ><b>Proposer une emission</b></router-link
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
  margin-top: 20px;
  padding-bottom: 10px;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  padding-top: 5px;
  background-color: black;
  border-top: 1px solid #ffffff80;
  .links {
    display: flex;
    flex-direction: column;
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
  @media (max-width: 700px) {
    .links {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
</style>
