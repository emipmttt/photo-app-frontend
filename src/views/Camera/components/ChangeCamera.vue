<template>
  <img
    @click="changeDevices"
    style="width: 30px"
    :src="require('@/assets/img/icons/flip_camera.svg')"
  />
</template>

<script>
export default {
  data() {
    return {
      cameras: [],
      cameraSelected: 0,
    };
  },
  methods: {
    changeDevices() {
      if (this.cameras.length - 1 > this.cameraSelected + 1) {
        this.cameraSelected = this.cameraSelected + 1;
      } else {
        this.cameraSelected = 0;
      }
      // alert(this.cameraSelected + " " + this.cameras[this.cameraSelected]);
      this.$emit("change", this.cameras[this.cameraSelected]);
    },
    gotDevices(mediaDevices) {
      this.cameras = [];
      var cameras = [];

      mediaDevices.forEach((mediaDevice) => {
        if (mediaDevice.kind === "videoinput") {
          cameras.push(mediaDevice.deviceId);
        }
      });
      this.cameras = cameras;
      // alert(this.cameras);
    },
  },
  mounted() {
    navigator.mediaDevices.enumerateDevices().then(this.gotDevices);
  },
};
</script>

<style>
</style>