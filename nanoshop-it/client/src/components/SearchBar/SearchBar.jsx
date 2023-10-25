import { useState } from "react";
import { useDispatch } from "react-redux";

import { 
    getProductsAll, 
    getAdaptadoresAll, 
    getAuricularesAll, 
    getCablesAll, 
    getCargadoresAll, 
    getCelularesAll, 
    getComputadorasAll, 
    getFuentesAll, 
    getFundasAll, 
    getMallasAll, 
    getRelojesAll,
    getTabletsAll,
    getVidriosProtectoresAll
} from '../../redux/actions/actions'

export default function SearchBar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    e.preventDefault()
    let inputBusqueda = e.target.value
    setInput(inputBusqueda.toUpperCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    switch (dispatch) {
        case input === "":
            dispatch(getProductsAll)
            break;
        case input === "ADAPTADORES":
            dispatch(getAdaptadoresAll)
            break;
        case input === "AURICULARES":
            dispatch(getAuricularesAll)
            break;
        case input === "CABLES":
            dispatch(getCablesAll)
            break;
        case input === "CARGADORES":
            dispatch(getCargadoresAll)
            break;
        case input === "CELULARES":
            dispatch(getCelularesAll)
            break;
        case input === "COMPUTADORAS":
            dispatch(getComputadorasAll)
            break;
        case input === "FUENTES":
            dispatch(getFuentesAll)
            break;
        case input === "FUNDAS":
            dispatch(getFundasAll)
            break;
        case input === "MALLAS":
            dispatch(getMallasAll)
            break;
        case input === "RELOJES":
            dispatch(getRelojesAll)
            break;
        case input === "TABLETS":
            dispatch(getTabletsAll)
            break;
        case input === "VIDRIOS":
            dispatch(getVidriosProtectoresAll)
            break;
                                                                                                                                                                                                                                
        default:
            break;
    }
  };

  console.log()
  return (

        <form onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={handleOnChange}
            />
            <button variant="outline-success">Search</button>
        </form>
 
    
  );
}
