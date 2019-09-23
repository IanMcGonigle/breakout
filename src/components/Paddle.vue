<template>
  <div v-bind:style="{ width: width, left: percent }">{{ level }}</div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Paddle",
  props: ["active"],
  data() {
    return {
      baseWidth: 8,
      postion: 0,
      maxSpeed: 5,
      currentSpeed: 0,
      direction: 0,
      drag: 0.75,
      keydown: false
    };
  },
  mounted() {
    window.addEventListener("keydown", e => {
      this.updatePostion(e.key);
    });
    window.addEventListener("keyup", e => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        this.keydown = false;
      }
    });

    this.resetPosition();
  },
  computed: {
    ...mapState({
      tick: state => state.tick,
      lives: state => state.lives,
      level: state => state.level
    }),
    percent() {
      let pos = this.postion;
      return `calc(${pos}%)`;
    },
    maxLeft() {
      return 100 - 100 / this.denominator;
    },
    denominator() {
      return Math.min(16, this.baseWidth / (2 / this.level));
    },
    width() {
      return `${100 / this.denominator}%`;
    }
  },
  watch: {
    tick: function() {
      this.loop();
    },
    lives() {
      this.resetPosition();
    },
    level() {
      this.resetPosition();
    }
  },
  methods: {
    updatePostion(direction) {
      // if (!this.active) return;

      switch (direction) {
        case "ArrowLeft":
          this.keydown = true;
          this.direction = -1;
          this.currentSpeed += 0.75;
          break;
        case "ArrowRight":
          this.keydown = true;
          this.direction = 1;
          this.currentSpeed += 0.75;
          break;
      }
    },
    resetPosition() {
      this.postion = 50 - 100 / this.denominator / 2;
    },
    loop() {
      let newSpeed = this.currentSpeed;
      let newPos = this.postion;
      if (this.keydown) {
        newSpeed = this.currentSpeed + 0.05;
        newSpeed = Math.min(newSpeed, this.maxSpeed);
        this.currentSpeed = newSpeed;
      } else {
        newSpeed = this.currentSpeed * this.drag;
        this.currentSpeed = newSpeed;
      }

      newPos = this.postion + this.currentSpeed * this.direction;

      if (newPos < 0) {
        newPos = 0;
        this.currentSpeed = 0;
      }

      if (newPos > this.maxLeft) {
        newPos = this.maxLeft;
        this.currentSpeed = 0;
      }

      this.postion = newPos;
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  height: 20px;
  // margin: 2px;
  background: #fff;
  position: absolute;
  bottom: 0;
  transition: left 100ms ease;
  overflow: hidden;
}
</style>
