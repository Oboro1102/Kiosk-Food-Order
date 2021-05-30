<template>
  <FoodsTabs />
  <main>
    <FoodsList />
    <Cart />
  </main>
  <Footer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FoodsTabs from "./components/FoodsTabs.vue";
import FoodsList from "./components/FoodsList.vue";
import Cart from "./components/Cart.vue";
import Footer from "./components/Footer.vue";

export default defineComponent({
  name: "App",
  components: {
    FoodsTabs,
    FoodsList,
    Cart,
    Footer,
  },
});
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  padding: $grid-gap 0;
}

main {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: calc(100% - #{$navbar-height} - #{$footer-height});
  padding: $grid-gap;
}
</style>