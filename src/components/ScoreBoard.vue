<template lang="pug">
  .root
    .player {{player}}
    .lives
      .life( v-for="life in lives")
    .score Score: {{score}}
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ScoreBoard",
  computed: {
    ...mapState(["score", "player", "lives"])
  }
};
</script>
<style lang="scss" scoped>
:root {
  --size: 2px;
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
  background: white;
  display: inline-block;
}
.score {
  margin-left: auto;
}
</style>