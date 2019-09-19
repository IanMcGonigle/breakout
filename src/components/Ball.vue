<template>
  <div v-bind:style="inlineStyle" />
</template>

<script>
export default {
  name: "Ball",
  props: ["position"],
  computed: {
    inlineStyle() {
      return `left: ${this.position.x}%; top: ${this.position.y}%`;
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  --size: 15px;
  background: aquamarine;
  width: var(--size);
  height: var(--size);
  position: absolute;
}
</style>