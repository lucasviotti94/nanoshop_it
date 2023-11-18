import React, { useState } from 'react';
import axios from 'axios';

const Formulario = () => {
  const [nuevoObjeto, setNuevoObjeto] = useState({
    marca: '',
    modelo: '',
    ficha: '',
    inalambrico: false,
    precio: '',
    imagenes: [],
  });

  const [arrayDeObjetos, setArrayDeObjetos] = useState([]);

  const handleChange = (event) => {
    const { name, value, type, checked, files  } = event.target;

    // Si el campo es de tipo checkbox, maneja el cambio de manera diferente
    const valor = type === 'checkbox' ? checked : value;

    setNuevoObjeto((prevObjeto) => ({
      ...prevObjeto,
      [name]: name === 'imagenes' ? Array.from(files) : valor,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Agrega el nuevo objeto al array
    setArrayDeObjetos((prevArray) => [...prevArray, nuevoObjeto]);

    try {
        // Realiza la solicitud POST a localhost:3000/auriculares
        const response = await axios.post('http://localhost:3000/auriculares', arrayDeObjetos);
  
        console.log('Respuesta del servidor:', response.data);
  
        // Reinicia el formulario y el array
        setNuevoObjeto({
          marca: '',
          modelo: '',
          ficha: '',
          inalambrico: false,
          precio: '',
          imagenes: [],
        });
  
        setArrayDeObjetos([]);
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Marca:
          <input
            type="text"
            name="marca"
            value={nuevoObjeto.marca}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Modelo:
          <input
            type="text"
            name="modelo"
            value={nuevoObjeto.modelo}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Ficha:
          <input
            type="text"
            name="ficha"
            value={nuevoObjeto.ficha}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Inalámbrico:
          <input
            type="checkbox"
            name="inalambrico"
            checked={nuevoObjeto.inalambrico}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Precio:
          <input
            type="text"
            name="precio"
            value={nuevoObjeto.precio}
            onChange={handleChange}
          />
        </label>
        <br />
        
        <label>
        Imágenes:
          <input
            type="file"
            name="imagenes"
            // accept=".jpg, .jpeg" // Acepta solo archivos jpg o jpeg
            multiple // Permite la selección múltiple de archivos
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">Agregar Objeto</button>
      </form>

      <hr />

      <h2>Array de Objetos:</h2>
      <pre>{JSON.stringify(arrayDeObjetos, null, 2)}</pre>
    </div>
  );
};

export default Formulario;