<template>
  <div class="blue-filter"></div>
  <div class="scanner"></div>
</template>

<script>
export default {};
</script>

<style scoped>
.blue-filter {
  width: 100%;
  height: 100%;
  background: rgba(0, 140, 255, 0.4);
  position: fixed;
  animation: blue-filter 2s infinite linear;
}

.scanner {
  position: fixed;
  top: 0%;
  width: 100%;
  height: 30px;
  background: linear-gradient(transparent, rgba(0, 140, 255, 0.6), transparent);
  transition: 0.6s;
  animation: scanner 5s infinite;
}

@keyframes scanner {
  0% {
    top: 0%;
  }
  50% {
    top: 100%;
  }
  100% {
    top: 0%;
  }
}

@keyframes blue-filter {
  0% {
    background: rgba(0, 140, 255, 0.2);
  }
  50% {
    background: rgba(0, 140, 255, 0.3);
  }
  100% {
    background: rgba(0, 140, 255, 0.2);
  }
}
</style>