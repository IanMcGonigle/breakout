<template lang="pug">
  div
    .container
      .board
        .field
          .brick(v-for="brick in bricks")
        .ball
        .paddle
</template>

<script>
export default {
  name: "Game",
  data() {
    return {
      bricks: []
    };
  },
  created() {
    this.bricks.length = 40;
    alert("Created! ", this.bricks.length);
  }
};
</script>

<style lang="scss" scoped>
.board {
  position: relative;
  background: #000;
  min-width: 300px;
  min-height: calc(100vh - 300px);
}

.field {
  display: flex;
  flex-wrap: wrap;
}

.brick {
  height: 30px;
  margin: 2px;
  background: #fff;
  width: calc((100 / 8) * 1% - 4px);
}

.ball {
  --size: 20px;
  background: aquamarine;
  width: var(--size);
  height: var(--size);
}

.paddle {
  height: 20px;
  background: #fff;
  width: calc((100 / 8) * 1% - 4px);
  position: absolute;
  bottom: 0;
}
</style>
