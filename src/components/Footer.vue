<template>
  <footer class="footer">
    <div class="footer__about">
      <button type="button" class="button button--about" @focus="showPopover = true"
        @blur="showPopover = false">ABOUT</button>
      <transition name="slideDown" mode="out-in" appear>
        <div class="footer__about__popover" v-if="showPopover">本系統採用<a href="https://v3.vuejs.org/"
            target="_blank">Vue3</a>進行前端開發，圖片素材來源於<a href="https://unsplash.com/" target="_blank">Unsplash</a>。</div>
      </transition>
    </div>
    <div class="footer__copyright">&copy; 2021<span v-if="thisYear != 2021"
        v-text="`&nbsp-&nbsp;${thisYear}`" />&nbsp;Design & Coding by ツキノリュウ.</div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
  data() {
    return {
      showPopover: false,
    };
  },
  computed: {
    thisYear() {
      return new Date().getFullYear();
    },
  },
});
</script>

<style lang="scss">
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: calc(100% - #{$grid-gap}* 2);
  height: $footer-height;
  margin: 0 auto;

  @include breakpoint-esm {
    height: auto;
    padding-bottom: $grid-gap;
  }

  &__about {
    position: relative;

    &__popover {
      position: absolute;
      left: 0;
      bottom: 120%;
      min-width: 200px;
      padding: 0.75em;
      font-size: $font-size-light;
      background-color: $color-white;
      border-radius: $border-radius;
    }
  }

  &__copyright {
    margin-left: auto;
    padding: 0 $grid-gap;
    line-height: $footer-height;
    color: $color-black;
    font-size: $font-size-thin;
    background-color: $color-white;
    border-radius: $border-radius-round;

    @include breakpoint-esm {
      margin: 0.5rem auto 0;
      line-height: 1.75;
      border-radius: $border-radius;
    }
  }

  a {
    margin: 0 0.25em;
  }
}
</style>