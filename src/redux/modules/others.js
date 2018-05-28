const LOAD_DATA_COUNTRIES_REQUEST = 'andromedeetpersee/others/LOAD_DATA_COUNTRIES_REQUEST';
const LOAD_DATA_COUNTRIES_SUCCESS = 'andromedeetpersee/others/LOAD_DATA_COUNTRIES_SUCCESS';
const LOAD_DATA_COUNTRIES_FAILLURE = 'andromedeetpersee/others/LOAD_DATA_COUNTRIES_FAILLURE';

const initialState = {
  loadedCountry: false,
  loadingCountry: false,
  dataCountries: {}
};

export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_DATA_COUNTRIES_REQUEST:
      return {
        ...state,
        loadedCountry: false,
        loadingCountry: true,
      };
    case LOAD_DATA_COUNTRIES_SUCCESS:
      return {
        ...state,
        loadingCountry: false,
        loadedCountry: true,
        dataCountries: action.result
      };
    case LOAD_DATA_COUNTRIES_FAILLURE:
      return {
        ...state,
        loadingCountry: false,
        loadedCountry: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function loadCountries(locale) {
  return {
    types: [LOAD_DATA_COUNTRIES_REQUEST, LOAD_DATA_COUNTRIES_SUCCESS, LOAD_DATA_COUNTRIES_FAILLURE],
    promise: (client) => client.get('/v1/others/countries/' + locale)
  };
}
