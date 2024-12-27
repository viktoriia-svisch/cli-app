<template>
    <section class="live-component">
        <div
            class="live-video__wrapper"
            :class="{ 'live-video__wrapper--open': openStreamAnimation }"
            v-if="shouldStreamExist"
        >
            <iframe
                :src="$config.VUE_APP_OWNCAST_STREAM"
                width="100%"
                title="Zest video stream"
                referrerpolicy="origin"
                allowfullscreen
            >
            </iframe>
        </div>
    </section>
</template>
<script>
export default {
    name: "Live",
    components: {},
    data() {
        return {
            interval: null,
            liveStatus: null,
            animationTimeout: null,
            openStreamAnimation: false,
            shouldStreamExist: false
        };
    },
    methods: {
        async getLiveStatus() {
            const response = await fetch(this.$config.VUE_APP_OWNCAST_STATUS_API);
            this.liveStatus = await response.json();
            if (this.shouldStreamExist === false && this.liveStatus.online === true) {
                this.openStream();
            } else if (this.shouldStreamExist === true && this.liveStatus.online === false) {
                this.closeStream();
            }
        },
        openStream() {
            console.log('opening video stream...');
            this.shouldStreamExist = true;
            clearTimeout(this.animationTimeout);
            this.animationTimeout = setTimeout(() => {
                this.openStreamAnimation = true;
            }, 100);
        },
        closeStream() {
            console.log('closing video stream...');
            this.openStreamAnimation = false;
            clearTimeout(this.animationTimeout);
            this.animationTimeout = setTimeout(() => {
                this.shouldStreamExist = false;
            }, 600);
        }
    },
    mounted() {
        this.getLiveStatus();
        this.interval = setInterval(() => {
            this.getLiveStatus();
        }, 5000);
    },
    unmounted() {
        clearInterval(this.interval);
        clearTimeout(this.animationTimeout);
    }
};
</script>
<style lang="less">
main {
    width: 100%;
}
.live-video__wrapper {
    border: 2px solid var(--color-text);
    interpolate-size: allow-keywords;
    height: 0;
    overflow: hidden;
    transition: height .6s ease-in;
}
.live-video__wrapper--open {
    height: auto;
}
iframe {
    width: 100%;
    aspect-ratio: 5/3;
    border: none;
    display: block;
    overflow: hidden;
    background-color: #fff;
    margin: 0 auto;
    font-family: Zest;
    body {
        --theme-text-display-font-family: Zest;
        --theme-text-body-font-family: Zest;
        --font-owncast-body: Zest;
        --font-owncast-display: Zest;
        --player-container-height: 100%;
    }
}
</style>
