<template>
  <nav>
    <section id="topnav">
      <img
        id="burger"
        @click="second = !second"
        src="../../assets/imgs/menu.png"
      />
      <img id="logo" alt="ODC Live" src="../../assets/imgs/logo.png" />
    </section>
    <section id="bottomnav">
      <Radio :today_shows="today_shows" :iframe_update="iframe_mix" />
      <img
        id="chaticon"
        src="../../assets/imgs/chat.svg"
        @click="chat = !chat"
      />
      <section
        id="mix_frame"
        v-if="iframe_mix"
      >
        <iframe
          height="20"
          scrolling="no"
          frameborder="no"
          allow="autoplay"
          :src="
            `https:          "
        ></iframe>
        <img src="../../assets/imgs/cross_icon.png" @click="close_mix" />
      </section>
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
        <h3>
          <a href="https:        </h3>
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
export default {
  name: "NavBar",
  props: ["today_shows", "iframe_mix"],
  components: {
    Radio,
    Chat,
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
    #logo {
      height: 100%;
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
    #mix_frame {
      position: absolute;
      top: 15px;
      left: 30px;
      z-index: 5;
      width: 350px;
      iframe {
        padding: 10px;
        margin-bottom: -4px;
        background-color: #f2f2f2;
        width: ~"calc(100% - 56px)";
        position: sticky;
        bottom: 0px;
        z-index: 5;
      }
      img {
        cursor: pointer;
        width: 25px;
        background-color: #f2f2f2;
        color: black;
        font-weight: bold;
        font-family: SpaceMono;
        font-size: 13px;
        border-left: 1px solid #e3e3e3;
        padding: 8px 7px 7px 13px;
        position: absolute;
        right: 0px;
        z-index: 3;
        &:hover {
          background-color: #e8e8e8;
        }
      }
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
