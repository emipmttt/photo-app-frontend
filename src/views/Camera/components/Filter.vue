<template>
  <img
    draggable="false"
    ref="filter"
    id="filter"
    style="left: 0px; top: 0px"
    class="filter"
    :src="require('@/assets/img/s1.gif')"
    @mousedown="mouseDown"
    @touchstart="mouseDown"
  />
</template>

<script>
export default {
  methods: {
    mouseUp() {
      window.removeEventListener("mousemove", this.divMove, true);
      window.removeEventListener("touchmove", this.divMove, true);
    },

    mouseDown(e) {
      window.addEventListener("mousemove", this.divMove, true);
      window.addEventListener("touchmove", this.divMove, true);
    },

    divMove(e) {
      var div = this.$refs.filter;
      div.style.position = "absolute";
      div.style.top = e.clientY - div.clientHeight / 2 + "px";
      div.style.left = e.clientX - div.clientWidth / 2 + "px";
    },
  },
  mounted() {
    window.addEventListener("mouseup", this.mouseUp, false);
    window.addEventListener("touchleave", this.mouseUp, false);
    document.querySelector("#video").addEventListener("click", this.divMove);
  },
};
</script>

<style>
.filter {
  width: 50vw;
  position: absolute;
}
</style>