<template>
  <transition-group name="fade" tag="div">
    <template v-for="(santa, index) in santaItems">
      <img
        v-if="currentSanta == index"
        :key="index"
        draggable="false"
        ref="filter"
        id="filter"
        style="left: 0px; top: 0px"
        class="filter"
        :src="santa.path"
      />
    </template>
  </transition-group>
</template>

<script>
export default {
  data() {
    return {
      currentSanta: -1,
      santaItems: [
        { path: require("@/assets/img/Camera/santa-01.gif"), timeout: 6000 },
        { path: require("@/assets/img/Camera/santa-03.png"), timeout: 3000 },
        // require("@/assets/img/Camera/santa-01.png"),
        // require("@/assets/img/Camera/santa-02.png"),
      ],
    };
  },
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
    changeImage() {
      if (this.santaItems.length - 1 >= this.currentSanta + 1) {
        this.currentSanta++;
        setTimeout(() => {
          this.changeImage();
        }, this.santaItems[this.currentSanta].timeout);
      } else {
        console.log(this.santaItems.length - 1, this.currentSanta + 1);
      }
    },
  },
  mounted() {
    this.changeImage();
    // window.addEventListener("mouseup", this.mouseUp, false);
    // window.addEventListener("touchleave", this.mouseUp, false);
    // document.querySelector("#video").addEventListener("click", this.divMove);
  },
};
</script>

<style>
.filter {
  width: 100%;
  height: 100%;
  position: absolute;
}
</style>