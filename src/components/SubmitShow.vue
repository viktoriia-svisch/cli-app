<template>
  <section id="prop">
    <article>
      <h2>Proposer une emission:</h2>
      <p>
        La grille des programmes d'odc est ouverte toute la saison aux nouvelles
        propositions, qu'il s'agisse d'un takeover d'une heure ou d'une émission
        récurrente. <br />Si vous souhaitez réserver un créneau ou proposer un
        concept d'émission n’hésitez pas a envoyer un mail a :
      </p>
      <h3><a href="mailto:contact@odc.live">contact@odc.live</a></h3>
      <p>
        Le sujet de l'email devra etre precede de la mention
        <b>[programmation]</b> et contenir soit en pièce jointe soit via une URL
        <b>un set ou une émission que vous avez déjà réalisé</b>. Dans le cas
        d'une takeover, merci de preciser quel jours de la semaine vous voulez
        passer
      </p>
      <p>
        Si le contenu proposé correspond à la ligne editorial de la radio et est
        juge favorablement a une emission radio, l'equipe vous recontactera dans
        les plus brefs delais.
      </p>
    </article>
    <img src="../assets/imgs/show.jpeg" />
  </section>
</template>
<script>
export default {
  name: "submitshows"
};
</script>
<style lang="less" scoped>
#prop {
  margin: 30px auto;
  display: flex;
  justify-content: center;
  img {
    width: 400px;
  }
  article {
    width: 700px;
    margin-right: 30px;
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
  @media (max-width: 1150px) {
    flex-direction: column;
    article,
    img {
      margin: 0 auto;
    }
  }
  @media (max-width: 800px) {
    article,
    img {
      width: 100%;
    }
  }
}
</style>
