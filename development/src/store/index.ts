import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: [] as {
      id: string;
      kind: string;
      title: string;
      pic: string;
      price: number;
      qty: number
    }[],
    active: 'ch',
    foods: [
      {
        id: '1',
        kind: 'ch',
        title: '中餐 A',
        pic: require('@/assets/images/andres-rodriguez-3jJtXTwLZw4-unsplash.jpg'),
        price: 390
      },
      {
        id: '2',
        kind: 'ch',
        title: '中餐 B',
        pic: require('@/assets/images/drew-taylor-jFu2L04tMBc-unsplash.jpg'),
        price: 590
      },
      {
        id: '3',
        kind: 'ch',
        title: '中餐 C',
        pic: require('@/assets/images/sj-Jinnqw9bHjI-unsplash.jpg'),
        price: 290
      },
      {
        id: '4',
        kind: 'ws',
        title: '西餐 A',
        pic: require('@/assets/images/anna-volkova-LeU-Tdabc5E-unsplash.jpg'),
        price: 590
      },
      {
        id: '5',
        kind: 'ws',
        title: '西餐 B',
        pic: require('@/assets/images/caroline-attwood-bpPTlXWTOvg-unsplash.jpg'),
        price: 690
      },
      {
        id: '6',
        kind: 'ws',
        title: '西餐 C',
        pic: require('@/assets/images/sam-moqadam-PcI8L5CG5XA-unsplash.jpg'),
        price: 490
      }
    ] as {
      id: string;
      kind: string;
      title: string;
      pic: string;
      price: number;
    }[]
  },
  getters: {
    foodsKind: state => {
      return state.foods.map(item => { return item.kind }).filter((item, index, array) => {
        return array.indexOf(item, 0) === index;
      });
    },
    sortedCartList: state => {
      return state.cart.sort(
        (
          a: {
            id: string;
          },
          b: {
            id: string;
          }
        ) => {
          return Number(a.id) - Number(b.id);
        }
      );
    }
  },
  mutations: {
    changeActive(state, keyword: string) {
      state.active = keyword;
    },
    addToCart(state, data: {
      id: string;
      kind: string;
      title: string;
      pic: string;
      price: number;
      qty: number
    }) {
      const checkExist: number = state.cart.findIndex(item => item.id === data.id);
      if (checkExist === -1) {
        state.cart.push(data);
      }
    },
    updateCart(state, data: {
      id: string;
      kind: string;
      title: string;
      pic: string;
      price: number;
      qty: number;
    }) {
      const item: {
        id: string;
        kind: string;
        title: string;
        pic: string;
        price: number;
        qty: number;
      } | undefined = state.cart.find(item => item.id === data.id);
      if (item !== undefined) {
        Object.assign(item, data);
      } else {
        return;
      }
    },
    removeItemFormCart(state, id: string) {
      const item: number = state.cart.findIndex(item => item.id === id);
      state.cart.splice(item, 1);
    },
    clearCart(state) {
      state.cart.length = 0;
    }
  },
  actions: {
    changeActive({ commit }, keyword: string) {
      commit('changeActive', keyword);
    },
    addToCart({ commit }, data: {
      id: string;
      kind: string;
      title: string;
      pic: string;
      price: number;
      qty: number;
    }) {
      commit('addToCart', data);
    },
    updateCart({ commit }, data: {
      id: string;
      kind: string;
      title: string;
      pic: string;
      price: number;
      qty: number;
    }) {
      commit('updateCart', data);
    },
    removeItemFormCart({ commit }, id: {
      id: string
    }) {
      commit('removeItemFormCart', id);
    },
    clearCart({ commit }) {
      commit('clearCart');
    },
  }
})
