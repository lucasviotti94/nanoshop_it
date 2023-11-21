import ProductosLabels from './funciones';
import { useState } from 'react';

const Formulario = () => {

    const [ producto, setProducto ] = useState("Adaptadores") 

    const handleProducto = (e) => {
        setProducto(e.target.value)
    }

  return (
    <div>
        <label htmlFor='opciones'> Producto : </label>
            <select id="opciones" value={producto} onChange={handleProducto}>
                <option value="">-- Selecciona --</option>
                <option value="Adaptadores">Adaptadores</option>
                <option value="Auriculares">Auriculares</option>
                <option value="Cables">Cables</option>
            </select>
        <ProductosLabels producto={producto} />

    </div>
  );
};

export default Formulario;

