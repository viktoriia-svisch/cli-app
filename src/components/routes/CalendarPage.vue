<template>
    <section id="calendars">
        <h1 class="title">Le calendrier</h1>
        <article class="week_header">
            <h4
                class="chgWeek button"
                @click="changeWeek('-')"
            >
                <img
                    id="prec"
                    src="../../assets/imgs/play.svg"
                />
                Semaine précédente
            </h4>
            <h3
                class="semaine_title"
                v-if="date"
            >
                Semaine du
                {{
                    `${new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate()
                    ).toLocaleDateString("fr-FR")}`
                }}
            </h3>
            <h4
                class="chgWeek button"
                @click="changeWeek('+')"
            >
                Semaine suivante
                <img src="../../assets/imgs/play.svg" />
            </h4>
        </article>
        <h3
            v-if="date"
            class="mobile_week_title"
        >
            Semaine du
            {{
                `${new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate()
                ).toLocaleDateString("fr-FR")}`
            }}
        </h3>
        <article class="mobile_week_header">
            <h3
                class="chgWeek button"
                @click="changeWeek('-')"
            >
                <img
                    id="prec"
                    src="../../assets/imgs/play.svg"
                />
                Précédente
            </h3>
            <h3
                class="chgWeek button"
                @click="changeWeek('+')"
            >
                Suivante
                <img src="../../assets/imgs/play.svg" />
            </h3>
        </article>
        <section
            class="week"
            v-if="date"
        >
            <div
                v-for="(day, k) in displayedDay"
                v-bind:key="day.val"
            >
                <div class="day">
                    {{ day.title }}
                    {{
                        `${new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            date.getDate() + k
                        ).toLocaleDateString("fr-FR")}`
                    }}
                    <section
                        v-for="show in weeks[day.val]"
                        v-bind:key="show.id"
                        class="show"
                    >
                        <div>
                            <u>{{
                                new Date(Number(show.starts_at)).toLocaleTimeString("fr-FR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    timeZone: timeZone,
                                })
                            }}
                                -
                                {{
                                    new Date(Number(show.ends_at)).toLocaleTimeString("fr-FR", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        timeZone: timeZone,
                                    })
                                }}</u>
                            &nbsp;<span class="show-name">{{ show.name }}</span>
                        </div>
                        <div v-if="show.dj && show.dj.length">
                            Animee par <span class="dj-name">{{ show.dj }}</span>
                        </div>
                        <div v-if="show.redundancy">
                            Toutes les {{ show.redundancy == 1 ? "" : show.redundancy }} semaines
                        </div>
                        <div v-else>Emission speciale</div>
                        <div class="genreHld">
                            <span
                                class="genre"
                                v-for="genre in show.genres"
                                v-bind:key="genre"
                            >
                                <router-link :to="{ path: '/search/' + genre }">#{{ genre }}
                                </router-link>
                            </span>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    </section>
</template>
<script>
export default {
    name: "CalendarPage",
    data() {
        return {
            shows: [],
            days: [
                { val: "monday", title: "Lundi", id: 1 },
                { val: "tuesday", title: "Mardi", id: 2 },
                { val: "wednesday", title: "Mercredi", id: 3 },
                { val: "thursday", title: "Jeudi", id: 4 },
                { val: "friday", title: "Vendredi", id: 5 },
                { val: "saturday", title: "Samedi", id: 6 },
                { val: "sunday", title: "Dimanche", id: 0 },
            ],
            displayedDay: [],
            weeks: {
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: [],
            },
            week: String,
            date: null,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
    },
    methods: {
        async getCalendar() {
            this.dispatchShowsInWeek([]);
            const monday = this.date;
            const oneWeekFromMonday = new Date(monday.getTime() + 7 * 24 * 60 * 60 * 1000);
            this.shows = await this.getGoogleCalendar(monday, oneWeekFromMonday);
                        if (!this.shows || !this.shows[0] || !this.shows[0].starts_at) {
                return;
            }
            const firstShowStart = new Date(Number(this.shows[0].starts_at)).getTime();
            if (
                monday.getTime() > firstShowStart ||
                oneWeekFromMonday.getTime() < firstShowStart
            ) {
                return;
            }
            this.dispatchShowsInWeek(this.shows);
        },
        dispatchShowsInWeek(shows) {
            this.weeks.monday = [];
            this.weeks.tuesday = [];
            this.weeks.wednesday = [];
            this.weeks.thursday = [];
            this.weeks.friday = [];
            this.weeks.saturday = [];
            this.weeks.sunday = [];
            for (let i = 0; i < shows.length; i++) {
                let e = new Date(Number(shows[i].starts_at));
                const dayName = this.days.find((d) => d.id === e.getDay()).val;
                this.weeks[dayName].push(shows[i]);
            }
            this.displayedDay = this.days.filter(day => this.weeks[day.val].length > 0);
        },
        async changeWeek(sign) {
            let date = new Date(this.date);
            if (sign == "+") {
                date.setDate(date.getDate() + 7);
            } else {
                date.setDate(date.getDate() - 7);
            }
            this.date = date;
            date = date.toISOString();
            this.week = date.slice(0, 10);
            await this.getCalendar();
        },
        getMonday() {
            const curr = new Date();
            const first = curr.getDate() - curr.getDay() + 1;
            let ret = new Date(curr.setDate(first));
            ret.setHours(12, 0, 0);             return ret;
        },
    },
    async mounted() {
        this.date = this.getMonday();
        this.week = this.date.toISOString();
        this.week = this.week.slice(0, 10);
        await this.getCalendar();
    },
};
</script>
<style lang="less" scoped>
#calendars {
    height: max-content;
    width: 100%;
    .week_header,
    .mobile_week_header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .semaine_title {
            font-family: ZestBold;
        }
        .chgWeek {
            font-size: 14px;
            display: flex;
            align-items: center;
            img {
                position: relative;
                width: 28px;
            }
            #prec {
                -webkit-transform: rotate(180deg);
                -moz-transform: rotate(180deg);
                -ms-transform: rotate(180deg);
                -o-transform: rotate(180deg);
                transform: rotate(180deg);
            }
        }
    }
    .mobile_week_header,
    .mobile_week_title {
        display: none;
    }
    .week {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 2rem;
        grid-auto-rows: minmax(auto, auto);
        .day {
            padding: 0 0.5rem;
            border-left: 1px solid var(--color-text);
            display: flex;
            flex-direction: column;
            gap: 1rem;
            .show {
                .show-name,
                .dj-name {
                    font-family: ZestBold;
                }
                .show-name {
                    padding: 0 0.2rem;
                    background-color: var(--color-primary);
                }
            }
        }
    }
    @media (max-width: 1200px) {
        .week_header {
            display: none;
        }
        .mobile_week_header,
        .mobile_week_title {
            display: flex;
            font-family: ZestBold;
        }
        .mobile_week_title {
            display: block;
            text-align: center;
            margin: 0 auto;
        }
    }
    @media (max-width: 815px) {
        .week {
            width: initial;
            grid-template-columns: repeat(1, 1fr);
        }
    }
}
</style>
