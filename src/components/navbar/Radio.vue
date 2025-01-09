<template>
    <section
        id="radio"
        @click="play"
    >
        <audio
            ref="audioElm"
            :src="src"
            preload="none"
        ></audio>
        <div style="display: flex;">
            <div class="play-pause-button round-button">
                <img
                    alt="play button"
                    src="../../assets/imgs/play.svg"
                    v-if="!isPlaying"
                />
                <img
                    alt="stop button"
                    src="../../assets/imgs/stop.png"
                    v-else
                />
            </div>
            <span class="reddot">•</span>
        </div>
        <div class="player-title">
            <span
                class="live_info infinite-slider"
                v-if="titleVisible"
            >
                <span
                    v-for="index in titleRepetitions"
                    v-bind:key="index"
                    class="infinite-slider__content"
                >
                    <span v-if="livestream && index">Live                     <span class="invis">{{ artist }}</span>
                    <span
                        class="dash"
                        v-if="!livestream"
                    > - </span>
                    <span class="show_title invis">{{ title }}</span>
                    <span style="margin: 0 .5rem 0 .5rem">→</span>
                </span>
            </span>
        </div>
    </section>
</template>
<script>
import axios from "axios";
export default {
    name: "Radio",
    props: ["today_shows", "iframe_update"],
    watch: {
        today_shows: function (newVal, oldVal) {
                        newVal;
            oldVal;
            if (!this.updated) {
                this.updated = true;
                this.src = this.$config.VUE_APP_RADIO.listen_ep;
                this.now = this.$config.VUE_APP_RADIO.now_ep;
                this.checkTitle()
                                                                setInterval(() => {
                    this.checkTitle()
                }, 5000);
            }
        },
        iframe_update: function (newVal) {
            if (newVal != "" && this.isPlaying == true) {
                this.play();
            }
            this.canPlay = newVal != "" ? false : true;
            this.titleVisible = newVal != "" ? false : true;
        },
    },
    data() {
        return {
            canPlay: true,
            updated: false,
            isPlaying: false,
            livestream: false,
            title: "",
            artist: "",
            src: "",
            now: "",
            titleVisible: true,
            titleRepetitions: [1, 2, 3, 4]
        };
    },
    methods: {
        play() {
            if (!this.isPlaying && this.canPlay) {
                this.$refs.audioElm.src = `${this.src}?t=${new Date().getTime()}`;
                this.$refs.audioElm.play();
                this.isPlaying = true;
            } else {
                this.$refs.audioElm.pause();
                this.isPlaying = false;
            }
        },
        checkTitle() {
            axios
                .get(`${this.now}?t=${new Date().getTime()}`)
                .then((res) => {
                    let odc_station = res.data[0];
                    if (
                        odc_station.live.is_live ||
                        odc_station.now_playing.elapsed == null ||
                        odc_station.now_playing.song.title == "Stream Offline"
                    ) {
                        this.readTitleFromTodayShows();
                    } else {
                        this.livestream = false;
                        const now_playing = odc_station.now_playing;
                        if (this.timeout) {
                            clearTimeout(this.timeout);
                        }
                        this.timeout = setTimeout(
                            this.checkTitle,
                            (now_playing.remaining + 3) * 1000
                        );
                        this.artist = now_playing.song.artist;
                        this.title = now_playing.song.title;
                    }
                })
                .catch(() => {
                    clearTimeout(this.timeout);
                    this.timeout = null;
                });
        },
        readTitleFromTodayShows() {
            let show = this.today_shows.find((show) => {
                let start = new Date(Number(show.starts_at));
                let end = new Date(Number(show.ends_at));
                let now = new Date();
                return start.getTime() <= now.getTime() && now.getTime() <= end.getTime();
            });
            this.livestream = true;
            if (show) {
                this.artist = show.dj;
                this.title = `             } else {
                this.title = "Tune In";
                this.artist = '';
            }
        },
    },
};
</script>
<style lang="less" scoped>
#radio {
    height: 100%;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    border-left: 1px solid var(--color-text);
    overflow: hidden;
    gap: var(--padding);
    .flex {
        display: flex;
        justify-content: space-between;
    }
    .player-title {
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        box-sizing: border-box;
        position: relative;
        display: flex;
        .live_info {
            display: flex;
            vertical-align: middle;
            line-height: normal;
            justify-content: space-around;
            flex-direction: row;
        }
        .infinite-slider {
            animation: marquee 30s linear infinite;
            min-width: 200%;
            flex-shrink: 0;
            &__content {
                flex-shrink: 0;
                width: max-content;
                max-width: max-content;
            }
        }
        &:hover {
            .live_info {
                animation-play-state: paused;
            }
        }
        @keyframes marquee {
            0% {
                transform: translate(0, 0);
            }
            100% {
                transform: translate(-50%, 0);
            }
        }
    }
    .play-pause-button {
        height: 40px;
        width: 40px;
        img {
            height: 40px;
            width: 40px;
        }
    }
    .reddot {
        margin-top: 0px;
        align-self: flex-end;
        margin-bottom: -12px;
        margin-left: -4px;
        color: red;
        font-size: 34px;
        animation: live 2s linear infinite;
    }
    @keyframes live {
        0% {
            opacity: 0;
        }
        29% {
            opacity: 0;
        }
        30% {
            opacity: 1;
        }
        99% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    @media (max-width: 815px) {
        border: none;
        .player-title {
            width: calc(100% - 90px);
        }
        .reddot {
            margin-top: 5px;
        }
    }
}
</style>
