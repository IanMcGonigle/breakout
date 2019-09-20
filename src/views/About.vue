<template lang="pug">
  .about
    h1( v-bind:class="{'animated-rainbow':hover}" ) High Scores

    table.score-wrapper
      th player
      th score
      tbody
        tr( v-for="score in highscores" v-bind:class="{'current': isActive(score)}")
          td {{score.user}}
          td {{score.score}}



    button replay
    button quit

</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "about",
  data() {
    return {
      name: "",
      hover: false
    };
  },
  created() {
    this.initHighscores();
  },
  computed: {
    ...mapState(["highscores", "score", "player"])
  },
  methods: {
    ...mapActions(["setPlayer", "resetGame", "initHighscores"]),
    isActive(score) {
      return this.player === score.user && this.score === score.score;
    },
    onClick() {
      console.log("clicked ", this.name);
      if (this.name) {
        this.setPlayer(this.name);
      }

      this.$router.push("game");
    },
    onHover() {
      console.log("hover ", this.name);
    }
  }
};
</script>

<style lang="scss" scoped>
.about {
  padding-bottom: 3rem;
}
h1 {
  position: relative;
  font-size: 3rem;
  letter-spacing: -0.25rem;
  margin: 1.5rem auto 3rem;
  text-shadow: 1px 1px black, 2px 4px red, 4px 8px orange, 6px 12px yellow,
    8px 16px green, 10px 20px blue, 0px 0px 50px white, 0px 25px 50px white;
}

.score-wrapper {
  margin: auto;
  min-width: 300px;
  max-width: 600px;
  background: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  margin-bottom: 1rem;
  border: 10px solid white;
  text-align: left;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  margin: 2rem auto;
  th {
    font-size: 1.25rem;
  }
  th,
  td {
    border: 1px solid white;
    padding: 1rem 1.25rem;
  }

  tr.current {
    color: yellow;
  }

  td {
    font-size: 0.75rem;
  }
}
button {
  margin: 0.5rem;
  font-size: 1rem;
  padding: 0.75rem 1.25rem;
  min-width: 150px;
}
</style>
