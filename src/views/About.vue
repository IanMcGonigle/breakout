<template lang="pug">
  .about
    h1 High Scores

    table.score-wrapper
      th.rank rank
      th player
      th score
      tbody
        tr( v-for="(score, index) in highscores" v-bind:class="{'current': isActive(score)}")
          td.rank {{index + 1}}
          td {{score.user}}
          td {{score.score}}




    <router-link class="btn" to="/game">replay</router-link>
    <router-link class="btn" to="/">quit</router-link>

</template>

<script>
// @ is an alias to /src
import { mapActions, mapState } from "vuex";

export default {
  name: "about",
  data() {
    return {
      name: "",
      hover: false,
      activeSet: false
    };
  },
  created() {
    this.initHighscores();
  },
  mounted() {
    this.activeSet = false;
  },
  computed: {
    ...mapState(["highscores", "score", "player"])
  },
  methods: {
    ...mapActions(["setPlayer", "resetGame", "initHighscores"]),
    isActive(score) {
      const result = this.player === score.user && this.score === score.score;
      return result;
    },
    onClick() {
      if (this.name) {
        this.setPlayer(this.name);
      }

      this.$router.push("game");
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
  .rank {
    max-width: 20%;
    text-align: center;
  }
  th {
    font-size: 1.25rem;
    text-align: center;
  }
  th,
  td {
    border: 2px solid white;
    padding: 1.25rem 1.75rem;
  }

  tr.current {
    animation: currentScore;
    animation-duration: 300ms;
    animation-iteration-count: infinite;
  }

  td {
    font-size: 0.75rem;
  }

  @keyframes currentScore {
    0% {
      color: yellow;
      background: transparent;
    }
    100% {
      color: black;
      background: yellow;
    }
  }
}
.btn,
button {
  margin: 0.5rem;
  font-size: 1rem;
  padding: 0.75rem 1.25rem;
  min-width: 150px;
}
</style>
