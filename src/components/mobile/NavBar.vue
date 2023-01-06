<template>
  <nav>
    <section id="topnav">
      <img
        id="burger"
        @click="second = !second"
        src="../../assets/imgs/menu.png"
      />
      <router-link :to="{ path: '/' }"
        ><img
          v-if="$route.path != '/events'"
          class="logo"
          alt="ODC Live"
          height="70"
          width="158"
          src="../../assets/imgs/logo.png"
        />
        <img
          v-else
          class="logo"
          src="../../assets/imgs/events.png"
          height="70"
          width="158"
        />
      </router-link>
    </section>
    <section id="bottomnav">
      <Radio
        :today_shows="today_shows"
        :iframe_update="iframe_mix"
        :style="`display: ${iframe_mix ? 'none' : 'flex'}`"
      />
      <img
        id="chaticon"
        src="../../assets/imgs/chat.svg"
        @click="chat = !chat"
      />
      <IframeSC :iframe_mix="iframe_mix" />
    </section>
    <section id="second" :style="`left: ${second ? '0' : '-100%'}`">
      <img
        id="back"
        src="../../assets/imgs/back.png"
        width="30"
        @click="second = !second"
      />
      <img
        id="logo_white"
        @click="toURL('/')"
        alt="ODC Live"
        src="../../assets/imgs/logo_white.png"
        width="140"
      />
      <div id="link_sec">
        <h3 @click="toURL('/podcasts')">Podcasts</h3>
        <h3 @click="toURL('/events')">Events</h3>
        <h3 @click="toURL('/calendar')">Calendrier</h3>
        <h3 @click="toURL('/shop')">Shop</h3>
        <br />
        <h3 @click="toURL('/propose_show')">Proposer un show</h3>
        <h3>
          <a href="https:            >Soundcloud</a
          >
        </h3>
        <h3>
          <a href="https:        </h3>
        <h3>
          <a href="https:        </h3>
        <br />
        <h3 @click="toURL('/about')">About</h3>
      </div>
    </section>
    <section
      id="second_shadow"
      :style="`display: ${second ? 'initial' : 'none'}`"
      @click="second = !second"
    ></section>
    <section id="chat_box" :style="`right: ${chat ? '0' : '-100%'}`">
      <img
        id="logo_white"
        @click="toURL('/')"
        alt="ODC Live"
        src="../../assets/imgs/logo_white.png"
        width="140"
      />
      <img
        id="back"
        src="../../assets/imgs/back.png"
        width="30"
        @click="chat = !chat"
      />
      <Chat />
    </section>
    <section
      id="chat_shadow"
      :style="`display: ${chat ? 'initial' : 'none'}`"
      @click="chat = !chat"
    ></section>
  </nav>
</template>
<script>
import Radio from "../Radio.vue";
import Chat from "../Chat.vue";
import IframeSC from "../IframeSC.vue";
export default {
  name: "NavBar",
  props: ["today_shows", "iframe_mix"],
  components: {
    Radio,
    Chat,
    IframeSC,
  },
  data() {
    return {
      second: false,
      chat: false,
    };
  },
  methods: {
    close_mix() {
      this.$parent.iframe_mix = "";
    },
    toURL(dest) {
      this.$router.push(dest);
      this.second = false;
    },
    sendQuery() {
      this.$router.push({ path: `/search/${this.search}` });
    },
    searchVis() {
      if (this.hiddenSearch) {
        this.hiddenSearch = false;
      } else {
        this.hiddenSearch = true;
      }
    },
  },
};
</script>
<style lang="less" scoped>
nav {
  #topnav {
    z-index: 3;
    width: 100%;
    height: 70px;
    background-color: white;
    position: fixed;
    top: -1px;
    display: flex;
    justify-content: center;
    a {
      width: 158px;
      .logo {
        height: 100%;
      }
    }
    #burger {
      position: absolute;
      left: 0;
      top: 0;
      padding: 18px;
      width: 33px;
    }
  }
  #bottomnav {
    z-index: 3;
    width: 100%;
    height: 70px;
    background-color: white;
    position: fixed;
    bottom: -1px;
    display: flex;
    #chaticon {
      position: absolute;
      right: 0;
      bottom: 0;
      padding: 15px;
      width: 40px;
      height: 40px;
    }
  }
  #chat_box {
    position: relative;
    z-index: 5;
    position: fixed;
    top: 0;
    height: 100%;
    width: 75%;
    background-color: black;
    transition: 0.7s;
    color: white;
    #back {
      position: absolute;
      right: 0;
      top: 0;
      padding: 18px;
      width: 33px;
    }
    #logo_white {
      display: block;
      margin: auto;
      width: 160px;
    }
  }
  #chat_shadow {
    z-index: 4;
    background-color: #00000040;
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
  }
  #second {
    position: relative;
    z-index: 5;
    position: fixed;
    top: 0;
    height: 100%;
    width: 75%;
    background-color: black;
    transition: 0.7s;
    color: white;
    #link_sec {
      padding-left: 18px;
      a {
        text-decoration: none;
        color: white;
      }
    }
    #back {
      position: absolute;
      left: 0;
      top: 0;
      padding: 18px;
      width: 33px;
    }
    #logo_white {
      display: block;
      margin: auto;
      width: 160px;
    }
  }
  #second_shadow {
    z-index: 4;
    width: 100%;
    background-color: #00000040;
    height: 100vh;
    position: fixed;
    right: 0;
    top: 0;
  }
  @media (max-width: 350px) {
    #second {
      width: 100%;
    }
    #chat_box {
      width: 100%;
    }
  }
  @media (max-height: 530px) {
    #second {
      #link_sec {
        h3 {
          font-size: 14px;
        }
      }
    }
  }
  @media (max-height: 430px) {
    #second {
      #link_sec {
        h3 {
          font-size: 12px;
        }
      }
    }
  }
  @media (max-height: 390px) {
    #second {
      #link_sec {
        h3 {
          font-size: 10px;
        }
      }
    }
  }
}
</style>
