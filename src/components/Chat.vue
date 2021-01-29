<template>
  <section id="chat">
    <header>
      <img
        id="closechat"
        src="../assets/imgs/cross_icon.png"
        @click="$parent.chatting = false"
      />
      <h1>{{ $vuetify.t('$vuetify.chat.title') }}</h1>
      <a href="https:        <svg
          class="anim"
          version="1.0"
          xmlns="http:          width="157.000000pt"
          height="167.000000pt"
          viewBox="0 0 157.000000
            167.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,167.000000)
			scale(0.100000,-0.100000)"
            stroke="none"
            style="stroke-width: 20;stroke: white;stroke-dashoffset:24px;"
            fill="white"
          >
            <path
              d="M153 1570 c-42 -17 -43 -95 -2 -180 24 -50 84 -153 110
			-188 17 -22 16 -25 -15
			-76 -70 -117 -100 -279 -76 -412 32 -180 161 -348 325 -425 106 -50 175
			-63 295 -56 91 6 145 19 219 53 32 16 34 15 65 -13 17 -17 38 -35 46
			-41 8 -7 31 -26 50 -42 68 -59 168 -110 215 -110 38 0 44 3 55 30 7 18
			10 44 5 66 -8 45 -90 205 -146 284 l-41 59 20 38 c38
			71 52 124 59 212 15 221 -78 416 -259 537 -112 74 -196 99 -333 98 -83
			-1 -124 -6 -169 -22 l-59 -20 -81 67 c-91 75 -121 96 -186 128 -49 24
			-64 26 -97 13z m99 -84 c31 -19 89 -60 128 -92 l71 -59 -25 -20 c-13
			-11 -43 -35 -66 -54 -23 -18 -42 -32 -44 -30 -97 145 -161 289 -128
			289 5 0 34 -15 64 -34z m599 -186 c178 -34 336 -188 379 -369 32
			-135 1 -286 -83 -404 -39 -54 -108 -117 -130 -117 -21 0 -398 413 -506 554 -29 39 -56
			73 -60 76 -3
			3 -21 27 -40 54 l-35 49 50 45 c109 100 268 142 425 112z m-405 -354 c15 -22 41 -56
			59 -75 18 -20 85 -97 149 -171 65 -74 161 -179 213 -232 94 -96 95 -98 71 -107 -110
			-42 -238 -46 -338 -12 -211 73 -340 248 -340 466 0 89 10 133 47 217 l25 56 44 -51
			c24 -29 56 -70 70 -91z m819 -551 c19 -30 35 -58 35 -63 0 -5 9 -17 20 -27 11 -10
			20 -26 20 -36 0 -10 4 -20 9 -23 11 -7 35 -95 28 -102 -10 -11 -111 50 -199 121
			l-87 69 36 31 c21 16 48 42
			62 58 13 15 28 27 33 27 4 0 24 -25 43 -55z"
            ></path>
          </g>
        </svg>
      </a>
    </header>
    <section id="msg" v-chat-scroll>
      <span class="lmsg" v-for="(msg, i) in $parent.msgs" v-bind:key="i">
        <span v-if="msg.help" class="lhelp">{{ msg.pseudo }}</span>
        <span v-else class="lname">{{ msg.pseudo }}</span
        >{{ msg.msg }}
      </span>
    </section>
    <section id="send">
      <form id="chatSend" v-on:submit.prevent="send_msg">
        <section class="flexing">
          <input
            class="inputchat"
            id="pseudo"
            placeholder="Pseudonyme"
            type="text"
            name="listener"
            v-model="pseudo"
          />
          <button type="submit">{{ $vuetify.t('$vuetify.chat.send') }}</button>
        </section>
        <textarea
          class="inputchat"
          id="message"
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
  name: 'Chat',
  data() {
    return {
      msgs: [],
      pseudo: '',
      message: '',
    };
  },
  methods: {
    send_msg() {
      if (this.message == '' || this.message.length < 2 || this.pseudo == '') {
        this.message = '';
        return;
      }
      localStorage.setItem('username', this.pseudo);
      this.$socket.emit('msg', {pseudo: this.pseudo, msg: this.message});
      this.message = '';
    },
  },
  mounted() {
    this.pseudo = localStorage.getItem('username');
    if (this.pseudo === null) {
      const help = {
        pseudo: this.$vuetify.t('$vuetify.chat.help'),
        msg: this.$vuetify.t('$vuetify.chat.help_msg'),
        help: true,
      };
      this.$parent.msgs.push(help);
    }
  },
};
</script>
<style lang="less" scoped>
#chat {
  bottom: 0;
  position: fixed;
  right: 0;
  z-index: 4;
  height: ~'calc(100% - 70px)';
  width: 350px;
  border-left: 1px solid white;
  background-color: black;
  #closechat {
    height: 40px;
    background-color: white;
    cursor: pointer;
  }
  h1 {
    font-size: 36px;
    font-family: Bison;
    margin: 0;
  }
  header {
    background-color: black;
    color: white;
    text-align: center;
    display: flex;
    justify-content: space-between;
    margin: 10px 15px 3px 15px;
    border-bottom: 3px solid;
    padding-bottom: 5px;
    svg {
      height: 40px;
      width: 40px;
    }
  }
  #msg {
    overflow: auto;
    padding: 6px;
    display: flex;
    flex-direction: column;
    height: calc(100% - 165px);
    width: 330px;
    margin: 0 auto;
    .lmsg {
      font-family: Bison;
      font-size: 18px;
      margin-bottom: 6px;
      .lhelp {
        background-color: green;
        margin-right: 4px;
        padding: 1px 3px 1px 3px;
      }
      .lname {
        background-color: #870000;
        margin-right: 4px;
        padding: 1px 3px 1px 3px;
      }
    }
  }
  #send {
    width: 330px;
    margin: 5px auto;
    .flexing {
      margin-bottom: 3px;
    }
    #pseudo {
      border: 1px solid;
      width: 150px;
      height: 30px;
      margin-right: 4px;
    }
    button {
      background-color: white;
      border: 1px solid;
      font-weight: bold;
      cursor: pointer;
      bottom: 45px;
      right: 12px;
      width: 172px;
      height: 34px;
    }
    #message {
      width: 327px;
      bottom: 8px;
      height: 33px;
      background-color: black;
      color: white;
    }
  }
}
</style>
