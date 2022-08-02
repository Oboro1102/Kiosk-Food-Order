<template>
  <ul class="tabs">
    <li class="tabs__item" :class="{ 'tabs__item--active': item === active }" v-for="(item, index) in foodsKind"
      :key="index" @click="changeActive(item)">
      <span v-if="item === 'ch'">中式餐點</span>
      <span v-if="item === 'ws'">西式餐點</span>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters, mapState } from "vuex";

export default defineComponent({
  computed: {
    ...mapState(['active']),
    ...mapGetters(["foodsKind"])
  },
  methods: {
    changeActive(keyword: string) {
      return this.$store.dispatch("changeActive", keyword);
    },
  },
});
</script>

<style lang="scss">
.tabs {
  @include list-style;
  display: flex;
  align-items: center;
  width: calc(100% - #{$grid-gap}* 2);
  min-height: $navbar-height;
  margin: 0 auto;
  border-radius: $border-radius;
  overflow-x: auto;

  &__item {
    min-width: 100px;
    margin-left: $grid-gap;
    padding: 0 1em;
    line-height: $navbar-height;
    background-color: $color-white;
    border-radius: $border-radius-round;
    cursor: pointer;

    &:first-child {
      margin-left: 0;
    }

    &:hover,
    &--active {
      color: $color-white;
      background-color: $color-blue;
    }
  }
}
</style>