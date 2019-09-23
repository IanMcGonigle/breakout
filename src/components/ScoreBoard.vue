<template lang="pug">
    .root
      header
        <router-link to="/">
          h1 Breakout!
        </router-link>
      .scoreboard
        .level Level {{level}}
        .lives
          .life( v-for="life in lives")
        .score {{player}} Score: {{score}}
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ScoreBoard",
  computed: {
    ...mapState(["score", "player", "lives", "level"])
  }
};
</script>
<style lang="scss" scoped>
:root {
  --size: 2px;
}

header {
  flex: 1;
}

a,
a:visited {
  color: white;
  text-decoration: none;
}

h1 {
  position: relative;
  font-size: 2.5rem;
  letter-spacing: -0.15rem;
  margin: 0.5rem auto 3rem;
  text-shadow: 1px 1px black, 2px 4px red, 4px 8px orange, 6px 12px yellow,
    8px 16px green, 10px 20px blue, 0px 0px 50px rgba(255, 255, 255, 0.7),
    0px 25px 50px rgba(255, 255, 255, 0.7);
}

.rb-shadow {
  margin-top: 0;
  transform: scale(0.3);
  position: absolute;
}
.root {
  position: relative;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-family: "Press Start 2P", cursive;
  border: 15px solid white;
  border-bottom: none;
  // display: flex;
  // font-size: 1.25rem;
  // align-items: center;
}

.scoreboard {
  // padding: 1rem;
  background: black;
  color: white;
  font-family: "Press Start 2P", cursive;
  display: flex;
  font-size: 1.25rem;
  align-items: center;
}

.lives {
  margin-left: 2rem;
}

.life {
  --size: 15px;
  width: var(--size);
  height: var(--size);
  margin: 0.25rem;
  background: aquamarine;
  display: inline-block;
}
.score {
  margin-left: auto;
}
</style>
