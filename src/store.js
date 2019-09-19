import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const defaultState = {
  tick: Date.now(),
  score: 0,
  player: "Player 1",
  lives: 3
}

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
    }
  }
});