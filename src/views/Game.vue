<template lang="pug">
  div.blackout( v-if="gameover")
    .container
      h1.rb-shadow.animated-rainbow GAME OVER
      h1 {{player}} : score {{score}}
      .controls
        button.btn(@click="resetGame") replay
        <router-link class="btn" to="/about">scores</router-link>
        <router-link class="btn" to="/">quit</router-link>
  div(v-else)
    .container
      <app-scoreboard />
      .board(ref="board")
        .field
          .brick(@click="toggleBrick(index)" v-for="(brick, index) in brickCount" ref="bricks" :key="index" :class="[`band-${Math.floor(index/(brickCount/5))}`]" :data-points="Math.floor(index/16)")
        <app-ball ref="ball" :position="ballPosition"/>
        <app-paddle :active="!paused" ref="paddle"/>
      button( @click="togglePlay") {{paused ? "play" : "pause"}}
      button( @click="toggleMute") {{muted ? "unmute" : "mute"}}
</template>

<script>
import { mapActions, mapState } from "vuex";
import Paddle from "../components/Paddle.vue";
import Ball from "../components/Ball.vue";
import ScoreBoard from "../components/ScoreBoard.vue";
import { AudioManager } from "../utils/AudioManager";

const audioManager = new AudioManager();
audioManager.init();

