<template>
  <main class="primary-gradient flex justify-center align-center items-center">
    <section class="text-center">
      <h1 class="text-3xl md:text-5xl">¿Quieres tomarte una foto con Santa?</h1>
      <p class="mt-4">
        Da clic en el botón de abajo y vive esta experiencia navideña
      </p>

      <button
        @click="$router.push('/camara')"
        class="btn white primary--text mt-10"
      >
        Comenzar
      </button>
    </section>
  </main>
</template>

<script>
export default {
  methods: {
    start() {},
  },
};
</script>

<style>
</style>