<template>
    <div style="display: flex;flex-direction: column;">
        <section>
            <h1 class="title">
                À propos de z⸱est radio / zone est radio
            </h1>
            <p>
                z⸱est radio est une webradio strasbourgeoise fondée en 2018. Jusqu'au début de l'année 2024, la radio
                était installée au bar du Graffalgar, à la Graffateria, où les émissions étaient ouvertes au public.
                Désormais, le nouveau studio se trouve au Shadok, mais il n'est malheureusement plus possible d'y
                accueillir du public.
            </p>
            <p>
                En parallèle de son activité radiophonique, z⸱est organise divers événements tout au long de l'année.
                Parmi eux, le <em>Soundclash</em>, qui se déroule chaque mois de septembre au Molodoï.
            </p>
            <quote>
                Un Soundclash est une compétition musicale où les membres d'un crew de Soundsystem opposent leurs
                compétences les uns aux autres. Les affrontements sonores se déroulent dans une variété de lieux, à la
                fois à l'intérieur et à l'extérieur, et comportent principalement de la musique reggae, dancehall,
                dubstep & jungle. Le but est de battre ou de «tuer» leurs concurrents.
                Le Soundclash de z⸱est radio est un événement sur plusieurs jours avec chaque jour un⸱e invité⸱e
                d'honneur⸱e reconnu hors compétition, et des competiteur·ices locaux.
            </quote>
            <p>
                <em>zest contre la vie chère</em> est un autre événement qui fait jouer des artistes locaux en back to
                back de
                façon aléatoire tirée au sort le soir même. L'événement se veut convivial et accessible à toustes.
            </p>
        </section>
        <section id="legalholder">
            <h2 class="title">Mentions legales:</h2>
            <p>
                Description Zest Radio
            </p>
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
                    <td>zoneestradio@gmail.com</td>
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
                Création et mise en service du site par Guillaume Kessibi
                <small>
                    (<a
                        class="outlink"
                        href="https:                        target="_blank"
                    >kessibi.fr</a>)
                </small>
                et Léo Pallot
                <small>
                    (<a
                        class="outlink"
                        href="https:                        target="_blank"
                    >leopallot.com</a>)
                </small>.
                Refonte et maintenance par Tristan Grunert.
            </p>
            <p>
                Photos de ODC Events prises par Ataraxie Photographie
                <small>
                    (<a
                        class="outlink"
                        href="https:                    >ataraxiephoto.fr</a>)
                </small>
            </p>
            <p>
                Il est possible de changer de pseudonyme dans le chat avec la commande
                !pseudo nouveau_pseudo
            </p>
        </section>
    </div>
</template>
<script>
export default {
    name: "mentions",
};
</script>
<style lang="less" scoped>
section {
    max-width: 1000px;
}
quote {
    color: var(--color-text-light);
    display: block;
    padding-left: 1rem;
    border-left: 1px solid var(--color-text-light);
}
#legalholder {
    color: var(--color-text);
    height: max-content;
    .outlink {
        font-weight: bold;
        text-decoration: none;
        color: var(--color-text);
        &:hover {
            text-decoration-line: underline;
            text-decoration-style: dashed;
        }
    }
    #legaltable {
        tr {
            height: 40px;
            th {
                text-align: inherit;
                border-bottom: 1px solid var(--color-text);
            }
            td {
                padding-left: 10px;
            }
        }
        #ovhlast {
            border-bottom: none;
        }
    }
    @media (max-width: 815px) {
        width: initial;
        #legaltable {
            margin: 0;
        }
    }
}
</style>
