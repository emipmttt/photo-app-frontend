<template>
  <router-view />
</template>
<script>
require("./assets/css/styles.scss");
export default {};
</script>
<style >
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.5s;
}

.fade-enter-active {
  transition-delay: 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>