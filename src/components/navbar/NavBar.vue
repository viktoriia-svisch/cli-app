<template>
    <div
        class="header"
        :class="{ 'soundcloud-iframe': iframe_mix && showSoundcloudIframe }"
    >
        <nav>
            <section class="nav flex">
                <div class="flex menu">
                    <router-link
                        :to="{ path: '/' }"
                        style="padding-right: 1rem"
                    ><img
                            alt="z⸱est radio"
                            src="../../assets/imgs/logo.png"
                            height="20"
                        />
                    </router-link>
                    <router-link :to="{ path: '/podcasts' }">
                        <h1>Podcasts</h1>
                    </router-link>
                    <router-link :to="{ path: '/calendar' }">
                        <h1>Calendrier</h1>
                    </router-link>
                    <router-link :to="{ path: '/residents' }">
                        <h1>Résident.e.s</h1>
                    </router-link>
                </div>
                <div class="navbar-right">
                    <Radio
                        ref="radio"
                        :today_shows="today_shows"
                        :iframe_update="iframe_mix"
                        :style="`display: ${iframe_mix == '' ? 'flex' : 'none'}`"
                    />
                    <IframeSC
                        :iframe_mix="iframe_mix"
                        @showMore="setShowMOre($event)"
                    />
                    <div
                        class="more round-button"
                        @click="second = !second"
                    >
                        <img
                            v-if="second == false"
                            width="40"
                            src="../../assets/imgs/menu.png"
                        />
                        <img
                            v-else
                            width="40"
                            src="../../assets/imgs/back_black.png"
                            style="position: relative; top: 5px"
                        />
                    </div>
                </div>
            </section>
            <section
                class="second"
                :style="`right: ${second ? '0' : '-30%'}`"
            >
                <img
                    id="logo_white"
                    alt="z⸱est radio"
                    src="../../assets/imgs/logo_white.png"
                    width="140"
                />
                <div class="main menu">
                    <h3 @click="toURL('/podcasts')">Podcasts</h3>
                    <h3 @click="toURL('/calendar')">Calendrier</h3>
                    <h3 @click="toURL('/residents')">Résident.e.s</h3>
                    <br />
                    <h3 @click="toURL('/propose_show')">Proposer un show</h3>
                    <h3>
                        <a
                            href="https:                            target="_blank"
                        >Soundcloud</a>
                    </h3>
                    <h3>
                        <a
                            href="https:                            target="_blank"
                        >Facebook</a>
                    </h3>
                    <h3>
                        <a
                            href="https:                            target="_blank"
                        >Instagram</a>
                    </h3>
                    <br />
                    <h3 @click="toURL('/About')">About</h3>
                </div>
            </section>
            <section
                id="second_shadow"
                :style="`display: ${second ? 'initial' : 'none'}`"
                @click="second = !second"
            >
            </section>
        </nav>
    </div>
</template>
<script>
import Radio from "./Radio.vue";
import IframeSC from "./IframeSC.vue";
import "../../assets/js/soundcloud.js";
export default {
    name: "NavBar",
    props: ["today_shows", "color", "iframe_mix"],
    watch: {
        color: (newCol) => {
            const css = `.menu a:hover {color: ${newCol}35;}`;
            const style = document.createElement("style");
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            document.getElementsByTagName("head")[0].appendChild(style);
        },
    },
    components: {
        Radio,
        IframeSC,
    },
    data() {
        return {
            hiddenSearch: true,
            search: "",
            second: false,
            showSoundcloudIframe: true,
        };
    },
    methods: {
        setShowMOre(show_more) {
            this.showSoundcloudIframe = show_more;
            console.log((this.showSoundcloudIframe = show_more));
        },
        toURL(dest) {
            this.$router.push(dest);
            this.second = false;
        },
        sendQuery() {
            this.$router.push({ path: `/search/${this.search}` });
        },
        searchVis() {
            if (this.hiddenSearch) {
                this.hiddenSearch = false;
            } else {
                this.hiddenSearch = true;
            }
        },
    },
};
</script>
<style lang="less" scoped>
.header {
    height: 1px;
}
.soundcloud-iframe {
    height: 144px;
}
nav {
    background-color: var(--color-bg);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 3;
    border-bottom: 1px solid;
    height: var(--header-height);
    >section.flex {
        height: 100%;
    }
    #search_sec {
        position: relative;
        .search {
            margin-left: 10px;
            cursor: pointer;
            width: 24px;
            height: 24px;
            position: relative;
            top: 27px;
        }
        .input {
            z-index: 5;
            position: absolute;
            right: 49px;
            width: 260px;
            max-width: 500px;
            padding: 10px 20px;
            margin: 12px 0;
            border-radius: 0px;
            border: 0px;
            color: black;
            &:hover,
            &:active,
            &:active {
                background-color: var(--color-primary-bg);
            }
            &:focus,
            &:focus-within,
            &focus-visible {
                outline: 1px solid var(--color-text);
            }
        }
    }
    #second_shadow {
        z-index: 4;
        width: ~"calc(100% - 0px)";
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        background-color: #00000040;
    }
    .second {
        color: var(--color-chat-text);
        z-index: 5;
        position: fixed;
        top: -2px;
        right: 0;
        height: ~"calc(100% + 2px)";
        width: 30%;
        background-color: #000;
        transition: 0.5s;
        #logo_white {
            display: block;
            margin: 2rem auto;
        }
        #back {
            cursor: pointer;
            top: 18px;
            position: absolute;
            right: 10px;
        }
        .main {
            margin: 0px 2rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            h3 {
                cursor: pointer;
                margin: 0;
                width: auto;
                a {
                    color: var(--color-chat-text);
                    text-decoration: none;
                    &:hover {
                        background-color: #9191912e;
                    }
                }
            }
        }
    }
    .nav {
        position: relative;
        align-items: center;
    }
    .flex {
        display: flex;
        justify-content: space-between;
    }
    .menu {
        padding-left: 2rem;
        h1 {
            color: black;
            cursor: pointer;
        }
        a {
            text-decoration: none;
        }
    }
    .navbar-right {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: var(--chat-width);
        min-width: var(--chat-min-width);
        height: 100%;
        box-sizing: border-box;
        padding-right: 2rem;
        gap: var(--padding);
        #radio {
            padding-left: var(--padding);
        }
    }
    .more {
        font-size: 0px;
        cursor: pointer;
        margin: auto 0;
    }
    @media (max-width: 1200px) {
        .nav {
            .menu {
                #bigshop {
                    display: none;
                }
            }
        }
        .nav,
        #search_sec {
            left: 0px;
            .input {
                left: -186px;
                max-width: 150px;
            }
        }
        .second {
            .main {
                width: 100%;
                padding: 2px 0px 2px 0px;
            }
        }
    }
    @media (max-width: 815) {
        .menu {
            display: none;
        }
        .nav {
            left: 5px;
        }
    }
}
</style>
