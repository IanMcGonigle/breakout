<template>
  <div v-bind:style="{ 'left': percent }"></div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Paddle",
  props: ["active"],
  data() {
    return {
      postion: 0,
      maxSpeed: 5,
      currentSpeed: 0,
      direction: 0,
      drag: 0.75,
      keydown: false,
      maxLeft: 100 - 100 / 8
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
  },
  computed: {
    ...mapState({
      tick: state => state.tick
    }),
    percent() {
      let pos = this.postion;
      return `${pos}%`;
    }
  },
  watch: {
    tick: function(oldTick, newTick) {
      this.loop();
    }
  },
  methods: {
    updatePostion(direction) {
      if (!this.active) return;

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
    lerp(start, end, amt) {
      return (1 - amt) * start + amt * end;
    },
    loop() {
      // console.log("Paddle loop");
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
  margin: 2px;
  background: #fff;
  width: calc((100 / 8) * 1%);
  position: absolute;
  bottom: 0;
  transition: left 100ms ease;
  overflow: hidden;
}
</style>