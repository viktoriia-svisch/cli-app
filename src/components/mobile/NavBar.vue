<template>
    <nav>
        <section id="topnav">
            <img
                id="burger"
                @click="second = !second"
                src="../../assets/imgs/menu.png"
            />
            <router-link :to="{ path: '/' }"><img
                    class="logo"
                    alt="z⸱est radio"
                    height="70"
                    width="158"
                    src="../../assets/imgs/logo.png"
                />
            </router-link>
        </section>
        <section id="bottomnav">
            <Radio
                style="flex-grow: 1"
                :today_shows="today_shows"
                :iframe_update="iframe_mix"
                :style="`display: ${iframe_mix ? 'none' : 'flex'}`"
            />
            <IframeSC :iframe_mix="iframe_mix" />
            <img
                id="chaticon"
                src="../../assets/imgs/chat.svg"
                @click="chat = !chat"
            />
        </section>
        <section
            id="second"
            :style="`left: ${second ? '0' : '-100%'}`"
        >
            <img
                id="back"
                src="../../assets/imgs/back.png"
                width="30"
                @click="second = !second"
            />
            <img
                id="logo_white"
                @click="toURL('/')"
                alt="z⸱est radio"
                src="../../assets/imgs/logo_white.png"
                width="80"
            />
            <div
                id="link_sec"
                class="menu"
            >
                <h3 @click="toURL('/podcasts')">Podcasts</h3>
                <h3 @click="toURL('/calendar')">Calendrier</h3>
                <h3 @click="toURL('/residents')">Résident.e.s</h3>
                <h3 @click="toURL('/chat')">Chat</h3>
                <br />
                <h3 @click="toURL('/propose_show')">Proposer un show</h3>
                <h3>
                    <a
                        href="https:                        target="_blank"
                    >Soundcloud</a>
                </h3>
                <h3>
                    <a
                        href="https:                        target="_blank"
                    >Facebook</a>
                </h3>
                <h3>
                    <a
                        href="https:                        target="_blank"
                    >Instagram</a>
                </h3>
                <br />
                <h3 @click="toURL('/about')">About</h3>
            </div>
        </section>
        <section
            id="second_shadow"
            :style="`display: ${second ? 'initial' : 'none'}`"
            @click="second = !second"
        ></section>
        <section
            class="chat-box"
            :style="`right: ${chat ? '0' : '-100%'}`"
        >
            <div class="chat-box__header">
                <img
                    id="logo_white"
                    @click="toURL('/')"
                    alt="z⸱est radio"
                    src="../../assets/imgs/logo_white.png"
                    width="80"
                />
                <img
                    id="back"
                    src="../../assets/imgs/back.png"
                    width="30"
                    @click="chat = !chat"
                />
            </div>
            <Chat style="height: calc(100% - var(--header-height))" />
        </section>
        <section
            id="chat_shadow"
            :style="`display: ${chat ? 'initial' : 'none'}`"
            @click="chat = !chat"
        ></section>
    </nav>
</template>
<script>
import Radio from "../navbar/Radio.vue";
import Chat from "../common/Chat.vue";
import IframeSC from "../navbar/IframeSC.vue";
export default {
    name: "NavBar",
    props: ["today_shows", "iframe_mix"],
    components: {
        Radio,
        Chat,
        IframeSC,
    },
    data() {
        return {
            second: false,
            chat: false,
        };
    },
    methods: {
        close_mix() {
            this.$parent.iframe_mix = "";
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
nav {
    #topnav {
        z-index: 3;
        width: 100%;
        height: var(--header-height);
        background-color: white;
        position: fixed;
        top: 0px;
        border-bottom: 1px solid var(--color-text);
        display: flex;
        justify-content: center;
        align-items: center;
        a {
            width: 72px;
            .logo {
                width: 100%;
                height: auto;
            }
        }
        #burger {
            position: absolute;
            left: 1rem;
            width: 34px;
        }
    }
    #bottomnav {
        z-index: 3;
        width: 100%;
        height: var(--header-height);
        background-color: white;
        border-top: 1px solid var(--color-text);
        position: fixed;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 1rem;
        box-sizing: border-box;
        gap: 8px;
        #chaticon {
            width: 34px;
            padding: 3px;
        }
    }
    .chat-box {
        position: relative;
        z-index: 5;
        position: fixed;
        top: 0;
        height: 100%;
        width: 75%;
        background-color: var(--color-chat-bg);
        transition: 0.7s;
        color: white;
        &__header {
            height: var(--header-height);
            display: flex;
            #back {}
            #logo_white {
                margin: auto
            }
        }
    }
    #chat_shadow {
        z-index: 4;
        background-color: #00000040;
        width: 100%;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
    }
    #second {
        position: relative;
        z-index: 5;
        position: fixed;
        top: 0;
        height: 100%;
        width: 75%;
        background-color: var(--color-chat-bg);
        transition: 0.7s;
        color: white;
        #link_sec {
            padding: 2rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            a {
                text-decoration: none;
                color: white;
            }
        }
        #back {
            position: absolute;
            left: 0;
            top: 0;
            padding: 18px;
            width: 33px;
        }
        #logo_white {
            display: block;
            margin: 2rem auto;
        }
    }
    #second_shadow {
        z-index: 4;
        width: 100%;
        background-color: #00000040;
        height: 100vh;
        position: fixed;
        right: 0;
        top: 0;
    }
    @media (max-width: 350px) {
        #second {
            width: 100%;
        }
        .chat-box {
            width: 100%;
        }
    }
    @media (max-height: 530px) {
        #second {
            #link_sec {
                h3 {
                    font-size: 14px;
                }
            }
        }
    }
    @media (max-height: 430px) {
        #second {
            #link_sec {
                h3 {
                    font-size: 12px;
                }
            }
        }
    }
    @media (max-height: 390px) {
        #second {
            #link_sec {
                h3 {
                    font-size: 10px;
                }
            }
        }
    }
}
</style>
