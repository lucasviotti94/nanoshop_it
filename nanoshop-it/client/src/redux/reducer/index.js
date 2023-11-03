import {
  GET_PRODUCTOS,
  GET_ADAPTADORES_ALL,
  GET_ADAPTADOR_BY_ID,
  GET_AURICULARES_ALL,
  GET_AURICULAR_BY_ID,
  GET_CABLES_ALL,
  GET_CABLE_BY_ID,
  GET_CARGADORES_ALL,
  GET_CARGADOR_BY_ID,
  GET_CELULARES_ALL,
  GET_CELULAR_BY_ID,
  GET_COMPUTADORAS_ALL,
  GET_COMPUTADORA_BY_ID,
  GET_FUENTES_ALL,
  GET_FUENTE_BY_ID,
  GET_FUNDAS_ALL,
  GET_FUNDA_BY_ID,
  GET_MALLAS_ALL,
  GET_MALLA_BY_ID,
  GET_MODELOS,
  GET_RELOJES_ALL,
  GET_RELOJ_BY_ID,
  GET_TABLETS_ALL,
  GET_TABLET_BY_ID,
  GET_VIDRIOS_ALL,
  GET_VIDRIO_BY_ID,
  GET_CONJUNTOS_ALL,
  GET_CONJUNTO_ID,
} from "../actions/actions_vars";

const initialState = {
  productos: [],
  adaptadores: [],
  auriculares: [],
  cables: [],
  cargadores: [],
  celulares: [],
  computadoras: [],
  fuentes: {},
  fundas: [],
  mallas: [],
  relojes: [],
  tablets: [],
  vidrios: [],
  modelos: [],
  conjuntos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTOS:
      return {
        ...state,
        productos: action.payload,
      };
    case GET_ADAPTADORES_ALL:
      return {
        ...state,
        adaptadores: action.payload,
      };
    case GET_ADAPTADOR_BY_ID:
      return {
        ...state,
        adaptadores: action.payload,
      };
    case GET_AURICULARES_ALL:
      return {
        ...state,
        auriculares: action.payload,
      };
    case GET_AURICULAR_BY_ID:
      return {
        ...state,
        auriculares: action.payload,
      };
    case GET_CABLES_ALL:
      return {
        ...state,
        cables: action.payload,
      };
    case GET_CABLE_BY_ID:
      return {
        ...state,
        cables: action.payload,
      };
    case GET_CARGADORES_ALL:
      return {
        ...state,
        cargadores: action.payload,
      };
    case GET_CARGADOR_BY_ID:
      return {
        ...state,
        cargadores: action.payload,
      };
    case GET_CELULARES_ALL:
      return {
        ...state,
        celulares: action.payload,
      };
    case GET_CELULAR_BY_ID:
      return {
        ...state,
        celulares: action.payload,
      };
    case GET_COMPUTADORAS_ALL:
      return {
        ...state,
        computadoras: action.payload,
      };
    case GET_COMPUTADORA_BY_ID:
      return {
        ...state,
        computadoras: action.payload,
      };
    case GET_FUENTES_ALL:
      return {
        ...state,
        fuentes: action.payload,
      };
    case GET_FUENTE_BY_ID:
      return {
        ...state,
        fuentes: action.payload,
      };
    case GET_FUNDAS_ALL:
      return {
        ...state,
        fundas: action.payload,
      };
    case GET_FUNDA_BY_ID:
      return {
        ...state,
        fundas: action.payload,
      };
    case GET_MALLAS_ALL:
      return {
        ...state,
        mallas: action.payload,
      };
    case GET_MALLA_BY_ID:
      return {
        ...state,
        mallas: action.payload,
      };
    case GET_MODELOS:
      return {
        ...state,
        modelos: action.payload,
      };
    case GET_RELOJES_ALL:
      return {
        ...state,
        relojes: action.payload,
      };
    case GET_RELOJ_BY_ID:
      return {
        ...state,
        relojes: action.payload,
      };
    case GET_TABLETS_ALL:
      return {
        ...state,
        tablets: action.payload,
      };
    case GET_TABLET_BY_ID:
      return {
        ...state,
        tablets: action.payload,
      };
    case GET_VIDRIOS_ALL:
      return {
        ...state,
        vidrios: action.payload,
      };
    case GET_VIDRIO_BY_ID:
      return {
        ...state,
        vidrios: action.payload,
      };
    case GET_CONJUNTOS_ALL:
      return {
        ...state,
        conjuntos: action.payload,
      };
    case GET_CONJUNTO_ID:
      return {
        ...state,
        conjuntos: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
