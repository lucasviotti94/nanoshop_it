import { useState } from 'react';
import axios from 'axios';


const ProductosLabels = (prop) => {
    const [ conjunto, setConjunto ] = useState("Individual") 

    const [localArray, setLocalArray] = useState([]); 
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ficha, setFicha] = useState('');
    const [inalambrico, setInalambrico] = useState(false);
    const [precio, setPrecio] = useState('');
    const [imagenes, setImagenes] = useState([]);
    const [cantidad, setCantidad] = useState(1);
  
    
    const handleConjunto = (e) => {
        setConjunto(e.target.value)
    }

    const handleAddToObject = () => {
        const nuevosObjetos = Array.from({ length: cantidad }, () => ({
          marca,
          modelo,
          ficha,
          inalambrico,
          precio,
          imagenes: imagenes.map((imagen) => (imagen || null)),
        }));
      
        setLocalArray((prevArray) => [...prevArray, ...nuevosObjetos]);
        clearForm();
      };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('estado actual array::', localArray)
      console.log('estado actual imagenes::', localArray[0].imagenes)

      if (conjunto === "Individual") {
        try {
            // Enviar la solicitud POST al servidor
            localArray.forEach(async (obj, index) => {
                const formData = new FormData();
                // Aquí asumimos que la propiedad imagenes es un array de File
                obj.imagenes.forEach((imagen, i) => {
                  formData.append('imagenes', imagen);
                });          
                // Añade otras propiedades del objeto si las hay
                formData.append('marca', obj.marca);
                formData.append('modelo', obj.modelo);
                formData.append('ficha', obj.ficha);
                formData.append('inalambrico', obj.inalambrico);
                formData.append('precio', obj.precio);
                formData.append('conjunto', conjunto);
                
                // Realiza la solicitud con FormData
                const response = await axios.post('http://localhost:3000/adaptadores', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Respuesta del servidor:', response.data);
            });
      
          } catch (error) {
            console.error('Error en la solicitud:', error);
          }
      } else if (conjunto === "Conjunto"){

        localArray.forEach(async (obj, index) => {
            const formData = new FormData();
            // Aquí asumimos que la propiedad imagenes es un array de File
            obj.imagenes.forEach((imagen, i) => {
              formData.append('imagenes', imagen);
            });          
            // Añade otras propiedades del objeto si las hay
            formData.append('marca', obj.marca);
            formData.append('modelo', obj.modelo);
            formData.append('ficha', obj.ficha);
            formData.append('inalambrico', obj.inalambrico);
            formData.append('precio', obj.precio);
            formData.append('conjunto', obj.conjunto);
        
            const response = await axios.post('http://localhost:3000/adaptadores', localArray[0] && localArray[0], {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        })
      } else {
        console.log('NADA')
      }
      
    };
    
    const handleImagenChange = (e, index) => {
        const newImagenes = [...imagenes];
      
        if (index < newImagenes.length && e.target.files.length > 0) {
          newImagenes[index] = e.target.files[0];
          setImagenes(newImagenes);
        }
      };
    
    const handleAddImagen = () => {
    setImagenes([...imagenes, Array.from({ length: cantidad }, () => null)]);
    setCantidad(cantidad + 1);
    };

    const clearForm = () => {
        setMarca('');
        setModelo('');
        setFicha('');
        setInalambrico(false);
        setPrecio('');
        setImagenes([]);
    };

    if (prop.producto === 'Adaptadores') {
        return (
            
            <form onSubmit={handleSubmit}>
            <label htmlFor='opciones'> Crear: </label>
            <select id="opciones" value={conjunto} onChange={handleConjunto}>
                <option value="">-- Selecciona --</option>
                <option value="Individual">Individual</option>
                <option value="Conjunto">Conjunto</option>
            </select>
            <label>
              Marca:
              <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} />
            </label>
            <br />
      
            <label>
              Modelo:
              <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} />
            </label>
            <br />
      
            <label>
              Ficha:
              <input type="text" value={ficha} onChange={(e) => setFicha(e.target.value)} />
            </label>
            <br />
      
            <label>
              Inalámbrico:
              <input type="checkbox" checked={inalambrico} onChange={(e) => setInalambrico(e.target.checked)} />
            </label>
            <br />
      
            <label>
              Precio:
              <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
            </label>
            <br />
      
            {imagenes.map((imagenArr, index) => (
              <div key={index}>
                <label>
                  Imagen:
                  <input type="file" onChange={(e) => handleImagenChange(e, index)} />
                </label>
                <br />
              </div>
            ))}
      
            <label>
              Cantidad de adaptadores:
              <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
            </label>
            <br />
      
            <button type="button" onClick={handleAddImagen}>
              Agregar Imagen
            </button>
      
            <button type="submit">Enviar</button>
            <button type="button" onClick={handleAddToObject}>Agregar Objeto</button>

            <hr />
            <h3>Array de Objetos:</h3>
            <pre>{JSON.stringify(conjunto, null, 2)}</pre>
            <pre>{JSON.stringify(localArray, null, 2)}</pre>
          </form>
        )    

    } else if (prop.producto === 'Auriculares') {
        return (
            <>
            <label> NO TIENE NADA PERO ANDA :D</label>
            </>
        )
    } else {
        return (
            <>
                <label> TODAVIA NO ELEGIO NADA</label>
            </>
        )
    }

}

export default ProductosLabels;
