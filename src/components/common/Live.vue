<template>
    <section class="live-component" :style="{ 'display': streamIsOpen || streamLoading ? 'block' : 'none' }">
        <div class="live-video__wrapper">
            <div v-if="streamLoading" class="live-video__wrapper--animation"></div>
            <video class="live-video" id="zest-live" @click="videoElement.play()" muted autoplay></video>
        </div>
    </section>
</template>
<script>
export default {
    name: "Live",
    components: {},
    data() {
        return {
            streamRoute: 'https:            streamKey: 'cest-le-zuper-ztream',
            streamExtension: '.m3u8',
            streamUri: '',
            hls: null,
            Hls: null,
            videoElement: null,
            streamIsOpen: false,
            streamLoading: false,
            interval: null,
            message: '',
            fetchStream: Promise,
        };
    },
    methods: {
        initHls() {
            if (!Hls && !Hls.isSupported()) {
                return;
            }
            const config = {
                liveMaxLatencyDurationCount: 10
            }
            this.Hls = Hls;
            this.Hls.DefaultConfig.liveMaxLatencyDurationCount= 10
            this.hls = new Hls();
        },
        loadManifest() {
            if (!this.Hls) {
                return;
            }
            this.streamLoading = true;
            this.hls.on(this.Hls.Events.MANIFEST_PARSED, () => {
                            });
            this.hls.on(this.Hls.Events.STEERING_MANIFEST_LOADED, () => {
                            });
            this.hls.on(this.Hls.Events.INIT_PTS_FOUND, () => {
                                this.message = "ça ztream !!";
                this.streamIsOpen = true;
                this.streamLoading = false;
            });
            this.errorHandling();
            this.hls.loadSource(this.streamUri);
            this.hls.attachMedia(this.videoElement);
        },
        errorHandling() {
            this.hls.on(this.Hls.Events.ERROR, (event, data) => {
                                                let errorFatal = data.fatal;
                if (errorFatal) {
                    switch (data.type) {
                        case this.Hls.ErrorTypes.MEDIA_ERROR:
                                                        this.hls.recoverMediaError();
                            break;
                        case this.Hls.ErrorTypes.NETWORK_ERROR:
                                                                                                                                                                        this.terminateStream();
                            break;
                        default:
                                                                                    this.message = 'C PT';
                            this.terminateStream();
                            break;
                    }
                }
            });
        },
        terminateStream() {
            this.message = 'ah bah ça ztream plus :\'('
            this.hls.destroy();
            this.streamIsOpen = false;
            setTimeout(() => {
                this.setStreamListener();
            }, 3000)
        },
        async setStreamListener() {
            this.message = '...'
                        await this.checkForStream();
            if (this.streamLoading) {
                return;
            }
            clearInterval(this.interval);
            this.interval = setInterval(async () => {
                                await this.checkForStream();
            }, 10000)
        },
        checkForStream() {
            return new Promise((resolve) => {
                try {
                    fetch(this.streamUri).then(() => {
                        clearInterval(this.interval);
                        this.message = 'Oh !! il se passe qqch !'
                        this.initHls();
                        this.loadManifest();
                        resolve();
                    }).catch(() => {
                        this.streamIsOpen = false;
                                                resolve();
                    });
                } catch {
                    resolve();
                }
            });
        }
    },
    mounted() {
        this.videoElement = document.getElementById('zest-live');
        this.streamUri = `${this.streamRoute}${this.streamKey}${this.streamExtension}`;
        this.setStreamListener();
    },
    unmounted() {
        clearInterval(this.interval);
    }
};
</script>
<style lang="less" scoped>
main {
    width: 100%;
}
@keyframes loader {
    0% {
        transform: translateX(-50%);
    }
    100% {
        transform: translateX(120%);
    }
}
.live-component {
    margin-bottom: 2rem;
}
.live-video__wrapper {
    border: 2px var(--color-primary) solid;
    width: 100%;
    background-image: url('../../assets/imgs/logo.png');
    background-repeat: no-repeat;
    background-size: 40%;
    background-position: center;
    background-color: var(--color-primary-bg);
    backdrop-filter: opacity(40%);
    position: relative;
    overflow: hidden;
    video {
        width: 100%;
    }
}
.live-video__wrapper--animation {
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    animation: loader 1.6s linear 0s infinite forwards;
}
.live-video__wrapper--animation::after {
    content: '';
    width: 20%;
    height: 200%;
    display: block;
    position: absolute;
    top: -50%;
    left: 0;
    rotate: 45deg;
    opacity: .6;
    background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
}
</style>
