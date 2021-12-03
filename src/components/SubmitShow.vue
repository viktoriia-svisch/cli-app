<template>
  <section id="legalholder">
    <h2>Proposer une emission:</h2>
    <p>Les emissions proposees par ODC Live sont animees par des professionels
    ainsi que des debutants.....</p>
  </section>
</template>
<script>
export default {
  name: 'mentions',
};
</script>
<style lang="less" scoped>
#legalholder {
  margin-top: 30px;
  #guilink {
    font-weight: bold;
    text-decoration: none;
    color: white;
    &:hover {
      text-decoration-line: underline;
      text-decoration-style: dashed;
    }
  }
  #legaltable {
    margin: 0 auto;
    tr {
      height: 40px;
      th {
        text-align: inherit;
        border-bottom: 1px solid white;
      }
      td {
        padding-left: 10px;
      }
    }
    #ovhlast {
      border-bottom: none;
    }
  }
}
</style>
