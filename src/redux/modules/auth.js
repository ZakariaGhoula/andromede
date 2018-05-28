const LOAD = 'redux-example/auth/LOAD';
const LOAD_SUCCESS = 'redux-example/auth/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/auth/LOAD_FAIL';
const LOGIN_REQUEST = 'andromedeetpersee/auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'andromedeetpersee/auth/LOGIN_SUCCESS';
const LOGIN_FAILLURE = 'randromedeetpersee/auth/LOGIN_FAILLURE';
const REGISTER_REQUEST = 'andromedeetpersee/auth/REGISTER_REQUEST';
const REGISTER_SUCCESS = 'andromedeetpersee/auth/REGISTER_SUCCESS';
const REGISTER_FAILLURE = 'randromedeetpersee/auth/REGISTER_FAILLURE';
const UPDATE_USER_REQUEST = 'andromedeetpersee/auth/UPDATE_USER_REQUEST';
const UPDATE_USER_SUCCESS = 'andromedeetpersee/auth/UPDATE_USER_SUCCESS';
const UPDATE_USER_FAILLURE = 'andromedeetpersee/auth/UPDATE_USER_FAILLURE';
const RETRIEVE_ORDERS_REQUEST = 'andromedeetpersee/auth/RETRIEVE_ORDERS_REQUEST';
const RETRIEVE_ORDERS_SUCCESS = 'andromedeetpersee/auth/RETRIEVE_ORDERS_SUCCESS';
const RETRIEVE_ORDERS_FAILLURE = 'andromedeetpersee/auth/RETRIEVE_ORDERS_FAILLURE';
const RESET_UPDATE = 'andromedeetpersee/auth/RESET_UPDATE';
const LOGOUT = 'andromedeetpersee/auth/LOGOUT';

const initialState = {
  loaded: false,
  updateIn: false,
  orders_loaded: false,
  updated: false,
  updateError: null,
  orders: null,
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        loginError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: false,
        user: action.result
      };
    case LOGIN_FAILLURE:
      return {
        ...state,
        loggingIn: false,
        user: null,
        loginError: action.error
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        updateIn: true,
        updated: false,
        updateError: null,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateIn: false,
        updated: true,
        user: action.result
      };
    case UPDATE_USER_FAILLURE:
      return {
        ...state,
        updateIn: false,
        updated: false,
        updateError: action.error
      };
    case RESET_UPDATE:
      return {
        ...state,
        updateIn: false,
        updated: false,
        updateError: null
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        registering: true,
        registerError: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registering: false,
        user: action.result
      };
    case REGISTER_FAILLURE:
      return {
        ...state,
        registering: false,
        user: null,
        registerError: action.error
      };
    case RETRIEVE_ORDERS_REQUEST:
      return {
        ...state,
        orders_requesting: true,
        orders_loaded: false,
        ordersError: null,
        orders: null,
      };
    case RETRIEVE_ORDERS_SUCCESS:
      return {
        ...state,
        orders_requesting: false,
        orders_loaded: true,
        orders: action.result
      };
    case RETRIEVE_ORDERS_FAILLURE:
      return {
        ...state,
        orders_requesting: false,
        orders_loaded: false,
        orders: null,
        ordersError: action.error
      };
    case LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadAuth')
  };
}

export function login(data) {
  return {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILLURE],
    promise: (client) => client.post('/v1/auth/login', {data})
  };
}

export function register(data) {
  return {
    types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILLURE],
    promise: (client) => client.post('/v1/auth/register', {data})
  };
}

export function updateDataPerso(data, token) {
  return {
    types: [UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILLURE],
    promise: (client) => client.post('/v1/auth/update-data-perso', {data, token: token})
  };
}export function updateAddr(data, token) {
  return {
    types: [UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILLURE],
    promise: (client) => client.post('/v1/auth/update-address', {data, token: token})
  };
}export function updatePwd(data, token) {
  return {
    types: [UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILLURE],
    promise: (client) => client.post('/v1/auth/update-password', {data, token: token})
  };
}
export function retrieveOrders(token) {
  return {
    types: [RETRIEVE_ORDERS_REQUEST, RETRIEVE_ORDERS_SUCCESS, RETRIEVE_ORDERS_FAILLURE],
    promise: (client) => client.get('/v1/auth/retrieve-list-orders', {token: token})
  };
}

export function resetUpdate() {
  return {
    type: RESET_UPDATE
  };
}
export function logout() {
  return {
    type: LOGOUT
  };
}
