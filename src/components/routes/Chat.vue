<template>
    <section
        id="chat"
        :class="{ 'chat-only': isChatOnly }"
    >
        <router-link
            id="chattitle"
            :to="{ path: '/chat' }"
        >
            <h3
                class="title"
                id="chat_title"
            >La chatroom</h3>
            <img
                src="../../assets/imgs/open_link_icon.png"
                class="open_link"
            />
        </router-link>
        <section
            id="messages"
            ref="msg"
        >
            <div
                class="message"
                v-for="(msg, i) in msgs"
                v-bind:key="i"
            >
                <div
                    class="message__day"
                    v-if="msg.date"
                >
                    {{ new Date(msg.date).toLocaleDateString("fr", {
                        weekday: 'long',
                        month: "2-digit",
                        day: "2-digit",
                    }) }}</div>
                <span style="display: inline-block">
                    <div class="message__author-time">
                        <span>{{ msg.pseudo }}</span>
                        <span :title="new Date(msg.ts).toLocaleDateString('fr')">
                            {{
                                new Date(msg.ts).toLocaleTimeString("fr", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })
                            }}
                        </span>
                    </div>
                    <div class="message__body">{{ msg.msg }}</div>
                </span>
            </div>
        </section>
        <section id="send">
            <form
                id="chatSend"
                v-on:submit.prevent="send_msg"
            >
                <input
                    v-if="!hiddenPseudo"
                    class="inputchat"
                    id="pseudo"
                    placeholder="Pseudonyme"
                    style="resize: none"
                    type="text"
                    name="listener"
                    v-model="pseudo"
                />
                <textarea
                    class="inputchat"
                    id="message"
                    style="resize: none"
                    placeholder="Message ..."
                    name="message"
                    rows="1"
                    v-model="message"
                    v-on:keyup.enter="send_msg"
                />
            </form>
        </section>
    </section>
</template>
<script lang="ts">
export default {
    name: "Chat",
    data() {
        return {
            msgs: [],
            pseudo: "",
            hiddenPseudo: true,
            localUser: "user_v2",
            message: "",
        };
    },
    computed: {
        isChatOnly() {
            const path = window.location.pathname.split("/")[1];
                        this.$route.name;
            return path === "chat";
        },
    },
    methods: {
        send_msg() {
            if (this.pseudo.length == 0) {
                return;
            }
            if (this.message == "" || this.message.length < 2 || this.pseudo == "") {
                this.message = "";
                return;
            }
            if (this.message[0] == "!") {
                const expr = /^!pseudo\s((?!!pseudo).*)/g;
                const matches = expr.exec(this.message);
                if (matches != null) {
                    this.pseudo = matches[1];
                    localStorage.setItem(this.localUser, this.pseudo);
                }
                this.message = "";
                return;             }
            this.hiddenPseudo = true;
            localStorage.setItem(this.localUser, this.pseudo);
            this.$socket.emit("msg", { pseudo: this.pseudo, msg: this.message });
            this.message = "";
        },
        rcv_msgs(msgs) {
            this.msgs = this.msgs.concat(msgs);
            setTimeout(() => {
                this.$refs.msg.scrollTop = this.$refs.msg.scrollHeight;
            }, 100);
            this.display_days();
        },
        display_days() {
            let previous_day;
            for (const message of this.msgs) {
                const msgDate = new Date(message.ts);
                if (previous_day && msgDate.getMonth() === previous_day.getMonth() && msgDate.getDate() === previous_day.getDate()) {
                    message.date = null;
                } else {
                    message.date = message.ts;
                }
                previous_day = new Date(message.ts);
            }
        }
    },
    sockets: {
        listen(msgs) {
            this.rcv_msgs(msgs);
        },
        msg(message) {
            this.rcv_msgs(message);
        },
    },
    mounted() {
        this.pseudo = localStorage.getItem(this.localUser);
        if (this.pseudo === null || this.pseudo == "") {
            localStorage.setItem(this.localUser, "");
            this.hiddenPseudo = false;
        } else {
            this.hiddenPseudo = true;
        }
    },
};
</script>
<style lang="less" scoped>
#chat {
    color: var(--color-chat-text);
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .message__day {
        font-size: .8rem;
        text-align: center;
        color: var(--color-chat-text-light);
        padding: 8px 0 12px 0;
        margin: 0 8px;
    }
    #chattitle {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        margin-bottom: 0.5rem;
        color: var(--color-chat-text);
        text-decoration: none;
        .title {
            margin: 0;
        }
        .open_link {
            height: 24px;
            position: relative;
        }
        &:hover {
            color: var(--color-primary);
        }
    }
    #chatSend {
        .inputchat {
            width: 100%;
            padding: 0.5rem 1rem;
            margin: 0 0 0.5rem 0;
            box-sizing: border-box;
            border-radius: 0px;
            border: 1px solid var(--color-chat-text);
            color: var(--color-chat-text);
            background-color: var(--color-chat-bg);
            &#message {
                min-height: 3rem;
            }
            &:hover {
                border-color: var(--color-primary);
            }
            &:focus-visible,
            &:focus {
                border-color: var(--color-primary);
                outline: 1px solid var(--color-primary);
            }
        }
    }
    #messages {
        padding-right: 4px;
        padding-top: 4px;
        overflow: auto;
        height: 320px;
        border-top: 1px solid var(--color-chat-text-light);
        .message {
            word-wrap: anywhere;
            margin-bottom: 1rem;
            &__author-time {
                color: var(--color-chat-text-light);
                display: flex;
                gap: 2rem;
                justify-content: space-between;
                font-size: 0.8rem;
            }
        }
    }
    &.chat-only {
        height: 100%;
        #messages {
            height: 100%;
        }
    }
    @media (max-width: 815px) {
        max-width: initial;
        margin: 0;
        width: 100%;
        height: calc(100% - 5.5rem);
        position: relative;
        padding: 0 0.5rem;
        #chattitle {
            display: none;
        }
        #messages {
            height: 290px;
            flex-grow: 1;
        }
    }
}
</style>
