<template>
  <div class="cart">
    <h6 class="cart__title" v-if="cartList.length < 1">購物車是空的！</h6>
    <transition-group
      tag="ul"
      class="cart__list"
      name="slideDown"
      mode="out-in"
    >
      <li class="cart__list__item" v-for="item in cartList" :key="item.id">
        <h6 class="cart__list__item__title">
          <div
            class="cart__list__item__cover"
            :style="{ backgroundImage: 'url(' + item.pic + ')' }"
          ></div>
          <span>{{ item.title }}</span>
        </h6>
        <div class="cart__list__item__counter">
          <button
            type="button"
            class="button button--round"
            :disabled="item.qty < 2"
            @click="setQty(false, item)"
          >
            －
          </button>
          <input
            type="number"
            min="1"
            name="qty"
            :value="item.qty"
            @change="updateQty(item, $event)"
          />
          <button
            type="button"
            class="button button--round"
            @click="setQty(true, item)"
          >
            ＋
          </button>
        </div>
        <div class="cart__list__item__price">
          <button
            type="button"
            class="button button--refuse"
            @click="removeItemFormCart(item)"
          >
            移除
          </button>
          <span
            >小計：{{ (item.qty * item.price).toLocaleString("zh-TW")
            }}<small> 元</small></span
          >
        </div>
      </li>
    </transition-group>
    <div class="cart__price">
      <span>總計：</span>
      <span>{{ total.toLocaleString("zh-TW") }}<small> 元</small></span>
      <button
        type="button"
        class="button button--checkout button--confirm"
        @click="showConfirm = !showConfirm"
        :disabled="cartList.length < 1"
      >
        送出訂單
      </button>
    </div>
    <transition name="scale" mode="out-in" appear>
      <Modal title="確認訂單" v-if="showConfirm">
        <template #content>
          <h6 class="modal__title" style="text-align: left">餐點</h6>
          <ul class="cart__list modal__list">
            <li
              class="cart__list__item"
              v-for="item in cartList"
              :key="item.id"
            >
              <div
                class="cart__list__item__cover"
                :style="{ backgroundImage: 'url(' + item.pic + ')' }"
              ></div>
              <h6 class="cart__list__item__title">
                {{ item.title }} x {{ item.qty }}
              </h6>
              <span class="modal__list__price">
                小計：{{ (item.qty * item.price).toLocaleString("zh-TW")
                }}<small> 元</small>
              </span>
            </li>
          </ul>
          <div class="modal__list__total">
            <span>訂單金額：</span>
            <span>{{ total.toLocaleString("zh-TW") }}<small> 元</small></span>
          </div>
        </template>
        <template #action>
          <button
            type="button"
            class="button button--refuse"
            @click="showConfirm = !showConfirm"
          >
            回上一步驟
          </button>
          <button
            type="button"
            class="button button--confirm"
            @click="
              showConfirm = false;
              showResult = true;
            "
          >
            訂單完成
          </button>
        </template>
      </Modal>
    </transition>
    <transition name="scale" mode="out-in" appear>
      <Modal title="訂購成功" v-if="showResult">
        <template #content>
          <p>
            您的取餐號碼為<span>{{ generateRandomNumber() }}</span
            >，請至櫃台等號付款。
          </p>
        </template>
        <template #action>
          <button
            type="button"
            class="button button--confirm"
            @click="closeResultModal"
          >
            關閉
          </button>
        </template>
      </Modal>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from "@/components/Modal.vue";

export default defineComponent({
  name: "Cart",
  components: { Modal },
  data() {
    return {
      showConfirm: false,
      showResult: false,
    };
  },
  computed: {
    cartList(): {
      id: string;
      kind: string;
      title: string;
      pic: string;
      price: number;
      qty: number;
    }[] {
      return this.$store.getters["sortedCartList"];
    },
    total() {
      if (this.cartList.length < 1) {
        return 0;
      } else {
        const reducer = (accumulator: any, currentValue: any) =>
          accumulator + currentValue;

        const total: number = this.cartList
          .map((item: { price: number; qty: number }) => {
            return item.qty * item.price;
          })
          .reduce(reducer);

        return total;
      }
    },
  },
  methods: {
    setQty(
      plus: boolean,
      updateTarget: {
        id: string;
        kind: string;
        title: string;
        pic: string;
        price: number;
        qty: number;
      }
    ) {
      if (plus) {
        updateTarget.qty += 1;
        return this.$store.dispatch("updateCart", updateTarget);
      } else {
        updateTarget.qty -= 1;
        return this.$store.dispatch("updateCart", updateTarget);
      }
    },
    updateQty(
      updateTarget: {
        id: string;
        kind: string;
        title: string;
        pic: string;
        price: number;
        qty: number;
      },
      e: any
    ) {
      updateTarget.qty = Number(e.target.value);
      return this.$store.dispatch("updateCart", updateTarget);
    },
    removeItemFormCart(removeTarget: { id: string }) {
      return this.$store.dispatch("removeItemFormCart", removeTarget.id);
    },
    generateRandomNumber(): string {
      let result = "";
      let n = 0;

      for (let index = 0; index < 4; index++) {
        n = Math.floor(Math.random() * 9);

        if (result.indexOf(String(n)) !== -1) {
          index -= 1;
          continue;
        } else {
          result += n;
        }
      }

      return result;
    },
    closeResultModal() {
      this.showResult = false;
      return this.$store.dispatch("clearCart");
    },
  },
});
</script>

<style lang="scss">
.cart {
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
  background-color: $color-white;
  border-radius: $border-radius;

  @include breakpoint-xl {
    width: 40%;
  }

  @include breakpoint-md {
    width: 50%;
  }

  &__title {
    margin: 0;
    padding: $grid-gap $grid-gap 0;
    color: $color-gray-thin;
    font-size: $font-size-black;
    font-weight: $font-weight-bold;
    text-align: center;
  }

  &__list {
    @include list-style;
    max-height: calc(100% - 100px);
    padding: $grid-gap $grid-gap 0;
    overflow-y: auto;

    &__item {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-top: calc(#{$grid-gap}/ 2);

      &:first-child {
        margin-top: 0;
      }

      &__cover {
        width: 40px;
        height: 40px;
        margin-right: 0.5rem;
        border-radius: $border-radius-round;
        background-size: cover;
        background-position: center;
        overflow: hidden;
      }

      &__title {
        display: flex;
        align-items: center;
        margin: 0.5rem 0;
      }

      &__counter {
        margin-left: auto;
      }

      &__price {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        width: 100%;
        color: $color-gray;
        font-size: $font-size-light;

        .button {
          margin: 0.5rem 0;
        }

        span {
          margin-left: auto;
        }
      }
    }
  }

  &__price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: auto;
    padding: $grid-gap;

    span {
      &:last-of-type {
        font-size: $font-size-bold;
        font-weight: $font-weight-bold;
      }
    }
  }
}
</style>