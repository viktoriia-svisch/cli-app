<template>
  <section id="prop">
    <h1 class="title">Proposer une émission</h1>
    <div class="prop-container">
      <img src="../../assets/imgs/show.jpeg" />
      <article>
        <p>
          La grille des programmes de zest est ouverte toute la saison aux nouvelles
          propositions, qu'il s'agisse d'un takeover d'une heure ou d'une émission
          récurrente. <br />Si vous souhaitez réserver un créneau ou proposer un concept
          d'émission n’hésitez pas à envoyer un mail à :
        </p>
        <h3>
          <a href="mailto:zoneestradio@gmail.com">zoneestradio@gmail.com</a>
        </h3>
        <p>
          Le sujet de l'email devra etre précédé de la mention
          <b>[programmation]</b> et contenir soit en pièce jointe soit via une URL
          <b>un set ou une émission que vous avez déjà réalisé</b>. Dans le cas d'une
          takeover, merci de préciser quel(s) jour(s) de la semaine vous souhaitez passer
        </p>
        <p>
          Si le contenu proposé correspond à la ligne éditoriale de la radio et est juge
          favorablement a une emission radio, l'équipe vous recontactera dans les plus
          brefs délais.
        </p>
      </article>
    </div>
  </section>
</template>
<script>
export default {
  name: "submitshows",
};
</script>
<style lang="less" scoped>
#prop {
  box-sizing: border-box;
  padding-bottom: 5rem;
  height: max-content;
  .prop-container {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  img {
    width: 400px;
    border: 1px solid var(--color-text);
    height: auto;
    box-sizing: border-box;
  }
  article {
    border: 1px solid var(--color-text);
    padding: 1rem;
    flex-shrink: 1;
    flex-grow: 1;
    width: 40%;
    h3 {
      text-align: center;
      a {
        color: var(--color-text);
        font-weight: bold;
      }
    }
  }
  @media (max-width: 1150px) {
    article,
    img {
      margin: 0 auto;
    }
  }
  @media (max-width: 815px) {
    article,
    img {
      width: 100%;
    }
  }
}
</style>
