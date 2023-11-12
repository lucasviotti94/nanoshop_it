import axios from "axios";

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
} from "./actions_vars";

export function getProductsAll(query, search) {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/productos")
      .then((a) => {
        dispatch({
          type: GET_PRODUCTOS,
          payload: a.data,
        });
      })
      .catch((err) => {});
  };
}

export function getModelosAll(query, search) {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/modelos")
      .then((m) => {
        dispatch({
          type: GET_MODELOS,
          payload: m.data,
        });
      })
      .catch((err) => {});
  };
}

export function getAdaptadoresAll() {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/adaptadores")
      .then((a) => {
        dispatch({
          type: GET_ADAPTADORES_ALL,
          payload: a.data,
        });
      })
      .catch((err) => {});
  };
}

export function getAdaptadorById(id) {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/adaptadores/" + id)
      .then((a) => {
        dispatch({
          type: GET_ADAPTADOR_BY_ID,
          payload: a.data,
        });
      })
      .catch((err) => {});
  };
}

export function getAuricularesAll() {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/auriculares")
      .then((a) => {
        dispatch({
          type: GET_AURICULARES_ALL,
          payload: a.data,
        });
      })
      .catch((err) => {});
  };
}

export function getAuricularById(id) {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/auriculares/" + id)
      .then((a) => {
        dispatch({
          type: GET_AURICULAR_BY_ID,
          payload: a.data,
        });
      })
      .catch((err) => {});
  };
}

export function getCablesAll() {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/cables")
      .then((c) => {
        dispatch({
          type: GET_CABLES_ALL,
          payload: c.data,
        });
      })
      .catch((err) => {});
  };
}

export function getCableById(id) {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/cables/" + id)
      .then((c) => {
        dispatch({
          type: GET_CABLE_BY_ID,
          payload: c.data,
        });
      })
      .catch((err) => {});
  };
}

export function getCargadoresAll() {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/cargadores")
      .then((c) => {
        dispatch({
          type: GET_CARGADORES_ALL,
          payload: c.data,
        });
      })
      .catch((err) => {});
  };
}

export function getCargadorById(id) {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/cargadores/" + id)
      .then((c) => {
        dispatch({
          type: GET_CARGADOR_BY_ID,
          payload: c.data,
        });
      })
      .catch((err) => {});
  };
}

export function getCelularesAll() {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/celulares")
      .then((c) => {
        dispatch({
          type: GET_CELULARES_ALL,
          payload: c.data,
        });
      })
      .catch((err) => {});
  };
}

export function getCelularById(id) {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/celulares/" + id)
      .then((c) => {
        dispatch({
          type: GET_CELULAR_BY_ID,
          payload: c.data,
        });
      })
      .catch((err) => {});
  };
}

export function getComputadorasAll() {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/computadoras")
      .then((c) => {
        dispatch({
          type: GET_COMPUTADORAS_ALL,
          payload: c.data,
        });
      })
      .catch((err) => {});
  };
}

export function getComputadoraById(id) {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/computadoras/" + id)
      .then((c) => {
        dispatch({
          type: GET_COMPUTADORA_BY_ID,
          payload: c.data,
        });
      })
      .catch((err) => {});
  };
}

export function getFuentesAll() {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/fuentes")
      .then((f) => {
        dispatch({
          type: GET_FUENTES_ALL,
          payload: f.data,
        });
      })
      .catch((err) => {});
  };
}

export function getFuenteById(id) {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/fuentes/" + id)
      .then((f) => {
        dispatch({
          type: GET_FUENTE_BY_ID,
          payload: f.data,
        });
      })
      .catch((err) => {});
  };
}

export function getFundasAll() {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/fundas")
      .then((f) => {
        dispatch({
          type: GET_FUNDAS_ALL,
          payload: f.data,
        });
      })
      .catch((err) => {});
  };
}

export function getFundaById(id) {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/fundas/" + id)
      .then((f) => {
        dispatch({
          type: GET_FUNDA_BY_ID,
          payload: f.data,
        });
      })
      .catch((err) => {});
  };
}

export function getMallasAll() {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/mallas")
      .then((m) => {
        dispatch({
          type: GET_MALLAS_ALL,
          payload: m.data,
        });
      })
      .catch((err) => {});
  };
}

export function getMallaById(id) {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/mallas/" + id)
      .then((m) => {
        dispatch({
          type: GET_MALLA_BY_ID,
          payload: m.data,
        });
      })
      .catch((err) => {});
  };
}

export function getRelojesAll() {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/relojes")
      .then((r) => {
        dispatch({
          type: GET_RELOJES_ALL,
          payload: r.data,
        });
      })
      .catch((err) => {});
  };
}

export function getRelojById(id) {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/relojes/" + id)
      .then((r) => {
        dispatch({
          type: GET_RELOJ_BY_ID,
          payload: r.data,
        });
      })
      .catch((err) => {});
  };
}

export function getTabletsAll() {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/tablets")
      .then((t) => {
        dispatch({
          type: GET_TABLETS_ALL,
          payload: t.data,
        });
      })
      .catch((err) => {});
  };
}

export function getTabletById(id) {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/tablets/" + id)
      .then((t) => {
        dispatch({
          type: GET_TABLET_BY_ID,
          payload: t.data,
        });
      })
      .catch((err) => {});
  };
}

export function getVidriosProtectoresAll() {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/vidrios_protectores")
      .then((v) => {
        dispatch({
          type: GET_VIDRIOS_ALL,
          payload: v.data,
        });
      })
      .catch((err) => {});
  };
}

export function getVidrioProtectorById(id) {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/vidrios_protectores/" + id)
      .then((v) => {
        dispatch({
          type: GET_VIDRIO_BY_ID,
          payload: v.data,
        });
      })
      .catch((err) => {});
  };
}

export function getConjuntosAll() {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/conjuntos")
      .then((c) => {
        dispatch({
          type: GET_CONJUNTOS_ALL,
          payload: c.data,
        });
      })
      .catch((err) => {});
  };
}

export function getConjuntoById(id) {
  return function (dispatch) {
    axios
      .get("http://localhost:3000/conjuntos/" + id)
      .then((c) => {
        dispatch({
          type: GET_CONJUNTO_ID,
          payload: c.data,
        });
      })
      .catch((err) => {});
  };
}
