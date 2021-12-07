<template>
  <section id="prop">
    <h2>Proposer une emission:</h2>
    <p>
      Les emissions proposees par ODC Live sont animees par des professionels
      ainsi que des debutants.<br />
      Si vous etes interresses par la radio, n'hesitez pas a envoyer un mail a:
    </p>
    <h3><a href="mailto:contact@odc.live">contact@odc.live</a></h3>
    <p>
      Le sujet de l'email devra etre precede de la mention <b>[propos]</b> et
      contenir soit en piece jointe soit via une URL
      <b>un set que vous avez deja realise</b>.
    </p>
    <p>
      Si le set est juge favorablement a une emission radio, l'equipe vous
      recontactera dans les plus brefs delais.
    </p>
  </section>
</template>
<script>
export default {
  name: "submitshows"
};
</script>
<style lang="less" scoped>
#prop {
  margin-top: 30px;
  p {
    b {
      background-color: #484873;
    }
  }
  h3 {
    text-align: center;
    a {
      color: white;
      font-weight: bold;
    }
  }
}
</style>
