<template>
  <main
    class="primary flex justify-center align-center items-center"
    :style="`background-image:url('${require('@/assets/img/Tutorial/pattern.png')}');  background-position:center ;`"
  >
    <section class="text-center md:text-left md:flex items-center">
      <div class="polaroid-container">
        <img :src="photoPath" alt="" />
      </div>
      <div>
        <h1 class="text-3xl md:text-5xl white--text"><i>Compartir</i></h1>
        <a
          :href="photoPath"
          target="_blank"
          download="navidad.png"
          class="mr-4"
        >
          <button class="btn white primary--text mt-10">
            <img :src="require('@/assets/img/Photo/instagram.png')" />
          </button>
        </a>
        <div
          class="fb-share-button"
          data-href="https://emipmttt.github.io/photo-app-frontend/#/foto/1606361246632.png"
          data-layout="button"
          data-size="small"
        >
          <a
            :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeUrl()}&amp;src=sdkpreparse`"
            target="_blank"
            download="navidad.png"
          >
            <button class="btn white primary--text mt-10">
              <img :src="require('@/assets/img/Photo/instagram.png')" />
            </button>
          </a>
        </div>

        <br />
        <br />

        <h1 class="text-3xl md:text-5xl white--text"><i>Guardar foto</i></h1>

        <a :href="photoPath" target="_blank" download="navidad.png">
          <button class="btn white primary--text mt-10">descargar foto</button>
        </a>
        <br />
        <button
          @click="$router.push('/')"
          class="btn white primary--text mt-10"
        >
          Volver a Vivir la experiencia
        </button>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      photoPath: "",
      sharePath: "",
    };
  },
  methods: {
    encodeUrl() {
      var str = this.sharePath + "";
      str = encodeURIComponent(str)
        .replace(/!/g, "%21")
        .replace(/'/g, "%27")
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29")
        .replace(/\*/g, "%2A")
        .replace(/~/g, "%7E");

      return str;
    },
  },
  created() {
    this.photoPath =
      "https://photo-filter-backend.herokuapp.com/" + this.$route.params.photo;
    this.sharePath = location.href;

    // response.data.data.replace(/storage/g, "");
    // const imgPath =
    //
    // console.log(audioPath);
    // console.log(response.data.data.replace(/storage/g, ""));
    // console.log(response.data);
  },
};
</script>

<style>
img {
  width: 100%;
}

.polaroid-container {
  display: inline-block;
  width: 50%;
  margin: 50px;

  box-shadow: 0px 1px 30px rgba(0, 0, 0, 0.5);

  overflow: hidden;
}

body {
  overflow: auto;
}
</style>