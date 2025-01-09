<template>
    <div
        id="app"
        :style="'background-color:' + color + ';'"
    >
        <div
            v-if="innerWidth >= 815"
            class="bg"
        >
            <Fullscreen
                :color="color"
                style="height: 100%; display: flex; flex-direction: column"
            />
        </div>
        <div
            v-else
            class="bg"
        >
            <Mobile style="height: 100%; display: flex; flex-direction: column" />
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Fullscreen from "./components/Fullscreen.vue";
import Mobile from "./components/mobile/Mobile.vue";
export default {
    name: "App",
    components: {
        Fullscreen,
        Mobile,
    },
    data() {
        return {
            color: "#FFFFFF",
            bg: this.$config.VUE_APP_API + "/upload/background?t=" + new Date().getTime(),
            bg_mb:
                this.$config.VUE_APP_API + "/upload/background_mobile?t=" + new Date().getTime(),
            innerWidth: window.innerWidth,
        };
    },
    mounted() {
        window.addEventListener("resize", () => {
            this.innerWidth = window.innerWidth;
        });
        axios
            .get(`${this.$config.VUE_APP_API}/upload/color?t=${new Date().getTime()}`)
            .then((response) => {
                this.color = response.data.color;
            });
    },
};
</script>
<style lang="less">
@font-face {
    font-family: Zest;
    src: url("./assets/fonts/RetinaMP-Medium.otf");
    font-weight: 500;
}
@font-face {
    font-family: Zest;
    src: url("./assets/fonts/RetinaMP-Book.otf");
    font-weight: 400;
}
@font-face {
    font-family: Zest;
    src: url("./assets/fonts/RetinaMP-Light.otf");
    font-weight: 300;
}
@font-face {
    font-family: Zest;
    src: url("./assets/fonts/RetinaMP-Bold.otf");
    font-weight: 600;
}
@font-face {
    font-family: ZestCondensed;
    src: url("./assets/fonts/RetinaMPCondensed-Book.otf");
    font-weight: 400;
}
@font-face {
    font-family: ZestNarrow;
    src: url("./assets/fonts/RetinaMPNarrow-Book.otf");
    font-weight: 400;
}
:root {
    --color-primary: #fdd042;
    --color-primary-lighter: #fdecb4;
    --color-primary-bg: #fdd14269;
    --color-bg: #fffefd;
    --color-text: #000000;
    --color-text-light: hsl(37, 4%, 36%);
    --color-chat-bg: #0f0e00;
    --color-chat-text: #fffffffa;
    --color-chat-text-light: #bdbdbd;
        --chat-width: 30%;
    --chat-min-width: 200px;
    --header-height: 42px;
    --padding: 8px;
        --phone: 430px;
    --tablet: 815px;
    font-size: 14px;
}
::-webkit-scrollbar-track {
    border: 1px solid var(--color-text);
    border-width: 0 1px;
    box-sizing: border-box;
    padding: 4px;
    display: block;
    &:horizontal {
        border-width: 1px 0;
    }
}
::-webkit-scrollbar {
    width: 14px;
    height: 14px;
}
::-webkit-scrollbar-track {
    background: var(--color-bg);
}
::-webkit-scrollbar-thumb {
    cursor: pointer;
    background-image: url('assets/imgs/grain.jpg');
    background-size: 110px;
    border: 1px solid var(--color-text);
}
::-webkit-scrollbar-thumb:hover {
    }
