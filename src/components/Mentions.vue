<template>
  <section id="legalholder">
    <h2>Mentions legales:</h2>
    <table id="legaltable">
      <tr>
        <th>Association</th>
        <td>ODC Live</td>
      </tr>
      <tr>
        <th>Adresse</th>
        <td>3 Rue du Marechal Juin - 67000 Strasbourg, France</td>
      </tr>
      <tr>
        <th>Telephone</th>
        <td>/</td>
      </tr>
      <tr>
        <th>Mail</th>
        <td>odysseefm@gmail.com</td>
      </tr>
      <tr>
        <th>Directeur de la publication</th>
        <td>Luc Leroy</td>
      </tr>
      <tr>
        <th>Hebergeur</th>
        <td>OVH</td>
      </tr>
      <tr>
        <th>Denomination Sociale</th>
        <td>SAS OVH</td>
      </tr>
      <tr id="ovhlast">
        <th>Adresse & numero d'OVH</th>
        <td>2 rue Kellermann - 59100 Roubaix, France<br />0 820 698 765</td>
      </tr>
    </table>
    <br /><br />
    <p>
      Creation et mise en service du site par Guillaume Kessibi
      <small>
        <a id="guilink" href="https:      </small>
    </p>
  </section>
</template>
<script>
export default {
  name: 'mentions',
};
</script>
<style lang="less" scoped>
#legalholder {
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
