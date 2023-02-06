<template>
  <section id="chat">
    <span class="subtitle" id="chat_title">La chatroom</span>
    <section id="msg" ref="msg">
      <tr class="lmsg" v-for="(msg, i) in msgs" v-bind:key="i">
        <td class="tmsg" :title="new Date(msg.ts).toLocaleDateString('fr')">
          {{
            new Date(msg.ts).toLocaleTimeString("fr", {
              hour: "2-digit",
              minute: "2-digit",
            })
          }}
        </td>
        <td>
          <span class="lname">{{ msg.pseudo }}</span>
          <span class="lmsg">{{ msg.msg }}</span>
        </td>
      </tr>
    </section>
    <section id="send">
      <form id="chatSend" v-on:submit.prevent="send_msg">
        <input
          v-if="!hiddenPseudo"
          class="inputchat"
          id="pseudo"
          placeholder="Pseudonyme"
          style="resize: none;"
          type="text"
          name="listener"
          v-model="pseudo"
        />
        <input
          class="inputchat"
          id="message"
          style="resize: none;"
          placeholder="Message"
          name="message"
          rows="1"
          v-model="message"
          v-on:keyup.enter="send_msg"
        />
      </form>
    </section>
  </section>
</template>
<script>
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
        return;       }
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
    },
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
      const help = {
        ts: new Date(),
        pseudo: "Help",
        msg:
          "Dont be shy, join in the conversation by typing your name and message!",
        help: true,
      };
      this.msgs = this.msgs.concat(help);
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
  color: white;
  width: 300px;
  #chatSend {
    margin-top: 4px;
    .inputchat {
      width: 100%;
      padding: 5px 17px 6px 17px;
      margin: 4px 0;
      box-sizing: border-box;
      font-family: NexaBold;
      border-radius: 0px;
      border: 0px;
      color: white;
      background-color: #ffffff40;
    }
  }
  #msg {
    margin-top: 15px;
    overflow: auto;
    height: 290px;
    background-color: #2b2b2b3b;
    .lmsg {
      font-family: NexaLight;
      word-wrap: anywhere;
      .tmsg {
        background-color: #00000030;
        display: inline-block;
        width: 48px;
        padding: 5px 4px 1px 5px;
        margin-left: 5px;
        margin-right: 10px;
      }
      .mmsg {
        letter-spacing: -1px;
      }
      .lhelp {
        background-color: #2a771430;
        margin-right: 20px;
        font-family: NexaBold;
      }
      .lname {
        margin-right: 20px;
        font-family: NexaBold;
        display: block;
      }
    }
  }
  @media (max-width: 815px) {
    max-width: initial;
    margin: 0;
    width: 100%;
    height: 100%;
    position: relative;
    #chat_title {
      display: none;
    }
    #send {
      position: absolute;
      bottom: 88px;
      width: 100%;
    }
    #msg {
      height: ~"calc(100% - 200px)";
      margin-top: 0px;
    }
  }
}
</style>
