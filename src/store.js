import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

const firebaseConfig = {
  apiKey: "AIzaSyBjZqbncimJ_Fn7A1eizTOGJmfmy_0DhMQ",
  authDomain: "breakout-2f7a9.firebaseapp.com",
  databaseURL: "https://breakout-2f7a9.firebaseio.com",
  projectId: "breakout-2f7a9",
  storageBucket: "breakout-2f7a9.appspot.com",
  messagingSenderId: "255607378101",
  appId: "1:255607378101:web:ae18730425557a93082efc"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});

const defaultState = {
  tick: Date.now(),
  score: 0,
  player: "Player 1",
  lives: 3,
  level: 1,
  gameover: false,
  highscores: []
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
    PLAY_AGAIN: state => {
      const player = state.player;
      for (let prop in defaultState) {
        state[prop] = defaultState[prop];
      }

      state.player = player;
    },
    UPDATE_GAMEOVER: (state, value) => {
      state.gameover = value;
    },
    INIT_HIGH_SCORES: (state, value) => {
      state.highscores = value;
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
        db.collection("scores")
          .add({
            user: context.state.player,
            score: context.state.score
          })
          .then(res => {
            //eslint-disable-next-line
            console.log("res ", res);
            context.commit("UPDATE_GAMEOVER", true);
          });
      }
    },
    playAgain: context => {
      context.commit("PLAY_AGAIN");
    },
    initHighscores: context => {
      db.collection("scores")
        .orderBy("score")
        .get()
        .then(snapshot => {
          const scores = snapshot.docs.map(doc => doc.data());
          const uniqueKeys = new Set();
          const uniqueScores = scores.filter(score => {
            const key = `${score.user}_${score.score}`;
            const dupe = uniqueKeys.has(key);
            uniqueKeys.add(key);
            return !dupe;
          });
          context.commit("INIT_HIGH_SCORES", uniqueScores.reverse());
        })
        .catch(err => {
          //eslint-disable-next-line
          console.log("the was an error ", err);
          context.commit("INIT_HIGH_SCORES", context.store.highscores);
        });
    }
  }
});
