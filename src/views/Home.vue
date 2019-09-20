<template lang="pug">
  .home
    h1( v-bind:class="{'animated-rainbow':hover}" ) Breakout!
    .form-wrapper
        label Enter your name
        input(type="text" v-model="name")
        button( @click="onClick" @mouseover="hover = true" @mouseleave="hover = false") Play
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapActions } from "vuex";

export default {
  name: "home",

  data() {
    return {
      name: "",
      hover: false
    };
  },
  methods: {
    ...mapActions(["setPlayer"]),
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

.animated-rainbow {
  animation-name: rainbow;
  animation-duration: 200ms;
  animation-iteration-count: infinite;
}

@keyframes rainbow {
  0% {
    text-shadow: 1px 1px black, 5px 10px red, 10px 20px orange, 15px 30px yellow,
      20px 40px green, 25px 50px blue, 0px 0px 50px white, 0px 50px 50px white;
  }
  25% {
    text-shadow: 1px 1px black, 5px 10px orange, 10px 20px yellow,
      15px 30px green, 20px 40px blue, 25px 50px red, 0px 0px 50px white,
      0px 50px 50px white;
  }
  50% {
    text-shadow: 1px 1px black, 5px 10px yellow, 10px 20px green, 15px 30px blue,
      20px 40px red, 25px 50px orange, 0px 0px 50px white, 0px 50px 50px white;
  }
  75% {
    text-shadow: 1px 1px black, 5px 10px green, 10px 20px blue, 15px 30px red,
      20px 40px orange, 25px 50px yellow, 0px 0px 50px white,
      0px 50px 50px white;
  }
  100% {
    text-shadow: 1px 1px black, 5px 10px blue, 10px 20px red, 15px 30px orange,
      20px 40px yellow, 25px 50px green, 0px 0px 50px white, 0px 50px 50px white;
  }
}
</style>
