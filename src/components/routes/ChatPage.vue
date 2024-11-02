<template>
    <section id="chat-page">
        <Live class="live-in-page"></Live>
        <Chat class="chat-in-page"></Chat>
    </section>
</template>
<script lang="ts">
import Live from "../common/Live.vue";
import Chat from "../common/Chat.vue";
export default {
    name: "ChatPage",
    components: {
        Live,
        Chat
    },
    data() {
        return {};
    },
    computed: {
    },
    methods: {
    },
    sockets: {
    },
    mounted() {
    },
};
</script>
<style lang="less" scoped>
#chat-page {
    display: flex;
    flex-direction: column;
}
#chat-page,
.chat-in-page {
    height: 100%;
    width: 100%;
}
.chat-in-page {
    overflow: hidden;
}
.live-in-page {
    margin: auto !important;
}
@media (min-width: 815px) {
    .chat-in-page {
        display: none !important;
    }
}
@media (max-width: 815px) {
    .live-in-page {
        max-width: 500px;
    }
}
</style>
