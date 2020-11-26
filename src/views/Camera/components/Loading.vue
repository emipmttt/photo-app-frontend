<template>
  <div
    class="background"
    :style="`background:url('${require('@/assets/img/Tutorial/bg-screen-1.png')}'); background-size: cover; background-position:center ;`"
  >
    <h1 class="text-3xl italic white--text">Cargando ...</h1>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>