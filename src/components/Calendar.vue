<template>
  <section id="cal">
    <h1 id="title">Le Calendrier des emissions</h1>
    <h2>Semaine du {{ week.toLocaleDateString('fr') }}</h2>
    <div class="dowPicker">
      <div class="dowPickerOption">
        <input type="radio" name="dow" id="dow2" checked />
        <label for="dow2" @click="disp_shows(0, 'monday')">Lundi</label>
      </div>
      <div class="dowPickerOption">
        <input type="radio" name="dow" id="dow3" />
        <label for="dow3" @click="disp_shows(0, 'tuesday')">Mardi</label>
      </div>
      <div class="dowPickerOption">
        <input type="radio" name="dow" id="dow4" />
        <label for="dow4" @click="disp_shows(0, 'wednesday')">Mercredi</label>
      </div>
      <div class="dowPickerOption">
        <input type="radio" name="dow" id="dow5" />
        <label for="dow5" @click="disp_shows(0, 'thursday')">Jeudi</label>
      </div>
      <div class="dowPickerOption">
        <input type="radio" name="dow" id="dow6" />
        <label for="dow6" @click="disp_shows(0, 'friday')">Vendredi</label>
      </div>
      <div class="dowPickerOption">
        <input type="radio" name="dow" id="dow7" />
        <label for="dow7" @click="disp_shows(0, 'saturday')">Samedi</label>
      </div>
      <div class="dowPickerOption">
        <input type="radio" name="dow" id="dow1" />
        <label for="dow1" @click="disp_shows(0, 'sunday')">Dimanche</label>
      </div>
    </div>
    <article id="shows">
      <section v-for="show in day_selected" v-bind:key="show.id" class="show">
        <h3>
          <u
            >De
            {{
              new Date(Number(show.starts_at)).toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
              })
            }}
            a
            {{
              new Date(Number(show.ends_at)).toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
              })
            }}:</u
          >
          {{ show.name }}
        </h3>
        <h4 v-if="show.dj.length">Animee par {{ show.dj }}</h4>
        <p>
          <span class="genre" v-for="genre in show.genres" v-bind:key="genre">{{
            genre
          }}</span>
          Toutes les {{ show.redundancy == 1 ? '' : show.redundancy }} semaines
        </p>
      </section>
    </article>
  </section>
</template>
<script>
import gql from 'graphql-tag';
export default {
  name: 'Calendar',
  data() {
    return {
      day_selected: null,
      week: null,
      weekafter: null,
      shows: [],
      weeks: [
        {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        },
        {
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
          saturday: [],
          sunday: [],
        },
      ],
    };
  },
  methods: {
    getMonday(date) {
      const day = date.getDay();
      const diff = date.getDate() - day + (day == 0 ? -6 : 1);
      return new Date(date.setDate(diff));
    },
    getNextMonday(date) {
      const day = date.getDay();
      const diff = date.getDate() - day + (day == 0 ? 1 : 7);
      return new Date(date.setDate(diff));
    },
    disp_shows(week, day) {
      this.day_selected = this.weeks[week][day];
    },
    async getCalendar(date, n) {
      await this.$apollo
        .query({
          query: gql`
            query Shows($start: String!) {
              Shows(start: $start) {
                id
                name
                starts_at
                ends_at
                redundancy
                genres
                dj
              }
            }
          `,
          variables: {
            start: date,
          },
        })
        .then(res => {
          this.shows[n] = res.data.Shows;
          for (let i = 0; i < res.data.Shows.length; i++) {
            let e = new Date(Number(res.data.Shows[i].starts_at));
            switch (e.getDay()) {
              case 0:
                this.weeks[n].sunday.push(res.data.Shows[i]);
                break;
              case 1:
                this.weeks[n].monday.push(res.data.Shows[i]);
                break;
              case 2:
                this.weeks[n].tuesday.push(res.data.Shows[i]);
                break;
              case 3:
                this.weeks[n].wednesday.push(res.data.Shows[i]);
                break;
              case 4:
                this.weeks[n].thursday.push(res.data.Shows[i]);
                break;
              case 5:
                this.weeks[n].friday.push(res.data.Shows[i]);
                break;
              case 6:
                this.weeks[n].saturday.push(res.data.Shows[i]);
                break;
            }
          }
        })
        .catch();
    },
  },
  async mounted() {
    this.week = new Date();
    this.getMonday(this.week);
    this.weekafter = new Date();
    this.getNextMonday(this.weekafter);
    const t = `${this.week.getFullYear()}-${this.week.getMonth() +
      1}-${this.week.getDate()}`;
    this.getCalendar(t, 0);
                this.disp_shows(0, 'monday');
  },
};
</script>
<style lang="less" scoped>
#cal {
  #title {
    font-size: 30px;
  }
  #shows {
    margin-top: 30px;
    .show {
      border-left: 1px solid #7e7e7e;
      padding-left: 10px;
      margin-bottom: 30px;
      .genre {
        background-color: #a71313;
        font-weight: bold;
        margin-right: 10px;
        padding: 4px;
        border-radius: 2px;
        font-size: 12px;
      }
    }
  }
  .dowPicker {
    margin: 0 auto;
    display: flex;
    .dowPickerOption {
      display: inline-block;
      margin-right: 20px;
      input[type='radio'] {
        display: none;
      }
      label {
        font-size: 25px;
        font-weight: bold;
        color: #a7a7a7;
        cursor: pointer;
      }
      input[type='radio']:checked ~ label {
        color: white;
      }
    }
  }
}
</style>
