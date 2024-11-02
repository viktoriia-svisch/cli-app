<template>
    <section
        class="live-component"
        :style="{ 'display': streamIsOpen || streamLoading ? 'block' : 'none' }"
    >
        <div class="live-video__wrapper">
            <div
                v-if="streamLoading"
                class="live-video__wrapper--animation"
            ></div>
            <video
                class="live-video"
                id="zest-live"
                @click="videoElement.play()"
                muted
                autoplay
            ></video>
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
            this.Hls = Hls;
                        this.hls = new Hls();
        },
        loadManifest() {
            if (!this.Hls) {
                return;
            }
            this.streamLoading = true;
            this.hls.on(this.Hls.Events.MANIFEST_PARSED, (data) => {
                console.log(event, data);
            });
            this.hls.on(this.Hls.Events.STEERING_MANIFEST_LOADED, (data) => {
                console.log('steering what ?', event, data);
            });
            this.hls.on(this.Hls.Events.INIT_PTS_FOUND, (data) => {
                console.log('c\'est chargé !', event, data);
                this.message = "ça ztream !!";
                this.streamIsOpen = true;
                this.streamLoading = false;
            });
            this.hls.on(this.Hls.Events.MEDIA_ERROR, (data) => {
                console.log('c\'est chargé !', event, data);
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
                                                console.log('error: ', event, data);
                let errorFatal = data.fatal;
                if (errorFatal) {
                    switch (data.type) {
                        case this.Hls.ErrorTypes.MEDIA_ERROR:
                            console.log('fatal media error encountered, try to recover');
                            this.hls.recoverMediaError();
                            break;
                        case this.Hls.ErrorTypes.NETWORK_ERROR:
                                                                                                                                                                        console.log('network error', data)
                            this.terminateStream();
                            break;
                        default:
                                                        console.error('c pt ', data)
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
            console.log('SetStreamListener');
            await this.checkForStream();
            if (this.streamLoading) {
                return;
            }
            clearInterval(this.interval);
            this.interval = setInterval(async () => {
                console.log('allo ?');
                if (!this.streamLoading && !this.streamIsOpen) {
                    await this.checkForStream();
                }
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
                        console.log('pas de stream');
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
    box-sizing: border-box;
    border: 4px var(--color-primary) solid;
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
        display: block;
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
.video-logo {
    position: absolute;
    top: 10px;
    left: 20px;
    width: 80px;
    opacity: .6;
}
</style>
