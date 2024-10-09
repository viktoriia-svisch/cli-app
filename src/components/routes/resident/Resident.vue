<template>
  <main>
    <h1 class="title">Les résident.e.s de la radio</h1>
    <br />
    <div class="resident" @click="toURL(`/residents/${resident.name}`)">
      <div class="resident__main">
        <img :src="resident.image" />
        <div class="right-side">
          <h2 class="margin-top-0">{{ resident.name }}</h2>
          <p class="description" v-html="resident.description"></p>
          <section class="socials">
            <a
              v-if="resident.facebook.length"
              :href="resident.facebook"
              target="_blank"
              class="button"
              >Facebook</a
            >
            <a
              v-if="resident.instagram.length"
              :href="resident.instagram"
              target="_blank"
              class="button"
              >Instagram</a
            >
            <a
              v-if="resident.raco.length"
              :href="resident.raco"
              target="_blank"
              class="button"
              >Resident Advisor</a
            >
            <a
              v-if="resident.soundcloud.length"
              :href="resident.soundcloud"
              target="_blank"
              class="button"
              >Soundcloud</a
            >
            <a
              v-if="resident.bandcamp.length"
              :href="resident.bandcamp"
              target="_blank"
              class="button"
              >Bandcamp</a
            >
            <a
              v-if="resident.website.length"
              :href="resident.website"
              target="_blank"
              class="button"
              >Website</a
            >
          </section>
        </div>
      </div>
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
  color: var(--color-text);
  height: max-content;
  .resident {
    &__main {
      display: flex;
      gap: 1rem;
      align-items: flex-start;
      margin-bottom: 1rem;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    img {
      object-fit: cover;
      width: 40%;
      border: 1px solid var(--color-text);
    }
    .right-side {
      width: 50%;
      flex-grow: 1;
      flex-shrink: 1;
      min-width: 300px;
    }
    .description {
      margin-bottom: 1rem;
      margin-top: 0;
      padding: 1rem;
      border: 1px solid var(--color-text);
    }
    .socials {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 1rem;
      grid-auto-rows: minmax(auto, auto);
      a {
        text-align: center;
        text-decoration: none;
        color: var(--color-text);
        padding: 15px;
      }
    }
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
  @media (max-width: 600px) {
    .resident img {
      width: 60%;
    }
    .resident {
      .socials {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
  @media (max-width: 425px) {
    .resident img {
      width: 100%;
    }
    .resident {
      .socials {
        grid-template-columns: repeat(1, 1fr);
      }
    }
  }
}
</style>
