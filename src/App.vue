<template>
  <div id="app">
    <div class="wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  created() {
    this.initHighscores();
  },
  methods: {
    ...mapActions(["initHighscores"])
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 10px;

  @media only screen and (min-width: 540px) {
    font-size: 16px;
  }
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  font-family: "Press Start 2P", cursive;
  min-height: 100vh;
  background: url("./assets/space-bg.jpg");
  background-size: cover;
  // padding-top: 30px;
  display: flex;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.wrapper {
  margin: auto;
  padding: 2rem;
  flex: 1;
  overflow: hidden;
}

.rb-shadow {
  position: relative;
  font-size: 4rem;
  letter-spacing: -0.25rem;
  margin: 3rem auto 6rem;
  text-shadow: 1px 1px black, 3px 6px red, 6px 12px orange, 9px 18px yellow,
    12px 24px green, 15px 30px blue, 0px 0px 30px white, 0px 30px 30px white;

  @media only screen and (min-width: 540px) {
    text-shadow: 1px 1px black, 5px 10px red, 10px 20px orange, 15px 30px yellow,
      20px 40px green, 25px 50px blue, 0px 0px 50px white, 0px 50px 50px white;
  }
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

.btn,
button {
  display: inline-block;
  font-family: "Press Start 2P", cursive;
  font-size: 1.5rem;
  outline: 0;
  padding: 1.5rem 2rem;
  color: white;
  border: none;
  position: relative;
  background: transparent;
  z-index: 1;
  overflow: hidden;
  text-shadow: 2px 2px #000000;
  min-width: 200px;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  &:visited {
    color: white;
  }

  &::before {
    content: "";
    z-index: -1;
    display: block;
    position: absolute;
    width: 100%;
    height: 500%;
    top: 0;
    left: 0;
    bottom: 0;
    transition: all 400ms ease;
    background: linear-gradient(
      180deg,
      blue 0%,
      purple 25%,
      red 50%,
      orange 75%,
      yellow 100%
    );
  }

  &:hover::before {
    top: -400%;
  }
}
</style>
