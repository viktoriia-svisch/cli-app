<template>
    <main>
        <NavBar
            :today_shows="today_shows"
            :iframe_mix="iframe_mix"
        />
        <section class="global-container">
            <div
                class="main_section flex_center"
                :class="{ 'main-chat': $route.path === '/chat' }"
            >
                <router-view
                    :key="$route.fullPath"
                    v-on:podcast="iframe_set"
                />
            </div>
            <Right style="display: none" />
        </section>
    </main>
</template>
<script>
import axios from "axios";
import NavBar from "./NavBar.vue";
import Right from "../common/Right.vue";
export default {
    name: "Mobile",
    components: {
        NavBar,
        Right,
    },
    data() {
        return {
            today_shows: [],
            iframe_mix: "",
        };
    },
    methods: {
        iframe_set(pod) {
            this.iframe_mix = pod;
        },
    },
    async mounted() {
        const id = this.$route.params.mix_id;
        if (id) {
            await axios
                .get(`${this.$config.VUE_APP_API}/sounds/tracks/${id}`)
                .then((res) => {
                    this.iframe_mix = res.data;
                    this.iframe_mix.autoplay = false;
                })
                .catch(() => {
                    this.$router.push({ path: "/" });
                });
        }
    },
};
</script>
<style lang="less" scoped>
main {
    .main_section {
        margin-bottom: 80px;
    }
    .global-container {
        height: calc(100% - var(--header-height)) !important;
    }
    .global-container .main_section.flex_center.main-chat {
        padding: 0 !important;
        background-color: var(--color-chat-bg);
    }
}
</style>
