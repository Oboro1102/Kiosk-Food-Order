<template>
  <div class="modal">
    <div class="modal__wrap">
      <h4 class="modal__title">{{ title }}</h4>
      <slot name="content" />
      <div class="modal__action">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>

<style lang="scss">
.modal {
  @include fixed-object;
  z-index: $layer-lv4;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: $grid-gap;
  background-color: rgba(0, 0, 0, 0.95);

  &__wrap {
    min-width: 250px;
    padding: $grid-gap;
    background-color: $color-white;
    border-radius: $border-radius;
    text-align: center;
  }

  &__title {
    width: 100%;
    margin: 0;
    font-size: $font-size-bold;
    font-weight: $font-weight-bold;
  }

  &__list {
    min-width: 45vw;
    padding: $grid-gap 0 !important;
    
    @include breakpoint-lg {
      min-width: 75vw;
    }

    &__price {
      margin-left: auto;
      font-size: $font-size-thin;
    }

    &__total {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: $grid-gap 0;
      font-size: $font-size-bold;
      font-weight: $font-weight-bold;
      border-top: 1px solid $color-gray-light;
    }
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;

    .button {
      min-width: 45%;
    }
  }

  p {
    span {
      margin: 0 0.5em;
      color: $color-red;
      font-size: $font-size-bold;
      font-weight: $font-weight-bold;
    }
  }
}
</style>
