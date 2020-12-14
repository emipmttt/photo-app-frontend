<template>
  <transition name="fade">
    <main
      v-if="step == 0"
      class="first-step flex justify-center align-center items-center"
      :style="`background:url('${require('@/assets/img/Tutorial/bg-screen-1.png')}'); background-size: cover; background-position:center ;`"
    >
      <img
        class="first-step__logo"
        :src="require('@/assets/img/Tutorial/colgate-logo.png')"
      />
    </main>
    <main
      v-else-if="step == 1"
      class="second-step primary"
      :style="`background-image:url('${require('@/assets/img/Tutorial/pattern.png')}'); background-size: cover; background-position:center ;`"
    >
      <div class="second-step__santa">
        <div class="second-step__santa__logo-container primary">
          <img
            :src="require('@/assets/img/Tutorial/colgate-logo.png')"
            alt=""
          />
        </div>

        <img
          class="second-step__santa__image"
          :src="require('@/assets/img/Tutorial/bg-screen-2.png')"
          alt=""
        />
      </div>

      <div class="text-center pb-10">
        <h1 class="font-normal italic text-3xl md:text-5xl white--text">
          ¡Tomate una <br />
          foto con Santa!
        </h1>
        <p class="white--text mt-5">
          Da clic en el botón de abajo y vive esta experiencia navideña
        </p>

        <button @click="next" class="btn white primary--text mt-10">
          Comenzar
        </button>
      </div>
    </main>
    <main
      v-else-if="step == 2"
      class="second-step primary"
      :style="`background-image:url('${require('@/assets/img/Tutorial/pattern.png')}'); background-size: cover; background-position:center ;`"
    >
      <div class="second-step__santa pt-5">
        <div class="second-step__santa__logo-container primary d-absolute">
          <img :src="require('@/assets/img/Tutorial/colgate-logo.png')" />
        </div>

        <img
          class="second-step__santa__image"
          style="border-radius: 5px"
          :src="require('@/assets/img/Tutorial/example.png')"
        />
      </div>

      <div class="text-center mt-10 pb-10">
        <h1 class="font-normal italic text-3xl md:text-5xl white--text">
          Muestra un producto colgate <br />
          para llamar a santa
        </h1>
        <p class="white--text mt-5">
          Muestra un producto colgate, asegurate de que aparezca el logo de
          colgate claramente.
        </p>

        <button
          @click="$router.push('/camara')"
          class="btn white primary--text mt-10"
        >
          Comenzar
        </button>
      </div>
    </main>
  </transition>
</template>

<script>
require("@/assets/css/colors.scss");
export default {
  data() {
    return {
      step: 0,
    };
  },
  methods: {
    next() {
      this.step++;
    },
  },
  mounted() {
    setTimeout(() => {
      this.next();
    }, 3000);
  },
};
</script>

<style lang="scss" scoped>
.first-step {
  &__logo {
    width: 200px;
  }
}

.second-step {
  &__santa {
    width: 100%;
    margin: 0 auto;

    &__logo-container {
      position: absolute;
      margin: 0px 10px;
      width: 80px;
      padding: 20px 10px;
      border-radius: 0 0 35px 35px;
    }
  }

  @media only screen and (min-width: 400px) and (max-width: 699px) {
    &__santa {
      width: 70%;
      margin: 0 auto;
    }
  }

  @media only screen and (min-width: 700px) and (max-width: 999px) {
    &__santa {
      width: 50%;
      margin: 0 auto;
    }
  }

  @media (min-width: 1000px) {
    &__santa {
      width: 400px;
      margin: 0 auto;
    }
  }
}
</style>
