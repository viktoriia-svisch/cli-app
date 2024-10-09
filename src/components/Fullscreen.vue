<template>
    <main>
        <NavBar
            :today_shows="today_shows"
            :color="color"
            :iframe_mix="iframe_mix"
        />
        <section class="global-container">
            <div
                class="main_section flex_center"
                :class="{ 'fullscreen__centred-chat': $route.path === '/chat' }"
            >
                <router-view
                    :key="$route.fullPath"
                    v-on:podcast="iframe_set"
                />
            </div>
            <Right />
        </section>
    </main>
</template>
<script>
import axios from "axios";
import NavBar from "./navbar/NavBar.vue";
import Right from "./common/Right.vue";
export default {
    name: "Fullscreen",
    props: ["color"],
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
.fullscreen__centred-chat {
    display: none;
}
</style>
