<template>
  <div class="camera-container">
    <div class="camera-container__image">
      <Filter />

      <video
        id="video"
        ref="video"
        webkit-playsinline="true"
        playsinline="true"
      ></video>
    </div>

    <div class="camera-container__controls">
      <button @click="snap">
        <img :src="require('@/assets/img/camera.svg')" alt="" />
      </button>
    </div>
  </div>
  <Counter :counter="counter" v-if="showCounter" />
  <div v-if="showSnap" class="snap-animation">.</div>

  <canvas ref="canvas"></canvas>
</template>

<script>
import Counter from "./components/Counter";
import Filter from "./components/Filter";
import api from "@/services/api";

export default {
  components: {
    Counter,
    Filter,
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
        this.alertMessage = "No pudimos acceder a tu camara";
        console.error("Oops. Something is broken.", error);
      }
    },
    streamCamera(stream) {
      this.stream = stream;

      if (stream) {
        this.$refs.video.srcObject = stream;
        this.alertMessage = "";
      } else {
        this.alertMessage = "No pudimos acceder a tu camara";
      }
      this.$refs.video.play();
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    this.initCamera();
  },
};
</script>

<style lang="scss">
video {
  width: 100%;
}

.camera-container {
  background: #000;
  min-height: 100vh;

  &__image {
  }

  &__controls {
    position: fixed;
    width: 100%;
    bottom: 0px;
    padding: 5%;
    text-align: center;
    background: linear-gradient(
      transparent,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.7) 80%
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