export default {
  name: "Game",
  components: {
    "app-paddle": Paddle,
    "app-ball": Ball,
    "app-scoreboard": ScoreBoard
  },
  data() {
    return {
      brickCount: 40,
      hitCount: 0,
      paused: true,
      loopInterval: null,
      ballPosition: {
        x: 50,
        y: 50
      },
      ballDirection: {
        x: 1,
        y: 1
      },
      ballSpeed: {
        x: 0.5,
        y: 0.5,
        max: 2.75
      },
      muted: false
    };
  },
  computed: {
    ...mapState({
      level: state => state.level,
      player: state => state.player,
      score: state => state.score,
      gameover: state => state.gameover
    }),
    isMuted: () => audioManager.mute
  },
  watch: {
    level() {
      this.initializeBall();
      this.resetField();
      this.resetTurn();
    },
    gameover() {
      if (this.gameover) {
        audioManager.playGameover();
      }
    }
  },
  mounted() {
    this.initializeBall();
  },
  methods: {
    ...mapActions([
      "updateTick",
      "addScore",
      "loseLife",
      "levelUp",
      "playAgain"
    ]),
    toggleMute() {
      const m = audioManager.mute;
      this.muted = !m;
      audioManager.setMute(this.muted);
    },
    togglePlay() {
      this.paused = !this.paused;

      if (this.paused && this.loopInterval) {
        cancelAnimationFrame(this.loopInterval);
      } else {
        requestAnimationFrame(this.loop);
      }
    },
    toggleBrick(index) {
      const brick = this.$refs.bricks[index];
      brick.classList.add("brick-hit");
      this.hitCount++;
    },
    initializeBall() {
      const newSpeed = Math.min(this.ballSpeed.max, 0.5 * this.level);
      this.ballSpeed.x = 0; //newSpeed;
      this.ballSpeed.y = newSpeed;
      this.ballPosition.x = 50;
      this.ballPosition.y = 50;
      this.ballDirection.x = 1;
      this.ballDirection.y = 1;
    },
    onLoseBall() {
      this.loseLife();
      this.resetTurn();
    },
    onClearField() {
      this.levelUp();
    },
    resetField() {
      this.hitCount = 0;
      this.$refs.bricks.forEach(brick => {
        brick.classList.remove("brick-hit");
      });
    },
    resetTurn() {
      this.togglePlay();
      this.initializeBall();
    },
    resetGame() {
      this.playAgain();
    },
    loop() {
      this.loopInterval = requestAnimationFrame(this.loop);

      // the there is no refs why bother
      if (
        !this.$refs.ball.$el ||
        !this.$refs.paddle.$el ||
        !this.$refs.board ||
        !this.$refs.bricks
      )
        return;

      // check to see if we have won the game
      if (this.hitCount === this.brickCount) {
        this.onClearField();
      }
      // const speed = 0.5;
      const ballRect = this.$refs.ball.$el.getBoundingClientRect();
      const paddleRect = this.$refs.paddle.$el.getBoundingClientRect();
      const boardRect = this.$refs.board.getBoundingClientRect();
      const bricksRef = this.$refs.bricks;

      // check to see if the ball is in the board;
      // check to see if the ball is off the bottom
      if (ballRect.y > boardRect.bottom - ballRect.height) {
        // this is where the turn would end
        this.onLoseBall();
        audioManager.playMiss();
      }
      // check to see if the ball is off the top
      if (ballRect.y < boardRect.top) {
        this.ballDirection.y = 1;
        audioManager.playBall();
      }
      // check to see if the ball is off the right
      if (ballRect.x > boardRect.right - ballRect.width - 7.5) {
        this.ballDirection.x = -1;
        audioManager.playBall();
      }
      // check to see if the ball is off the left
      if (ballRect.x < boardRect.left + 7.5) {
        this.ballDirection.x = 1;
        audioManager.playBall();
      }

      //Check to see if it has hit the paddle
      if (ballRect.y > paddleRect.y - ballRect.height) {
        if (ballRect.x > paddleRect.left && ballRect.x < paddleRect.right) {
          this.ballDirection.y = -1;
          const ballLeft = ballRect.left - paddleRect.left;
          const impactPercent = ballLeft / paddleRect.width - 0.5;
          this.ballSpeed.x = Math.abs(impactPercent);
          audioManager.playBall();
        }
      }

      // check to see if has hit a brick
      for (let i = 0; i < bricksRef.length; i++) {
        const brick = bricksRef[i];

        //if it has been hit skip it
        if (brick.classList.contains("brick-hit")) {
          continue;
        }
        const brickRect = brick.getBoundingClientRect();
        const hit = !(
          ballRect.right < brickRect.left ||
          ballRect.left > brickRect.right ||
          ballRect.bottom < brickRect.top ||
          ballRect.top > brickRect.bottom
        );

        // if it hits get rid of the brick, and break out of the loop
        if (hit) {
          brick.classList.add("brick-hit");
          audioManager.playBrick();
          const brickSpeed =
            (4 - parseInt(brick.getAttribute("data-points"))) / 50;
          // const newXspeed = Math.min(
          //   this.ballSpeed.x + brickSpeed,
          //   this.ballSpeed.max
          // );
          const newYspeed = Math.min(
            this.ballSpeed.y + brickSpeed,
            this.ballSpeed.max
          );
          // this.ballSpeed.x = newXspeed;
          this.ballSpeed.y = newYspeed;
          this.ballDirection.y = this.ballDirection.y === 1 ? -1 : 1;
          this.hitCount++;
          this.addScore(50);
          break;
        }
      }

      this.ballPosition.x =
        this.ballPosition.x + this.ballSpeed.x * this.ballDirection.x;
      this.ballPosition.y =
        this.ballPosition.y + this.ballSpeed.y * this.ballDirection.y;

      this.muted = audioManager.mute;

      // dispatch new tick
      this.updateTick();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-width: 300px;
  max-width: 800px;
  margin: auto;
}
.board {
  position: relative;
  background: #000;
  min-width: 300px;
  max-width: 800px;
  margin: 0 auto;
  min-height: calc(100vh - 300px);
  border: 15px solid white;
}

.field {
  // padding: 2px;
  display: flex;
  flex-wrap: wrap;
}

.brick {
  height: 20px;
  background: #fff;
  // margin: 1px;
  // width: calc((100 / 8) * 1%);
  // width: calc((100 / 8) * 1% - 2px);
  width: calc((100 / 8) * 1%);

  &-hit {
    opacity: 0;
  }
}

.band {
  &-5,
  &-0 {
    background: blue;
  }
  &-6,
  &-1 {
    background: purple;
  }
  &-7,
  &-2 {
    background: red;
  }
  &-8,
  &-3 {
    background: orange;
  }
  &-9,
  &-4 {
    background: yellow;
  }
}

.btn,
button {
  margin: 1rem;
  font-size: 1rem;
  padding: 0.75rem 1.25rem;
  min-width: 100px;

  @media only screen and (min-width: 540px) {
    margin: 2rem 1rem;
    min-width: 150px;
  }
}

.container {
  padding: 2rem;
}

.blackout {
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.controls {
  display: flex;
  margin: 20px auto;
  justify-content: center;
}
</style>
