
<template lang="pug">
  div
    .container
      <app-scoreboard />
      .board(ref="board")
        .field
          .brick(v-for="(brick, index) in bricks" ref="bricks" :key="index" :class="[`band-${Math.floor(index/16)}`]" :data-points="Math.floor(index/16)")
        <app-ball ref="ball" :position="ballPosition"/>
        <app-paddle :active="!paused" ref="paddle"/>
      button( @click="togglePlay") {{paused ? "start" : "stop"}}
</template>

<script>
import { mapActions } from "vuex";
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
      paused: true,
      bricks: [],
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
        max: 1
      }
    };
  },
  created() {
    this.bricks.length = 80;
  },
  methods: {
    ...mapActions(["updateTick", "addScore"]),
    togglePlay() {
      this.paused = !this.paused;

      if (this.paused && this.loopInterval) {
        cancelAnimationFrame(this.loopInterval);
      } else {
        requestAnimationFrame(this.loop);
      }
    },
    loop() {
      this.loopInterval = requestAnimationFrame(this.loop);
      if (!this.$refs.ball.$el) return;
      const speed = 0.5;
      const ballRect = this.$refs.ball.$el.getBoundingClientRect();
      const paddleRect = this.$refs.paddle.$el.getBoundingClientRect();
      const boardRect = this.$refs.board.getBoundingClientRect();
      const bricksRef = this.$refs.bricks;

      // check to see if the ball is in the board;
      // check to see if the ball is off the bottom
      if (ballRect.y > boardRect.bottom - ballRect.height) {
        // this is where the turn would end
        this.ballDirection.y = -1;
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
          const brickSpeed =
            (4 - parseInt(brick.getAttribute("data-points"))) / 100;
          brick.classList.add("brick-hit");
          console.log(parseInt(4 - brick.getAttribute("data-points")) / 100);
          this.ballSpeed.x += brickSpeed;
          this.ballSpeed.y += brickSpeed;
          this.ballDirection.y = this.ballDirection.y === 1 ? -1 : 1;
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