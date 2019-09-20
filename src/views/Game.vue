
<template lang="pug">
  div
    .container
      <app-scoreboard />
      .board(ref="board")
        .field
          .brick(@click="toggleBrick(index)" v-for="(brick, index) in brickCount" ref="bricks" :key="index" :class="[`band-${Math.floor(index/(brickCount/5))}`]" :data-points="Math.floor(index/16)")
        <app-ball ref="ball" :position="ballPosition"/>
        <app-paddle :active="!paused" ref="paddle"/>
      button( @click="togglePlay") {{paused ? "start" : "stop"}}
</template>

<script>
import { mapActions, mapState } from "vuex";
import Paddle from "../components/Paddle.vue";
import Ball from "../components/Ball.vue";
import ScoreBoard from "../components/ScoreBoard.vue";

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
      }
    };
  },
  computed: {
    ...mapState({
      level: state => state.level
    })
  },
  watch: {
    level() {
      this.initializeBall();
      this.resetField();
      this.resetTurn();
    }
  },
  mounted() {
    this.initializeBall();
  },
  methods: {
    ...mapActions(["updateTick", "addScore", "loseLife", "levelUp"]),
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
        alert("cleared the field");
        this.onClearField();
      }
      const speed = 0.5;
      const ballRect = this.$refs.ball.$el.getBoundingClientRect();
      const paddleRect = this.$refs.paddle.$el.getBoundingClientRect();
      const boardRect = this.$refs.board.getBoundingClientRect();
      const bricksRef = this.$refs.bricks;

      // check to see if the ball is in the board;
      // check to see if the ball is off the bottom
      if (ballRect.y > boardRect.bottom - ballRect.height) {
        // this is where the turn would end
        this.onLoseBall();
      }
      // check to see if the ball is off the top
      if (ballRect.y < boardRect.top) {
        this.ballDirection.y = 1;
      }
      // check to see if the ball is off the right
      if (ballRect.x > boardRect.right - ballRect.width) {
        this.ballDirection.x = -1;
      }
      // check to see if the ball is off the left
      if (ballRect.x < boardRect.left) {
        this.ballDirection.x = 1;
      }

      //Check to see if it has hit the paddle
      if (ballRect.y > paddleRect.y - ballRect.height) {
        if (ballRect.x > paddleRect.left && ballRect.x < paddleRect.right) {
          this.ballDirection.y = -1;
          const ballLeft = ballRect.left - paddleRect.left;
          const impactPercent = ballLeft / paddleRect.width - 0.5;
          this.ballSpeed.x = Math.abs(impactPercent);
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
          const brickSpeed =
            (4 - parseInt(brick.getAttribute("data-points"))) / 50;
          const newXspeed = Math.min(
            this.ballSpeed.x + brickSpeed,
            this.ballSpeed.max
          );
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
  padding: 2px;
  display: flex;
  flex-wrap: wrap;
}

.brick {
  height: 20px;
  background: #fff;
  margin: 1px;
  // width: calc((100 / 8) * 1%);
  width: calc((100 / 8) * 1% - 2px);

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

button {
  padding: 0.5rem 1rem;
  background: cornflowerblue;
  color: #fff;
  outline: 0;
  border: 0;
  font-size: 1.5rem;
  border-radius: 0.25rem;
  margin: 1rem;

  &:hover {
    background: darken(cornflowerblue, 5%);
  }
}
</style>
