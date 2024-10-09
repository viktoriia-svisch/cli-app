<template>
    <section
        id="mix_frame"
        v-if="iframe_mix"
    >
        <div id="mix_frame_inner">
            <img
                src="../../assets/imgs/play.svg"
                class="playBtn round-button"
                v-if="!isPlaying"
                @click="toggleSound"
            />
            <img
                src="../../assets/imgs/stop.png"
                class="playBtn round-button"
                v-else
                @click="toggleSound"
            />
            <div class="player-title">
                <span
                    class="live_info"
                    @click="toggleSound"
                >
                    {{ iframe_mix.title || '...' }} → {{ iframe_mix.title || '...' }} → {{ iframe_mix.title || '...' }}
                </span>
            </div>
            <div>
                <div @click="$emit('showMore', showMore)">
                    <img
                        class="more_mix round-button"
                        src="../../assets/imgs/more_icon.png"
                        @click="showMore = !showMore"
                        v-if="!showMore"
                    />
                    <img
                        class="more_mix round-button"
                        src="../../assets/imgs/less_icon.png"
                        @click="showMore = !showMore"
                        v-else
                    />
                </div>
                <img
                    class="close_mix round-button"
                    src="../../assets/imgs/cross_icon.png"
                    @click="close_mix"
                />
            </div>
        </div>
        <section
            class="more_info"
            :style="`opacity: ${showMore ? '1' : '0'}`"
        >
            <iframe
                ref="sc_iframe"
                height="0"
                scrolling="no"
                frameborder="no"
                allow="autoplay"
                :src="`https:            ></iframe>
        </section>
    </section>
</template>
<script>
import axios from "axios";
export default {
    name: "IframeSC",
    props: ["iframe_mix"],
    watch: {
        iframe_mix: function (newMix) {
            this.isPlaying = false;
            this.showMore = true;
                        if (newMix != "") {
                                if (!newMix.artwork_url) {
                    newMix.podImg = newMix.avatar_url;
                } else {
                    newMix.podImg = newMix.artwork_url;
                }
                newMix.podImg = newMix.podImg.replace("-large", "-t500x500");
                document.title = `z⸱est radio - ${newMix.title}`;
                this.setMetadata();
                setTimeout(() => {
                                        SC.Widget(this.$refs.sc_iframe).bind(
                        SC.Widget.Events.READY,                         () => {
                            if (this.iframe_mix.autoplay) {
                                this.toggleSound();
                            }
                                                        SC.Widget(this.$refs.sc_iframe).unbind(SC.Widget.Events.READY);
                        }
                    );
                }, 1000);
            }
        },
    },
    data() {
        return {
            isPlaying: false,
            showMore: true,
            color: "#000000",
        };
    },
    methods: {
        setMetadata() {
            const title = document.createElement("meta");
            title.setAttribute("property", "og:title");
            title.setAttribute("content", this.iframe_mix.title);
            const desc = document.createElement("meta");
            desc.setAttribute("property", "og:description");
            desc.setAttribute("content", this.iframe_mix.description);
            const img = document.createElement("meta");
            img.setAttribute("property", "og:image");
            img.setAttribute("content", this.iframe_mix.podImg);
            document.getElementsByTagName("head")[0].appendChild(title);
            document.getElementsByTagName("head")[0].appendChild(desc);
            document.getElementsByTagName("head")[0].appendChild(img);
        },
        close_mix() {
                        SC.Widget(this.$refs.sc_iframe).unbind(SC.Widget.Events.READY);
            this.isPlaying = false;
            this.$parent.$parent.iframe_mix = "";
        },
        toggleSound() {
            if (this.iframe_mix) {
                if (this.$refs.sc_iframe) {
                    document.title = `z⸱est radio - ${this.iframe_mix.title}`;
                    SC.Widget(this.$refs.sc_iframe).toggle();                                         SC.Widget(this.$refs.sc_iframe).isPaused((paused) => {
                        this.isPlaying = !paused;
                    });
                }
            } else {
                if (this.$parent.$refs.radio) {
                    this.$parent.$refs.radio.play();
                } else if (this.$parent.$parent.$refs.radio) {
                    this.$parent.$parent.$refs.radio.play();
                }
            }
        },
    },
    mounted() {
        window.addEventListener("focus", () => {
            if (this.$refs.sc_iframe) {
                                SC.Widget(this.$refs.sc_iframe).isPaused((paused) => {
                    this.isPlaying = !paused;
                });
            }
        });
        window.addEventListener("keydown", (event) => {
                        if (event.keyCode == 32 && event.target == document.body) {
                event.preventDefault();
                this.toggleSound();
            }
        });
        axios
            .get(`${this.$config.VUE_APP_API}/upload/color?t=${new Date().getTime()}`)
            .then((response) => {
                this.color = response.data.color;
            });
    },
};
</script>
<style lang="less" scoped>
#mix_frame {
    position: relative;
    color: #f50;
    cursor: pointer;
    height: 100%;
    width: calc(100% - 58px);
    padding-left: var(--padding);
    display: flex;
    align-items: center;
    .more_info {
        background-color: var(--color-bg);
        position: fixed;
        left: 0px;
        transition: 0.5s;
        width: 100%;
        top: calc(var(--header-height) - 2px);
        border-bottom: 1px solid black;
        border-top: 1px solid black;
        box-sizing: border-box;
        margin: 0;
        height: 124px;
        iframe {
            width: 100%;
            height: 122px;
        }
    }
    #mix_frame_inner {
        display: flex;
        align-items: center;
        width: 100%;
        gap: var(--padding);
        .playBtn {
            height: 40px;
            cursor: pointer;
        }
        .player-title {
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            box-sizing: border-box;
            .live_info {
                display: inline-block;
                vertical-align: middle;
                line-height: normal;
                --end-percent: ~"calc(-33% - 9px)";
                animation: marquee 10s linear infinite;
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
                    transform: translate(var(--end-percent), 0);
                }
            }
        }
        div {
            display: flex;
            .close_mix {
                cursor: pointer;
                width: 25px;
                height: 25px;
                padding: 5px;
            }
            .more_mix {
                cursor: pointer;
                width: 25px;
                height: 25px;
                padding: 5px;
            }
        }
    }
    @media (max-width: 815px) {
        height: 57px;
        padding-left: 0;
        width: calc(100% - 60px);
        #mix_frame_inner {
            .player-title {
                position: relative;
                width: calc(100% - 130px);
            }
        }
        #more_info_shadow {
            z-index: 1;
            width: ~"calc(100% - 0px)";
            height: ~"calc(100% - 138px)";
            position: fixed;
            left: 0;
            top: 69px;
            background-color: #00000040;
        }
        .more_info {
            transform: initial;
            top: initial;
            left: 0;
            width: 100vw;
            z-index: 1;
            padding-top: 8px;
            bottom: 49px;
            height: unset;
            iframe {
                width: inherit;
                height: 20px;
                margin-left: -20px;
                width: calc(100% + 102px);
            }
        }
    }
}
</style>
