<template lang="pug">
  .home
    h1.rb-shadow( v-bind:class="{'animated-rainbow':hover}" ) Breakout!
    .form-wrapper
        label Enter your name
        input(type="text" v-model="name")
        button( @click="onClick" @mouseover="hover = true" @mouseleave="hover = false") Play
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";

export default {
  name: "home",

  data() {
    return {
      name: "",
      hover: false
    };
  },
  mounted() {
    this.resetGame();
  },
  methods: {
    ...mapActions(["setPlayer", "resetGame"]),
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
h1 {
  position: relative;
  font-size: 5rem;
  letter-spacing: -0.25rem;
  margin: 3rem auto 6rem;
  text-shadow: 1px 1px black, 5px 10px red, 10px 20px orange, 15px 30px yellow,
    20px 40px green, 25px 50px blue, 0px 0px 50px white, 0px 50px 50px white;
}

.form-wrapper {
  margin: auto;
  min-width: 300px;
  max-width: 600px;
  background: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border: 10px solid white;
}
label {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  display: block;
}
input {
  padding: 0.5rem 1rem;
  width: 100%;
  font-size: 2rem;
  font-family: "Press Start 2P", cursive;
  margin-bottom: 1rem;
  background: transparent;
  color: white;
  text-align: center;
  &:focus {
    text-shadow: 1px 1px red, 2px 2px orange, 3px 3px yellow, 4px 4px green,
      5px 5px blue;
  }
}

::placeholder {
  color: white;
}
</style>
