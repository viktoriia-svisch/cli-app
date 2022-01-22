<template>
  <section id="arch">
    <h1 id="title">Les archives de la radio</h1>
    <table>
      <tr>
        <th>Annee</th>
        <th>Lien</th>
      </tr>
      <tr>
        <td>2018/19</td>
        <td><a href="https:      </tr>
    </table>
  </section>
</template>
<script>
export default {
  name: "Archive"
};
</script>
<style lang="less" scoped>
#arch {
  #title {
    font-size: 40px;
    font-family: Bison;
  }
  a {
    font-weight: bold;
    text-decoration-line: underline;
    text-decoration-style: dashed;
    color: white;
    &:hover {
      text-decoration-style: dotted;
    }
  }
  table {
    width: 500px;
    tr {
      td {
        text-align: center;
      }
    }
  }
}
</style>
