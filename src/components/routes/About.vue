<template>
    <div>
        <section id="about">
            <h1 class="title">À propos de z⸱est radio / zone est radio</h1>
            <p>
                z⸱est radio est une webradio Strasbourgoise créé en 2018. Jusqu'au début 2024 la radio était installée
                au
                bar du Graffalgar, la Graffateria et les émissions étaient alors public.
                Le nouveau studio est désormais au Shadok et ne peut malheureusement plus acceuillir de public.
            </p>
            <p>
                En plus de son activité radiophonique z⸱est organise des événements au cours de l'année.
                Notamment le Soundclash qui a lieu en septembre au molodoi.
                Mais aussi zest contre la vie chère.
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
                </small>
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
