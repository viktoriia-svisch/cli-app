<template>
    <aside
        :class="{ 'centred-chat': $route.path === '/chat' }"
        :style="`display: ${$route.path != '/events' ? 'initial' : 'none'};`"
    >
        <div>
            <Chat />
            <TimeTable
                class="timetable"
                v-if="!isChatOnly"
            />
        </div>
    </aside>
</template>
<script>
import Chat from "../common/Chat.vue";
import TimeTable from "./TimeTable";
export default {
    name: "right",
    components: {
        Chat,
        TimeTable,
    },
    computed: {
        isChatOnly() {
            const path = window.location.pathname.split("/")[1];
                        this.$route.name;
            return path === "chat";
        },
    },
};
</script>
<style lang="less" scoped>
aside {
    overflow: auto;
    height: 100%;
    padding: 2rem 2rem 2rem 1rem;
    box-sizing: border-box;
    width: var(--chat-width);
    min-width: var(--chat-min-width);
    background: var(--color-chat-bg);
    &.centred-chat {
        height: 100%;
        width: 60%;
        min-width: 280px;
        max-width: 900px;
        margin: auto;
        >div {
            height: 100%;
        }
    }
    &.sticked {
        position: sticky;
        top: -4rem;
    }
    .timetable {
        margin-top: 2rem;
    }
    @media (max-width: 815px) {
        margin-left: 0px;
    }
}
</style>
