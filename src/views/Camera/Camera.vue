<template>
  <div class="camera-container">
    <div class="camera-container__logo-container primary">
      <img :src="require('@/assets/img/Tutorial/colgate-logo.png')" alt="" />
    </div>
    <div ref="camera" class="camera-container__image">
      <Filter />

      <video
        id="video"
        ref="video"
        webkit-playsinline="true"
        playsinline="true"
      ></video>
    </div>

    <div class="camera-container__controls">
      <span class="white--text">
        <router-link to="/">
          <img
            style="width: 30px"
            :src="require('@/assets/img/icons/arrow_back.svg')"
          />
        </router-link>
      </span>
      <button @click="snap">
        <img :src="require('@/assets/img/icons/camera.svg')" alt="" />
      </button>
      <ChangeCamera @change="changeCamera($event)" />
    </div>
  </div>
  <Counter :counter="counter" v-if="showCounter" />
  <div v-if="showSnap" class="snap-animation">.</div>

  <canvas ref="canvas"></canvas>
</template>

<script>
import api from "@/services/api";

//components

import Counter from "./components/Counter";
import Filter from "./components/Filter";
import ChangeCamera from "./components/ChangeCamera";

export default {
  components: {
    Counter,
    Filter,
    ChangeCamera,
  },
  data() {
    return {
      video: null,
      canvas: null,
      context: null,

      stream: null,

      alertMessage: "",

      showCounter: false,
      showSnap: false,
      counter: 3,
      counterInterval: null,
    };
  },
  methods: {
    changeCamera(value) {
      if (typeof this.stream !== "undefined") {
        this.stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
      const videoConstraints = {};
      videoConstraints.deviceId = { exact: value };
      const constraints = {
        video: videoConstraints,
        audio: false,
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          if (stream) {
            this.$refs.video.srcObject = stream;
            this.alertMessage = "";
          } else {
            alert("no pudimos acceder a tu camara");
            this.$router.push("/");
          }
          this.$refs.video.play();
        })
        .then()
        .catch((error) => {
          console.error(error);
        });
    },
    async drawImage() {
      this.$refs.canvas.style.display = "initial";
      this.$refs.canvas.width = video.clientWidth;
      this.$refs.canvas.height = video.clientHeight;
      this.context.drawImage(
        video,
        0,
        0,
        video.clientWidth,
        video.clientHeight
      );

      var filter = document.querySelector("#filter");

      this.context.drawImage(
        filter,
        parseInt(filter.style.left.replace(/px/, "")),
        parseInt(filter.style.top.replace(/px/, "")),
        // parseInt(filter.style.left.replace(/px/, "")) + filter.clientWidth,
        // parseInt(filter.style.top.replace(/px/, "")) + filter.clientHeight
        filter.clientWidth,
        filter.clientHeight
      );

      let bodyHeight = document.querySelector("body").clientHeight;

      window.scrollTo(0, document.querySelector("video").clientHeight * 2);
      console.log(
        parseInt(filter.style.left.replace(/px/, "")),
        parseInt(filter.style.top.replace(/px/, "")),
        parseInt(filter.style.left.replace(/px/, "")) + filter.clientWidth,
        parseInt(filter.style.top.replace(/px/, "")) + filter.clientHeight
      );

      const imageData = this.$refs.canvas.toDataURL("image/png");

      const response = await api.post("/file", {
        image: imageData,
      });

      window.scrollTo(0, 0);

      this.$router.push("/foto" + response.data.data.replace(/storage/g, ""));
    },
    snap() {
      this.showCounter = true;
      this.counterInterval = setInterval(() => {
        this.counter--;
        if (this.counter < 0) {
          clearInterval(this.counterInterval);
          this.showCounter = false;
          this.showSnap = true;
          this.counter = 3;
          this.drawImage();
          setTimeout(() => {
            this.showSnap = false;
          }, 1000);
        }
      }, 1000);
    },

    async initCamera() {
      this.context = this.$refs.canvas.getContext("2d");

      const constraints = {
        video: { facingMode: "user" },
        audio: false,
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        this.streamCamera(stream);
        this.alertMessage = "";
      } catch (error) {
        alert("no pudimos acceder a tu camara");
        this.$router.push("/");
      }
    },
    streamCamera(stream) {
      this.stream = stream;

      if (stream) {
        this.$refs.video.srcObject = stream;
        this.alertMessage = "";
      } else {
        alert("no pudimos acceder a tu camara");
        this.$router.push("/");
      }
      this.$refs.video.play();
    },
    resizeCamera() {
      let heightScreen = window.innerHeight || document.body.clientHeight;
      if (this.$refs.video.clientHeight > heightScreen) {
        const total = heightScreen;
        const current = this.$refs.video.clientHeight;

        const percent = (current * 100) / total;

        var float = percent / 100;

        this.$refs.camera.style.transform = `scale(${1 - (float - 1.1)})`;
        // this.$refs.camera.style.transform = `scale(${1 - (float - 1)})`;
        this.$refs.camera.style.marginTop = `-${parseInt(percent) * 1.5}px`;

        // console.log(
        //   "La camara es muy grande",
        //   this.$refs.video.clientHeight,
        //   screen.height
        // );
      } else {
        this.$refs.camera.style.marginTop = `0px`;
        this.$refs.camera.style.transform = `scale(1)`;

        // console.log(
        //   "La camara esta en rango",
        //   this.$refs.video.clientHeight,
        //   screen.height
        // );
      }
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.initCamera();
    window.onresize = this.resizeCamera;
    this.$refs.video.addEventListener("loadeddata", this.resizeCamera);
    this.resizeCamera();
  },
};
</script>

<style lang="scss">
body {
  background: #000;
}
video {
  width: 100%;
}

.camera-container {
  background: #000;
  min-height: 100vh;

  &__logo-container {
    position: fixed;
    top: 0;
    left: 10px;
    width: 80px;
    z-index: 2;
    padding: 20px 10px;
    border-radius: 0 0 35px 35px;
  }

  &__controls {
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    bottom: 0px;
    padding: 5%;
    text-align: center;
    background: linear-gradient(
      transparent,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.9) 80%
    );
    button {
      background: white;
      padding: 25px;
      border-radius: 50%;
      transition: 0.5s;

      img {
        width: 35px;
      }
    }

    button:hover {
      outline: none;
      box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.7);
      transition: 0.3s;
    }

    button:focus {
      outline: none;
    }
  }
}

.snap-animation {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  opacity: 0;
  background: white;
  animation: snap 0.5s;
}

@keyframes snap {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

body {
  overflow: hidden;
}
</style>