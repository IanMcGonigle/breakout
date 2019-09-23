<template lang="pug">
    .root
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

.rb-shadow {
  margin-top: 0;
  transform: scale(0.3);
  position: absolute;
}
.root {
  padding: 1rem;
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
