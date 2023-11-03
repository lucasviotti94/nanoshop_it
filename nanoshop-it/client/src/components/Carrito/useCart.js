import { useContext } from "react";
import { CartContext } from "./carritoContexto.jsx";

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("Estas usando el Hook en un lugar incorrecto");
  }

  return context;
};
