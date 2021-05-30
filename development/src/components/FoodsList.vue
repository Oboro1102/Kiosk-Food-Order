<template>
  <section class="foods">
    <transition-group tag="ul" class="foods__list" name="fade" mode="out-in">
      <li class="foods__list__item" v-for="item in totalFoods" :key="item.id">
        <div
          class="foods__list__item__cover"
          :style="{ backgroundImage: 'url(' + item.pic + ')' }"
        ></div>
        <h5 class="foods__list__item__title">{{ item.title }}</h5>
        <div class="foods__list__item__action">
          <div class="foods__list__item__action__price">
            <small>NT</small> {{ item.price.toLocaleString("zh-TW") }}
          </div>
          <button
            type="button"
            class="button"
            :disabled="checkExist(item) !== -1"
            @click="addToCart(item)"
          >
            下訂
          </button>
        </div>
      </li>
    </transition-group>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FoodsList",
  computed: {
    active(): string {
      return this.$store.state.active;
    },
    totalFoods(): {
      id: string;
      kind: string;
      title: string;
      pic: string;
      price: number;
    }[] {
      return this.$store.state.foods.filter(
        (item: { kind: string }) => item.kind === this.active
      );
    },
  },
  methods: {
    addToCart(item: {
      id: string;
      kind: string;
      title: string;
      pic: string;
      price: number;
      qty: number;
    }) {
      item.qty = 1;
      this.$store.dispatch("addToCart", item);
    },
    checkExist(searchTarget: { id: string }): number {
      return this.$store.state.cart.findIndex(
        (item: { id: string }) => item.id === searchTarget.id
      );
    },
  },
});
</script>

<style lang="scss">
.foods {
  width: calc(80% - #{$grid-gap});
  height: 100%;
  overflow-y: auto;

  @include breakpoint-xl {
    width: calc(60% - #{$grid-gap});
  }

  @include breakpoint-md {
    width: calc(50% - #{$grid-gap});
  }

  &__list {
    @include list-style;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    &__item {
      @include flex-arrangement(4);

      @include breakpoint-lg {
        &:nth-of-type(4n) {
          margin-right: $grid-gap;
        }
        @include flex-arrangement(3);
      }

      @include breakpoint-md {
        &:nth-of-type(3n) {
          margin-right: $grid-gap;
        }
        @include flex-arrangement(2);
      }

      @include breakpoint-sm {
        width: 100%;
        margin-right: 0 !important;

        &:nth-of-type(n + 2) {
          margin-top: $grid-gap;
        }
      }

      &__cover {
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
        border-radius: $border-radius $border-radius 0 0;
        background-size: cover;
        background-position: center;
        overflow: hidden;
      }

      &__title,
      &__action {
        margin: 0;
        padding: 0.75rem 0.75rem 0;
        background-color: $color-white;
      }

      &__action {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-bottom: 0.75rem;
        font-size: $font-size-medium;
        font-weight: $font-weight-medium;
        border-radius: 0 0 $border-radius $border-radius;

        .button {
          margin-left: auto;
          font-size: $font-size-light;
          font-weight: $font-weight-regular;
        }
      }
    }
  }
}
</style>