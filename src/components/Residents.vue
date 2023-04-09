<template>
  <main>
    <span class="subtitle">Les résident.e.s de la radio</span>
    <br />
    <section class="residents">
      <div
        class="resident"
        v-for="resident in residents"
        v-bind:key="resident.id"
        :resident="resident"
        @click="toURL(`/residents/${resident.name}`)"
      >
        <p>{{ resident.name }}</p>
        <img :src="resident.image" />
      </div>
    </section>
  </main>
</template>
<script>
import graph from "@/graphaxios";
export default {
  name: "Index",
  components: {},
  data() {
    return {
      residents: [],
    };
  },
  methods: {
    toURL(dest) {
      this.$router.push(dest);
    },
    async getResidents() {
      const res = await graph(
        this.$config,
        "Residents",
        `query Residents {
          Residents {
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
      this.residents = this.residents.concat(res.Residents);
    },
  },
  async mounted() {
    await this.getResidents();
  },
};
</script>
<style lang="less" scoped>
main {
  width: 830px;
  color: white;
  .residents {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(auto, auto);
    .resident {
      background-color: #2b2b2b3b;
      padding: 5px 20px 15px 20px;
      cursor: pointer;
      img {
        object-fit: cover;
        width: 230px;
        height: 230px;
      }
      &:hover {
        background-color: #00000080;
      }
    }
  }
  @media (max-width: 1150px) {
    .residents {
      grid-template-columns: repeat(2, 1fr);
      .resident {
        img {
          width: 100%;
        }
      }
    }
  }
  @media (max-width: 1000px) {
    width: 100%;
  }
  @media (max-width: 800px) {
    .residents {
      .resident {
        img {
          width: 100%;
        }
      }
    }
  }
  @media (max-width: 450px) {
    .residents {
      grid-template-columns: repeat(1, 1fr);
      .resident {
        img {
          width: 100%;
          height: 300px;
        }
      }
    }
  }
}
</style>
