<template>
  <div class="modal-counter">
    <!-- <img :src="require('@/assets/img/ball.png')" /> -->
    <h1 class="white--text">
      <i>{{ counter }}</i>
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    counter: Boolean,
  },
};
</script>

<style lang="scss">
.modal-counter {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0px;
  width: 100%;
  height: 100vh;
  font-size: 80px;

  img {
    width: 100px;
  }

  h1 {
    position: absolute;
  }
}
</style>