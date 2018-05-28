const GET_PRODUCT_BY_URL_REQUEST = 'andromedeetpersee/product/GET_PRODUCT_BY_URL_REQUEST';
const GET_PRODUCT_BY_URL_SUCCESS = 'andromedeetpersee/product/GET_PRODUCT_BY_URL_SUCCESS';
const GET_PRODUCT_BY_URL_FAILLURE = 'andromedeetpersee/product/GET_PRODUCT_BY_URL_FAILLURE';


const GET_HOME_PAGE_REQUEST = 'andromedeetpersee/product/GET_HOME_PAGE_REQUEST';
const GET_HOME_PAGE_SUCCESS = 'andromedeetpersee/product/GET_HOME_PAGE_SUCCESS';
const GET_HOME_PAGE_FAILLURE = 'andromedeetpersee/product/GET_HOME_PAGE_FAILLURE';

const GET_COLLECTION_BY_ID_REQUEST = 'andromedeetpersee/product/GET_COLLECTION_BY_ID_REQUEST';
const GET_COLLECTION_BY_ID_SUCCESS = 'andromedeetpersee/product/GET_COLLECTION_BY_ID_SUCCESS';
const GET_COLLECTION_BY_ID_FAILLURE = 'andromedeetpersee/product/GET_COLLECTION_BY_ID_FAILLURE';

const initialState = {
  loading: false,
  loaded: false,
  product: {},
  loadingHome: false,
  loadedHome: false,
  contentHome: {},
  loadingShop: false,
  loadedShop: false,
  shop: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_PRODUCT_BY_URL_REQUEST:
      return {
        loading: true,
        loaded: false
      };
    case GET_PRODUCT_BY_URL_SUCCESS:
      return {
        loading: false,
        loaded: true,
        product: action.result
      };
    case GET_PRODUCT_BY_URL_FAILLURE:
      return {
        loading: false,
        loaded: false,
        product: {}
      };
    case GET_HOME_PAGE_REQUEST:
      return {
        loadingHome: true,
        loadedHome: false
      };
    case GET_HOME_PAGE_SUCCESS:
      return {
        loadingHome: false,
        loadedHome: true,
        contentHome: action.result
      };
    case GET_HOME_PAGE_FAILLURE:
      return {
        loadingHome: false,
        loadedHome: false,
        contentHome: {}
      };
    case GET_COLLECTION_BY_ID_REQUEST:
      return {
        loadingShop: true,
        loadedShop: false
      };
    case GET_COLLECTION_BY_ID_SUCCESS:
      return {
        loadingShop: false,
        loadedShop: true,
        shop: action.result
      };
    case GET_COLLECTION_BY_ID_FAILLURE:
      return {
        loadingShop: false,
        loadedShop: false,
        shop: {}
      };
    default:
      return state;
  }
}

export function loadProduct(locale, url) {
  return {
    types: [GET_PRODUCT_BY_URL_REQUEST, GET_PRODUCT_BY_URL_SUCCESS, GET_PRODUCT_BY_URL_FAILLURE],
    promise: (client) => client.get('/v1/product/' + locale + '/' + url)
  };
}

export function loadHome(locale) {
  return {
    types: [GET_HOME_PAGE_REQUEST, GET_HOME_PAGE_SUCCESS, GET_HOME_PAGE_FAILLURE],
    promise: (client) => client.get('/v1/home/' + locale)
  };
}

export function loadCollection(locale, idCollection) {
  return {
    types: [GET_COLLECTION_BY_ID_REQUEST, GET_COLLECTION_BY_ID_SUCCESS, GET_COLLECTION_BY_ID_FAILLURE],
    promise: (client) => client.get('/v1/shop/' + locale + '/' + idCollection)
  };
}

