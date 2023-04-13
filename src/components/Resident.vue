<template>
  <main>
    <span class="subtitle">Les résident.e.s de la radio</span>
    <br />
    <div class="resident" @click="toURL(`/residents/${resident.name}`)">
      <h1>{{ resident.name }}</h1>
      <img :src="resident.image" />
      <p class="description" v-html="resident.description"></p>
      <section class="socials">
        <a
          v-if="resident.facebook.length"
          :href="resident.facebook"
          target="_blank"
          >Facebook</a
        >
        <a
          v-if="resident.instagram.length"
          :href="resident.instagram"
          target="_blank"
          >Instagram</a
        >
        <a v-if="resident.raco.length" :href="resident.raco" target="_blank"
          >Resident Advisor</a
        >
        <a
          v-if="resident.soundcloud.length"
          :href="resident.soundcloud"
          target="_blank"
          >Soundcloud</a
        >
        <a
          v-if="resident.bandcamp.length"
          :href="resident.bandcamp"
          target="_blank"
          >Bandcamp</a
        >
        <a
          v-if="resident.website.length"
          :href="resident.website"
          target="_blank"
          >Website</a
        >
      </section>
    </div>
  </main>
</template>
<script>
import graph from "@/graphaxios";
export default {
  name: "Index",
  components: {},
  data() {
    return {
      resident: {
        id: "",
        name: "",
        description: "",
        image: "",
        facebook: "",
        instagram: "",
        raco: "",
        soundcloud: "",
        bandcamp: "",
        website: "",
      },
    };
  },
  methods: {
    toURL(dest) {
      this.$router.push(dest);
    },
    async getResident() {
      const res = await graph(
        this.$config,
        "Resident",
        `query Resident {
          Resident(name: "${this.$route.params.resident_name}") {
            id
            name
            description
            image
            facebook
            instagram
            raco
            soundcloud
            bandcamp
            website
          }
        }`,
        {}
      );
      if (res.Resident == null) {
        this.$router.push("/residents");
      }
      res.Resident.description = res.Resident.description.replace(
        /(?:\r\n|\r|\n)/g,
        "<br>"
      );
      this.resident = res.Resident;
    },
  },
  async mounted() {
    await this.getResident();
  },
};
</script>
<style lang="less" scoped>
main {
  width: 830px;
  color: white;
  .resident {
    padding: 15px 20px 15px 20px;
    img {
      object-fit: cover;
      width: 100%;
    }
    .description {
      padding: 15px;
      background-color: #2b2b2b3b;
    }
    .socials {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 10px;
      grid-auto-rows: minmax(auto, auto);
      a {
        text-align: center;
        text-decoration: none;
        color: white;
        background-color: #2b2b2b3b;
        padding: 15px;
        &:hover {
          background-color: #00000080;
        }
      }
    }
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    .resident {
      .socials {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
  @media (max-width: 400px) {
    .resident {
      .socials {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  }
}
</style>
