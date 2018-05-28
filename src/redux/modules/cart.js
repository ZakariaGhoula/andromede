const INCREMENT = 'redux-example/counter/INCREMENT';
const ADD_TO_CART = 'andromedeetpersee/cart/ADD_TO_CART';
const REMOVE_FROM_CART = 'andromedeetpersee/cart/REMOVE_FROM_CART';
const ADD_TO_CART_WITHOUT_OPEN = 'andromedeetpersee/cart/ADD_TO_CART_WITHOUT_OPEN';
const REMOVE_FROM_CART_WITHOUT_OPEN = 'andromedeetpersee/cart/REMOVE_FROM_CART_WITHOUT_OPEN';
const REMOVE_ITEM_CART = 'andromedeetpersee/cart/REMOVE_ITEM_CART';
const SHOW_CART = 'andromedeetpersee/cart/SHOW_CART';
const HIDE_CART = 'andromedeetpersee/cart/HIDE_CART';
const CLEAR_CART = 'andromedeetpersee/cart/CLEAR_CART';
const initialState = {
  countItem: 0,
  isOpen: false,
  dataItem: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INCREMENT:
      const {count} = state;
      return {
        countItem: count + 1
      };
    case SHOW_CART:
      return {
        ...state,
        isOpen: true
      };
    case HIDE_CART:
      return {
        ...state,
        isOpen: false
      };
    case ADD_TO_CART:
      let counter = 0;
      const {dataItem} = state;
      const newDataItem = Object.assign({}, dataItem);
      if (typeof newDataItem['product_' + action.data.id] !== 'undefined') {
        const oldData = newDataItem['product_' + action.data.id];
        oldData.quantity = oldData.quantity + 1;
        newDataItem['product_' + action.data.id] = oldData;
      } else {
        newDataItem['product_' + action.data.id] = action.data;
      }

      for (const ind in newDataItem) {
        if (newDataItem[ind] && newDataItem[ind].quantity) {
          counter += newDataItem[ind].quantity;
        }
      }

      return {
        ...state,
        dataItem: newDataItem,
        countItem: counter,
        isOpen: true
      };
    case REMOVE_FROM_CART:
      let counter2 = 0;
      const newDataItem2 = Object.assign({}, state.dataItem);
      if (typeof newDataItem2['product_' + action.data.id] !== 'undefined') {
        const oldData = newDataItem2['product_' + action.data.id];
        oldData.quantity = oldData.quantity > 0 ? oldData.quantity - 1 : 0;
        if (oldData.quantity > 0) {
          newDataItem2['product_' + action.data.id] = oldData;
        } else {
          delete newDataItem2['product_' + action.data.id];
        }
      }
      for (const ind in newDataItem2) {
        if (newDataItem2[ind] && newDataItem2[ind].quantity) {
          counter2 += newDataItem2[ind].quantity;
        }
      }
      return {
        ...state,
        dataItem: newDataItem2,
        countItem: counter2,
        isOpen: counter2 > 0 ? true : false
      };
    case REMOVE_ITEM_CART:
      let counter3 = 0;
      const newDataItem3 = Object.assign({}, state.dataItem);
      if (typeof newDataItem3['product_' + action.data.id] !== 'undefined') {
        delete newDataItem3['product_' + action.data.id];
      }
      for (const ind in newDataItem3) {
        if (newDataItem3[ind] && newDataItem3[ind].quantity) {
          counter3 += newDataItem3[ind].quantity;
        }
      }
      return {
        ...state,
        dataItem: newDataItem3,
        countItem: counter3,
      };

    case ADD_TO_CART_WITHOUT_OPEN:
      let counter4 = 0;
      const newDataItem4 = Object.assign({}, state.dataItem);
      if (typeof newDataItem4['product_' + action.data.id] !== 'undefined') {
        const oldData = newDataItem4['product_' + action.data.id];
        oldData.quantity = oldData.quantity + 1;
        newDataItem4['product_' + action.data.id] = oldData;
      } else {
        newDataItem4['product_' + action.data.id] = action.data;
      }

      for (const ind in newDataItem4) {
        if (newDataItem4[ind] && newDataItem4[ind].quantity) {
          counter4 += newDataItem4[ind].quantity;
        }
      }
      return {
        ...state,
        dataItem: newDataItem4,
        countItem: counter4,
      };
    case REMOVE_FROM_CART_WITHOUT_OPEN:
      let counter5 = 0;
      const newDataItem5 = Object.assign({}, state.dataItem);
      if (typeof newDataItem5['product_' + action.data.id] !== 'undefined') {
        const oldData = newDataItem5['product_' + action.data.id];
        oldData.quantity = oldData.quantity > 0 ? oldData.quantity - 1 : 0;
        if (oldData.quantity > 0) {
          newDataItem5['product_' + action.data.id] = oldData;
        } else {
          delete newDataItem5['product_' + action.data.id];
        }
      }
      for (const ind in newDataItem5) {
        if (newDataItem5[ind] && newDataItem5[ind].quantity) {
          counter5 += newDataItem5[ind].quantity;
        }
      }
      return {
        ...state,
        dataItem: newDataItem5,
        countItem: counter5,
        isOpen: false
      };
    case CLEAR_CART:

      return {
        countItem: 0,
        isOpen: false,
        dataItem: {}
      };
    default:
      return state;
  }
}

export function increment() {
  return {
    type: INCREMENT
  };
}

export function showCart() {
  return {
    type: SHOW_CART
  };
}

export function hideCart() {
  return {
    type: HIDE_CART
  };
}

export function addToCart(data) {
  return {
    type: ADD_TO_CART,
    data: data
  };
}

export function removeFromCart(data) {
  return {
    type: REMOVE_FROM_CART,
    data: data
  };
}
export function addToCartWhitoutOpen(data) {
  return {
    type: ADD_TO_CART_WITHOUT_OPEN,
    data: data
  };
}

export function removeFromCartWhitoutOpen(data) {
  return {
    type: REMOVE_FROM_CART_WITHOUT_OPEN,
    data: data
  };
}

export function removeItemFromCart(data) {
  return {
    type: REMOVE_ITEM_CART,
    data: data
  };
}

export function clearCart() {
  return {
    type: CLEAR_CART,
  };
}

