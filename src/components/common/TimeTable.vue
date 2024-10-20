<template>
    <section
        id="tim"
        v-if="today_shows && today_shows.length > 0"
    >
        <h3 class="title">Le programme du jour</h3>
        <article id="shows">
            <section
                v-for="show in today_shows"
                v-bind:key="show.id"
                class="show"
            >
                <span class="side">
                    <u>{{ enhanceDate(show.starts_at) }} - {{ enhanceDate(show.ends_at) }}</u></span>
                <span class="show_name"> {{ show.name }}</span><br />
                <span v-if="show.dj.length"><span class="side">Animee par </span>
                    <span class="artist_name">{{ show.dj }}</span></span><br />
                <span
                    class="side"
                    v-if="show.redundancy"
                >Toutes les {{ show.redundancy == 1 ? "" : show.redundancy }} semaines</span>
                <span
                    v-else
                    class="side"
                >Emission speciale</span><br />
                <span
                    class="genre"
                    v-for="genre in show.genres"
                    v-bind:key="genre"
                ><router-link :to="{ path: '/search/' + genre }">#{{ genre }}</router-link></span>
            </section>
        </article>
    </section>
</template>
<script>
export default {
    name: "TimeTable",
    data() {
        return {
            today_shows: [],
        };
    },
    methods: {
        enhanceDate(ts) {
            return new Date(Number(ts)).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            });
        },
        async getCalendar(date) {
            const oneDayFromDate = new Date(date.getTime() + 24 * 60 * 60 * 1000);
            this.today_shows = await this.getGoogleCalendar(date, oneDayFromDate);
            this.$parent.$parent.today_shows = this.today_shows;
        },
    },
    async mounted() {
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        await this.getCalendar(date);
            },
};
</script>
<style lang="less" scoped>
#tim {
    color: var(--color-chat-text);
    width: 100%;
    #shows {
        .show {
            margin-bottom: 1rem;
            .artist_name,
            .show_name {
                font-family: ZestBold;
            }
            .side {}
            .genre {
                color: var(--color-chat-text);
                a {
                    color: var(--color-chat-text);
                }
                &:hover,
                &:hover a {
                    color: var(--color-primary);
                    background-color: unset;
                }
            }
        }
    }
    @media (max-width: 815px) {
        max-width: initial;
        margin: 0;
        width: 100%;
        color: var(--color-text);
    }
}
</style>
