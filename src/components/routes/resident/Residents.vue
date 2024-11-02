<template>
  <main>
    <h1 class="title">Les résident.e.s de la radio</h1>
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
  color: var(--color-text);
  height: max-content;
  .residents {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1.5rem;
    grid-auto-rows: minmax(auto, auto);
    .resident {
      cursor: pointer;
      p {
        margin: 0.2rem 0;
      }
      img {
        object-fit: cover;
        width: 100%;
        height: 230px;
        border: 1px solid var(--color-text);
      }
      &:hover {
        img {
          border-color: var(--color-primary);
        }
        p {
          color: var(--color-primary);
        }
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
  @media (max-width: 815px) {
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
