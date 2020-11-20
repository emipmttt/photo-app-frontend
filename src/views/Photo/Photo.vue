<template>
  <main class="primary-gradient flex justify-center align-center items-center">
    <section class="text-center">
      <h1 class="text-3xl md:text-5xl">
        ¡Gracias por Participar en la experiencia!
      </h1>

      <div class="polaroid-container">
        <img :src="photoPath" alt="" />
      </div>

      <br />
      <button @click="$router.push('/')" class="btn white primary--text mt-10">
        Volver a Vivir la experiencia
      </button>

      <br />

      <a :href="photoPath" target="_blank" download="navidad.png">
        <button class="btn white primary--text mt-10">descargar</button>
      </a>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      photoPath: "",
    };
  },
  mounted() {
    this.photoPath =
      "https://photo-filter-backend.herokuapp.com/" + this.$route.params.photo;

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
  padding: 30px;
  padding-bottom: 130px;
  background: linear-gradient(#fff, #c1c1c1);

  box-shadow: 0px 1px 30px rgba(0, 0, 0, 0.5);
}

@media (max-width: 600px) {
  .polaroid-container {
    width: 60%;
    padding: 15px;
    margin: 20px;
    padding-bottom: 50px;
  }
}

body {
  overflow: auto;
}
</style>