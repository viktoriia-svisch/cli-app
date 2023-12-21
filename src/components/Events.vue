<template>
  <main>
    <div id="img1" class="img">
      <img src="../assets/imgs/events/1.jpg" />
      <div class="text" id="bloc1">
        <img src="../assets/imgs/events/logo.png" />
        <p>
          Fort de son expérience dans le monde culturel en tant que Webradio,
          ODC propose ses services professionnels dans l’organisation
          d’événements 360° ainsi que dans l’audiovisuel.
        </p>
      </div>
      <div class="text" id="bloc2">
        <p>
          Odc Event est une structure portée par
          <span class="imp">Luc Leroy</span> (programmateur),
          <span class="imp">Lucas Karst</span> (vidéaste),
          <span class="imp">Léo Pallot</span> (graphiste) ainsi que
          <span class="imp">Maxime Hoffart</span> (technicien du son). <br />
          Leurs qualités techniques mais aussi leurs connaissances du milieu
          culturel alsacien permettent de vous proposer des événements sur
          mesures et clés en main mais aussi un accompagnement plus spécifique
          sur leurs services ou compétences proposés.
        </p>
      </div>
    </div>
    <div id="img2" class="img">
      <img src="../assets/imgs/events/2.jpg" />
      <div class="text" id="bloc1">
        <h2>Nos projets, clients et partenaires</h2>
        <p>
          La Bibliothèque U2-U3, Colors Festival, Contre temps, Festival
          Exhibitrnic, Le Graffalgar, La Grenze, L’institut supérieur des arts
          appliqués (LISAA), Les Jardins des deux rives Strasbourg, Le Shadok,
          La Kulture, Librairie Kléber, Le Mini Maker Fair, les musées de la
          ville de strasbourg,NL Contest, L’Ososphère, Cinéma Odyssée, Le Palais
          Rohan, Pelpass festival, Radio en Construction & Redbull.
        </p>
      </div>
    </div>
    <div id="img3" class="img">
      <img src="../assets/imgs/events/3.jpg" />
      <div class="text" id="bloc1">
        <h2>Services & Compétences</h2>
        <p>
          <span class="imp">Service captation radio et vidéo</span><br /><br />
          · Live Streaming vidéo : jusqu’à 4 axes disponibles, plans aériens au
          drone, en direct sur Youtube, Facebook ou sur serveur dédié.<br />
          · Live Streaming radio sur <span class="imp">www.zest.radio</span> ou
          sur votre propre serveur.<br />
          · Location de Matériel DJ, Vidéo & Radio, + d’infos par mail.<br />
          · Photographie d’événement : mise en valeur de vos artistes ou
          produits.
        </p>
      </div>
      <div class="text" id="bloc2">
        <p>
          <span class="imp">Service de production événementiel</span
          ><br /><br />
          . Catalogue de lieux atypiques, classiques et contemporains<br />
          . Musique sur mesure : DJ Sets, concerts, showcases...<br />
          . Service de bar et de catering<br />
          . Animations : workshops & live radio<br />
          . Community management, création de contenus
        </p>
      </div>
      <div class="text" id="bloc3">
        <p class="contact">
          <span class="imp"
            ><a href="mailto:zoneestradio@gmail.com">Nous contacter</a></span
          >
          sur
          <span class="imp"
            ><a href="mailto:zoneestradio@gmail.com"
              >zoneestradio@gmail.com</a
            ></span
          >
        </p>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  name: "Events",
};
</script>
<style lang="less" scoped>
main {
  width: 1100px;
  .contact {
    text-align: center;
    a {
      text-decoration: none;
      color: black;
    }
  }
  .img {
    position: relative;
    width: inherit;
    margin-bottom: -4px;
    img {
      width: inherit;
    }
    .text {
      position: absolute;
      background-color: var(--color-bg);
      padding: 20px;
      h2 {
        margin-top: 7px;
      }
      p {
        font-size: 16px;
        margin: 0;
      }
    }
  }
  #img1 {
    #bloc1 {
      top: 80px;
      width: 500px;
      img {
        width: 300px;
        margin-top: 8px;
        margin-bottom: 16px;
      }
    }
    #bloc2 {
      bottom: 120px;
      right: 0px;
      width: 700px;
    }
  }
  #img2 {
    #bloc1 {
      bottom: 120px;
      width: 700px;
    }
  }
  #img3 {
    #bloc1 {
      width: 475px;
      top: 120px;
      right: 0px;
      p {
      }
    }
    #bloc2 {
      bottom: 220px;
      left: 0;
      p {
      }
    }
    #bloc3 {
      bottom: 120px;
      right: 0;
      p {
      }
    }
  }
  @media (max-width: 1100px) {
    width: 100%;
    .img {
      .text {
        position: relative;
        width: initial !important;
        top: initial !important;
        bottom: initial !important;
        right: initial !important;
        left: initial !important;
        margin-bottom: 4px;
      }
      margin-bottom: 2px;
    }
  }
}
</style>
