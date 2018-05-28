const CHECKOUT_REQUEST = 'andromedeetpersee/checkout/CHECKOUT_REQUEST';
const CHECKOUT_SUCCESS = 'andromedeetpersee/product/CHECKOUT_SUCCESS';
const CHECKOUT_FAILLURE = 'andromedeetpersee/product/CHECKOUT_FAILLURE';
const CLEAR_CHECKOUT = 'andromedeetpersee/product/CLEAR_CHECKOUT';
const initialState = {
  checkouting: false,
  checkouted: false,
  dataCheckout: null,
  errorCheckout: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHECKOUT_REQUEST:
      return {
        ...state,
        errorCheckout: null,
        dataCheckout: null,
        checkouting: true,
        checkouted: false
      };
    case CHECKOUT_SUCCESS:
      return {
        ...state,
        dataCheckout: action.result,
        errorCheckout: null,
        checkouting: false,
        checkouted: true
      };
    case CHECKOUT_FAILLURE:
      return {
        ...state,
        errorCheckout: action.error,
        dataCheckout: null,
        checkouting: false,
        checkouted: false
      };

    case CLEAR_CHECKOUT:
      return {
        checkouting: false,
        checkouted: false,
        dataCheckout: null,
        errorCheckout: null,
      };
    default:
      return state;
  }
}

export function placeorder(data, token) {
  return {
    types: [CHECKOUT_REQUEST, CHECKOUT_SUCCESS, CHECKOUT_FAILLURE],
    promise: (client) => client.post('/v1/checkout/placeorder', {data, token: token})
  };
}


export function clearCheckout() {
  return {
    type: CLEAR_CHECKOUT,
  };
}
