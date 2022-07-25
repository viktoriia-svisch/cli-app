<template>
  <section id="chat">
    <span class="subtitle">La chatroom</span>
    <section id="msg" v-chat-scroll>
      <tr class="lmsg" v-for="(msg, i) in msgs" v-bind:key="i">
        <td class="tmsg">
          <span class="tmsg" :title="new Date(msg.ts).toLocaleDateString('fr')">{{
            new Date(msg.ts).toLocaleTimeString("fr", {
              hour: "2-digit",
              minute: "2-digit",
            })
          }}</span>
        </td>
        <td>
          <span class="lname">{{ msg.pseudo }}</span>
          <span class="lmsg">{{ msg.msg }}</span>
        </td>
      </tr>
    </section>
    <section id="send">
      <form id="chatSend" v-on:submit.prevent="send_msg">
        <textarea
          v-if="!hiddenPseudo"
          class="inputchat"
          id="pseudo"
          placeholder="Pseudonyme"
          style="resize: none;"
          type="text"
          name="listener"
          v-model="pseudo"
        ></textarea>
        <textarea
          class="inputchat"
          id="message"
          style="resize: none;"
          placeholder="Message"
          name="message"
          rows="1"
          v-model="message"
          v-on:keyup.enter="send_msg"
        ></textarea>
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
      this.hiddenPseudo = true;
      localStorage.setItem(this.localUser, this.pseudo);
      this.$socket.emit("msg", { pseudo: this.pseudo, msg: this.message });
      this.message = "";
    },
  },
  sockets: {
    listen(msgs) {
      this.msgs = this.msgs.concat(msgs);
    },
    msg(message) {
      this.msgs = this.msgs.concat(message);
    },
  },
  mounted() {
    this.pseudo = localStorage.getItem(this.localUser);
    if (this.pseudo === null) {
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
      height: 45px;
      padding: 12px 20px;
      margin: 4px 0;
      box-sizing: border-box;
      font-family: KionaBold;
      border-radius: 0px;
      border: 0px;
      color: white;
      background-color: #ffffff40;
      background-image: url("../assets/imgs/play_white.svg");
      background-repeat: no-repeat;
      background-size: 30px 30px;
      background-position: right 10px top 6px;
    }
  }
  #msg {
    margin-top: 15px;
    overflow: auto;
    height: 290px;
    background-color: #2b2b2b3b;
    .lmsg {
      font-family: Kiona;
      .tmsg {
        background-color: #00000030;
        display: inline-block;
        width: 45px;
        padding-top: 0px;
        padding-left: 6px;
        padding-bottom: 1px;
        margin-right: 10px;
      }
      .mmsg {
        letter-spacing: -1px;
      }
      .lhelp {
        background-color: #2a771430;
        margin-right: 20px;
        font-family: KionaBold;
      }
      .lname {
        margin-right: 20px;
        font-family: KionaBold;
      }
    }
  }
  @media (max-width: 770px) {
    max-width: 330px;
    margin: 60px auto 0px auto;
  }
}
</style>
