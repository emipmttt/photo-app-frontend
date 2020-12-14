<template>
  <div class="camera-container">
    <div class="camera-container__logo-container">
      <img :src="require('@/assets/img/colgate-logo-background.png')" alt="" />
    </div>
    <div class="modal" v-if="showHelpMessage">
      <p>
        Muestra un producto colgate, donde aparezca el logo de colgate
        claramente.
      </p>
    </div>
    <div
      :class="{ 'hide-camera': openCamera }"
      ref="camera"
      class="camera-container__image"
    >
      <Filter v-if="!loading && showFilters" />
      <Scanner v-if="!loading && showScanner" v-show="!showFilters" />
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
      <ChangeCamera
        @hideCamera="openCamera = false"
        @showCamera="openCamera = true"
        @change="changeCamera($event)"
      />
    </div>
  </div>
  <Counter :counter="counter" v-if="showCounter" />
  <div v-if="showSnap" class="snap-animation">.</div>

  <canvas ref="canvas"></canvas>
  <Loading v-if="loading" />
</template>

<script>
import api from "@/services/api";

//components

import Counter from "./components/Counter";
import Filter from "./components/Filter";
import Scanner from "./components/Scanner";
import Loading from "./components/Loading";
import ChangeCamera from "./components/ChangeCamera";

import { mapMutations, mapState } from "vuex";

export default {
  components: {
    Counter,
    Filter,
    ChangeCamera,
    Loading,
    Scanner,
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

      loading: true,

      // scan colgate product with an setInterval
      scanCounter: 0,

      // to show video
      openCamera: false,

      // to show filters
      showFilters: false,
      showScanner: true,
      showHelpMessage: false,
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
    async drawImage(logo) {
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

      if (logo) {
        this.context.drawImage(
          filter,
          parseInt(filter.style.left.replace(/px/, "")),
          parseInt(filter.style.top.replace(/px/, "")),
          // parseInt(filter.style.left.replace(/px/, "")) + filter.clientWidth,
          // parseInt(filter.style.top.replace(/px/, "")) + filter.clientHeight
          filter.clientWidth,
          filter.clientHeight
        );
      }

      if (logo) {
        this.context.drawImage(
          document.querySelector(".camera-container__logo-container img"),
          20,
          0,
          // parseInt(filter.style.left.replace(/px/, "")) + filter.clientWidth,
          // parseInt(filter.style.top.replace(/px/, "")) + filter.clientHeight
          document.querySelector(".camera-container__logo-container img")
            .clientWidth,
          document.querySelector(".camera-container__logo-container img")
            .clientHeight
        );
      }

      let bodyHeight = document.querySelector("body").clientHeight;

      if (logo) {
        window.scrollTo(0, document.querySelector("video").clientHeight * 2);
      }

      // console.log(
      //   parseInt(filter.style.left.replace(/px/, "")),
      //   parseInt(filter.style.top.replace(/px/, "")),
      //   parseInt(filter.style.left.replace(/px/, "")) + filter.clientWidth,
      //   parseInt(filter.style.top.replace(/px/, "")) + filter.clientHeight
      // );

      const imageData = this.$refs.canvas.toDataURL("image/png");

      if (logo) {
        let response = await api.post("/file", {
          image: imageData,
        });

        window.scrollTo(0, 0);
        this.loading = false;
        this.$router.push("/foto" + response.data.data.replace(/storage/g, ""));
      } else {
        let response = await api.post("/logo", {
          image: imageData,
        });
        return response;
      }
      this.$refs.canvas.style.display = "none";
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
          this.drawImage(true);
          console.log(this.stream);
          this.stream.getTracks().forEach((track) => track.stop());
          this.$refs.video.pause();
          this.loading = true;
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
    async scan() {
      const brands = await this.drawImage(false);

      const findLogo = brands.data.data.find((el) => {
        return el.description.toLowerCase().includes("colgate");
      });

      if (findLogo) {
        this.showFilters = true;
        this.showHelpMessage = false;
        this.showScanner = false;
        return;
      }

      if (this.scanCounter == 1) {
        this.showHelpMessage = true;
      } else if (this.scanCounter == 5) {
        return this.$router.push("/");
      }

      this.scanCounter++;
      this.scan();
    },
    streamCamera(stream) {
      this.stream = stream;

      if (stream) {
        this.$refs.video.srcObject = stream;
        this.alertMessage = "";
        setTimeout(() => {
          this.scan();
        }, 3000);
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
    this.$refs.video.addEventListener("loadeddata", () => {
      this.resizeCamera();
      this.loading = false;
    });
  },
};
</script>

<style lang="scss">
@import "./Camera.scss";
</style>