::-webkit-scrollbar-button:single-button {
    cursor: pointer;
    background-color: var(--color-bg);
    height: 14px;
    width: 14px;
    border: 1px solid var(--color-text);
    border-width: 0 1px;
    display: block;
    background-size: 10px;
    background-position: center 4px;
    background-repeat: no-repeat;
}
::-webkit-scrollbar-button:single-button:vertical:decrement {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http:}
::-webkit-scrollbar-button:single-button:vertical:decrement:hover {
    background-color: var(--color-primary);
}
::-webkit-scrollbar-button:single-button:vertical:increment {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http:}
::-webkit-scrollbar-button:vertical:single-button:increment:hover {
    background-color: var(--color-primary);
}
::-webkit-scrollbar-button:single-button:horizontal {
    border-width: 1px 0;
    height: 12px;
    width: 12px;
    background-position: 3px 1px;
}
::-webkit-scrollbar-button:single-button:horizontal:decrement {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http:}
::-webkit-scrollbar-button:single-button:horizontal:decrement:hover {
    background-color: var(--color-primary);
}
::-webkit-scrollbar-button:single-button:horizontal:increment {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http:}
::-webkit-scrollbar-button:single-button:horizontal:increment:hover {
    background-color: var(--color-primary);
}
body {
    margin: 0;
    font-family: Zest;
    font-weight: 300;
    height: calc(100% - var(--header-height));
    overflow: hidden;
    textarea,
    input {
        font-family: Zest;
    }
    #app {
        height: 100%;
        .bg_img {
            position: fixed;
            z-index: 0;
            top: 0;
            left: 0;
            min-width: 100%;
            height: 100%;
        }
        .bg {
            position: relative;
            z-index: 1;
            height: 100%;
            background: var(--color-bg);
        }
        .global-container {
            padding-top: var(--header-height);
            box-sizing: border-box;
            display: flex;
            width: 100%;
            height: 100%;
        }
        .main_section {
            padding: 2rem;
            box-sizing: border-box;
            width: 70%;
            &.flex_center {
                gap: 2rem;
                overflow: auto;
                height: 100%;
            }
            @media (max-width: 815px) {
                width: 100%;
            }
        }
    }
    .flex {
        display: flex;
        justify-content: space-between;
    }
    .flex_center {
        display: flex;
        justify-content: center;
    }
    .marged {
        margin: 1rem 2rem;
    }
    .margin-top-0 {
        margin-top: 0;
    }
    h3.title,
    h2.title,
    h1.title {
        font-size: 2rem;
        line-height: 3rem;
        margin-bottom: .5rem;
        margin-top: 1rem;
        display: inline-block;
        font-family: Zest;
        font-weight: 600;
        letter-spacing: -.7px;
        &--mt-0 {
            margin-top: 0;
        }
    }
    nav {
        .menu {
            flex-shrink: 1;
            gap: 1rem .5rem;
            align-items: flex-start;
            overflow: hidden;
            > :first-child {
                padding-right: 2rem;
            }
            h1,
            h2,
            h3 {
                padding: 0 1rem;
                margin: 0;
                position: relative;
                overflow: hidden;
                transition: all 0.3s;
                font-weight: 300;
                border: 1px solid transparent;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &::before {
                    content: "";
                    display: block;
                    position: absolute;
                    width: calc(100% + 2rem);
                    transition: all 0.3s;
                    transform: translateX(calc(-100% - 2rem));
                    z-index: -1;
                    height: 100%;
                }
                &:hover {
                    transform: skewX(-8deg);
                    color: var(--color-text);
                    a {
                        color: var(--color-text) !important;
                    }
                    &::before {
                        transform: translateX(-1rem);
                        background-color: var(--color-primary);
                    }
                }
            }
            a {
                flex-shrink: 1;
                overflow: hidden;
                padding: 0 2px;
            }
            a.router-link-active {
                h1,
                h2,
                h3 {
                    transform: skewX(-8deg);
                    border: 1px solid var(--color-text);
                    a {
                        color: var(--color-bg) !important;
                    }
                    &::before {
                        transform: translateX(-1rem);
                        background-color: var(--color-primary);
                    }
                }
            }
        }
    }
    .button {
        cursor: pointer;
        padding: 0.1rem 1rem;
        border: 1px solid var(--color-text);
        transition: all 0.2s;
        &:hover {
            background-color: var(--color-primary);
        }
    }
    .round-button {
        cursor: pointer;
        border-radius: 50%;
        transition: all 0.2s;
        &:hover {
            background-color: var(--color-primary);
        }
    }
    .genre {
        position: relative;
        font-size: 1rem;
        cursor: pointer;
        padding: 0.1rem 0.4rem 0.1rem 0;
        display: inline;
        color: var(--color-text-light);
        transition: all 0.2s;
        border-bottom: 1px solid transparent;
        a {
            color: var(--color-text-light);
            text-decoration: none;
        }
        &:hover {
            background-color: var(--color-primary);
        }
    }
    .player-title {
        position: relative;
        border-inline: solid 1px var(--color-text);
        flex-grow: 1;
    }
    @media (max-width: 1200px) {
        nav .menu {
            gap: 1rem .5rem;
        }
    }
    @media (max-width: 1000px) {
        nav .menu {
            gap: 1rem 0.5rem;
        }
    }
    @media (max-width: 815px) {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        #app {
            .bg {
                min-height: ~"calc(100vh - 100px)";
                padding-bottom: 15px;
            }
            .main_section {
                flex-direction: column;
                justify-content: flex-start;
                padding: 2rem 1rem 6rem 1rem;
                margin-bottom: 0;
            }
        }
        .marged {
            margin: 0rem auto 0px auto;
        }
        .mobile_pods .podcast {
            width: 230px !important;
            flex-shrink: 0;
        }
        h3.title,
        h2.title,
        h1.title {
            font-size: 1.2rem;
        }
        h1.title {
            font-size: 1.5rem;
        }
    }
    @media (max-width: 430px) {
        h3.title,
        h2.title,
        h1.title {
            font-size: 1.5rem;
        }
        h1.title {
            font-size: 2rem;
        }
        .mobile_pods .podcast .podimg {
            width: 230px !important;
        }
    }
}
</style>
