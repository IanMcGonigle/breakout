<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/game">Game</router-link>
    </div>
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
    console.log("app created");
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
  // display: flex;
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
  flex: 1;
}

button {
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
