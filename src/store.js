import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const defaultState = {
  tick: Date.now(),
  score: 0,
  player: "Player 1",
  lives: 3,
  level: 1
};

export default new Vuex.Store({
  state: {
    ...defaultState
  },
  mutations: {
    UPDATE_TICK: state => {
      state.tick = Date.now();
    },
    SET_SCORE: (state, value) => {
      state.score = value;
    },
    SET_PLAYER: (state, value) => {
      state.player = value;
    },
    LEVEL_UP: state => {
      state.level = state.level + 1;
    },
    UPDATE_LIVES: (state, value) => {
      state.lives = value;
    },
    RESET_GAME: state => {
      for (let prop in defaultState) {
        state[prop] = defaultState[prop];
      }
    },
    UPDATE_GAMEOVER: (state, value) => {
      state.gameover = value;
    }
  },
  actions: {
    updateTick: context => {
      context.commit("UPDATE_TICK");
    },
    addScore: (context, value) => {
      context.commit("SET_SCORE", context.state.score + value);
    },
    resetScore: context => {
      context.commit("SET_SCORE", 0);
    },
    setPlayer: (context, value) => {
      context.commit("SET_PLAYER", value);
    },
    resetGame: context => {
      context.commit("RESET_GAME");
    },
    levelUp: context => {
      context.commit("LEVEL_UP");
    },
    loseLife: context => {
      const newLives = context.state.lives - 1;

      if (newLives > -1) {
        context.commit("UPDATE_LIVES", newLives);
      } else {
        context.commit("UPDATE_GAMEOVER", true);
      }
    }
  }
});