import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

const ProductosLabels = (prop) => {
    const [conjunto, setConjunto] = useState("Individual")
    const [localArray, setLocalArray] = useState([]); 
    const [objeto, setObjeto] = useState({
      marca: '',
      modelo: '',
      tipo: '',
      estado: '',
      precio: '',
      conjunto: ''
    })
    const [imagenes, setImagenes] = useState([]);
    const [cantidad, setCantidad] = useState(1);
    const [response, setResponse] = useState('');
    const [idBundle, setIdBundle ] = useState(null)

    const handleChange = (e) => {         //Con esta funcion rellenamos los datos del objeto del estado, usando la prop name de el evento 
      setObjeto(prev =>({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    };
    
    const handleConjunto = (e) => {
        setConjunto(e.target.value)
        setObjeto(prev => ({
          ...prev,
          [e.target.name]: e.target.value
        }))
        console.log('objeto despues de updatearlo',objeto)
        // clearForm()
        setLocalArray([])
        setResponse('')
    }

    const handleAddToObject = () => {                                            // con esta funcion creo el array que contendra los objetos a partir del formulario y de el estado Cantidad
      if (conjunto === 'Individual') {
        const nuevosObjetos = Array.from({ length: cantidad }, () => ({
          marca: objeto.marca,
          modelo: objeto.modelo,
          tipo: objeto.tipo,
          estado: objeto.estado,
          precio: objeto.precio,
          conjunto: objeto.conjunto,
          imagenes: imagenes.map((imagen) => (imagen || null)),
        }));
        setLocalArray((prevArray) => [...prevArray, ...nuevosObjetos]);         //Guardo el objeto nuevo  en el array que usare para hacer la peticion
        clearForm();
      } else {
        const nuevosObjetos = Array.from({ length: cantidad }, () => ({
          marca: objeto.marca,
          modelo: objeto.modelo,
          tipo: objeto.tipo,
          estado: objeto.estado,
          precio: objeto.precio,
          conjunto: objeto.conjunto,
          imagenes: imagenes.map((imagen) => (imagen || null)),
          idBundle,
        }));
        setLocalArray((prevArray) => [...prevArray, ...nuevosObjetos]);
        clearForm();
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (conjunto === "Individual") {
        try {
            
            localArray.forEach(async (obj, index) => {
                const formData = new FormData();
                // Aquí asumimos que la propiedad imagenes es un array de File
                obj.imagenes.forEach((imagen, i) => {
                  formData.append('imagenes', imagen);
                });          
                formData.append('marca', obj.marca);
                formData.append('modelo', obj.modelo);
                formData.append('tipo', obj.tipo);
                formData.append('estado', obj.estado);
                formData.append('precio', obj.precio);
                formData.append('conjunto', obj.conjunto);
                
                const response = await axios.post('http://localhost:3000/adaptadores', formData , {
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
        console.log(localArray)
        localArray.forEach(async (obj, index) => {

            const formData = new FormData();
            obj.imagenes.forEach((imagen, i) => {
              formData.append('imagenes', imagen);
            });          
            formData.append('marca', obj.marca);
            formData.append('modelo', obj.modelo);
            formData.append('tipo', obj.tipo);
            formData.append('estado', obj.estado);
            formData.append('precio', obj.precio);
            formData.append('conjunto', obj.conjunto);
            formData.append('idConjunto', idBundle);

            const response = await axios.post('http://localhost:3000/adaptadores', formData , {
                headers: {
                    'Content-Type': 'application/form-data',
                },
            })

        })
      } else {
        
      }
      
    };
    
    const handleImagenChange = (e, index) => {        //Esta funcion agrega la imagen a el array imagenes para despues usarlo en la peticion
        const newImagenes = [...imagenes];
        if (index < newImagenes.length && e.target.files.length > 0) {
          newImagenes[index] = e.target.files[0];
          setImagenes(newImagenes);
        }
      };
    
    const handleAddImagen = () => {                 //Agrego el Slot para subir una imagen
    setImagenes([...imagenes, Array.from({ length: cantidad }, () => null)]);   
    };

    const clearForm = () => {
        setObjeto({
          marca: '',
          modelo: '',
          tipo: '',
          estado: '',
          precio: '',
          conjunto: ''
        });
        setImagenes([]);
    };

    const handleCreateBundle = async () => {        // Creo una instancia del modelo Conjunto de la DB y me traigo el UUID

      const datosProducto = {
        producto: 'Adaptador',
        marca: objeto.marca,
        modelo: objeto.modelo,
        cantidad: cantidad,
        estado: objeto.estado,
        precio: objeto.precio,
      }      
      const responseServer = await axios.post('http://localhost:3000/conjuntos', datosProducto ,{
        headers: {
            'Content-Type': 'application/json',
        },
      })
      console.log(responseServer)
      setIdBundle(responseServer.data.conjuntoNuevo.id)
      typeof responseServer === 'object' && setResponse(responseServer)
    }

    if (prop.producto === 'Adaptadores') {
        return (
            <div>
                <form onSubmit={handleSubmit} style={{display: 'flex',flexDirection: 'column', width: '800px', height: 'fit-content', marginBottom: '20px', transition: '1s ease'}}>
                  <div id='Modo' style={{display: 'flex', flexDirection: 'row', backgroundColor: 'white', width: '290px', boxShadow: '4px 4px 1px 1px black', height: '40px', borderRadius: '8px', marginTop: '20px'}}>
                    <label htmlFor='opciones' style={{marginLeft: '10px', marginTop: '8px', marginRight: '90px'}}> Modo: </label>
                    <select id="opciones" name='conjunto' onChange={(e) => handleConjunto(e)} style={{border: 'none'}}>
                        <option value="">-- Selecciona --</option>
                        <option value="Individual">Individual</option>
                        <option value="Conjunto">Conjunto</option>
                    </select>                  
                  </div>
                  <div style={{display: 'flex', flexDirection: 'row', backgroundColor: 'white', width: '290px', boxShadow: '4px 4px 1px 1px black', height: '40px', borderRadius: '8px', marginTop: '10px'}}>
                    <label style={{marginRight: '76px', marginTop: '8px', marginLeft: '10px'}} htmlFor='estado'> Estado: </label>
                      <select id="estado" name="estado"  onChange={(e) => handleChange(e)} style={{ border: 'none'}}>
                          <option value="">-- Selecciona --</option>
                          <option value="Nuevo">Nuevo</option>
                          <option value="Usado">Usado</option>
                      </select>
                    <br />
                  </div>
                  <div style={{backgroundColor: 'white', width: '290px', boxShadow: '4px 4px 1px 1px black', height: '40px', marginTop: '10px', borderRadius: '8px'}}>
                    <label style={{marginRight: '60px', marginTop: '10px', marginLeft: '10px'}}>
                      Cantidad:
                    </label>
                    <input type="number" onChange={(e) => setCantidad(e.target.value)} style={{ width: '140px', border: 'none'}}/>
                    <br />
                  </div>
                  <div id='Marca' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 1px 1px black', height: '40px', marginTop: '10px', borderRadius: '8px'}}>
                    <label 
                      style={{marginRight: '79px', marginTop: '10px', marginLeft: '10px'}}
                    > Marca:
                    </label>
                    <input name='marca' id='Marca' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none'}}/>
                    <br />
                  </div>
                  <div style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 1px 1px black', height: '40px', marginTop: '10px', borderRadius: '8px'}}>
                    <label 
                      style={{marginRight: '70px', marginTop: '10px', marginLeft: '10px'}}
                    > Modelo:
                    </label>
                    <input name='modelo' id='Modelo' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none'}}/>
                    <br />
                  </div>
                  <div style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 1px 1px black', height: '40px', marginTop: '10px', borderRadius: '8px'}}>
                    <label 
                      style={{marginRight: '92px', marginTop: '10px', marginLeft: '10px'}}
                    > Tipo:
                    </label>
                    <input name='tipo' id='Tipo' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none'}}/>
                    <br />
                  </div>

                  <div style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 1px 1px black', height: '40px', marginTop: '10px', borderRadius: '8px'}}>
                    <label style={{marginRight: '78px', marginTop: '10px', marginLeft: '10px'}}>
                      Precio:
                    </label>
                      <input name='precio' id='Precio' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none'}}/>
                    <br />
                  </div>

          
                  {
                  imagenes.map((imagenArr, index) => (
                    <div key={index} style={{display: 'flex', flexDirection: 'row',backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 1px 1px black', height: '60px', marginTop: '10px', borderRadius: '8px'}}>
                      <label style={{marginTop: '17px', marginLeft: '10px', marginRight: '40px',}}>
                        Imagen {index +1} :
                      </label>
                      <input style={{marginTop: '14px'}} type="file" onChange={(e) => handleImagenChange(e, index)}/>
                      <br />
                    </div>
                  ))
                  }
                  <div style={{display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center'}}>
                    <Button variant="outlined" type="button" onClick={handleAddImagen} style={{marginTop: '50px', width: '200px', backgroundColor: 'white', color: 'black', border: 'none', boxShadow: '3px 3px 1px 1px black' }}>
                      Agregar Imagen
                    </Button>
                    {
                      conjunto === 'Conjunto' && 
                        <>
                          <Button variant="outlined" 
                            onClick={handleCreateBundle}
                            style={{
                              display: objeto.marca === '' ? 'none' :  (objeto.modelo === '' ? 'none' : (objeto.tipo === '' ? 'none' : (objeto.estado === '' ? 'none' : (objeto.precio === '' ? 'none' : (imagenes.length === 0 ? 'none' : ''))))) && 'none',
                              width: '200px', backgroundColor: 'white', color: 'black', border: 'none', boxShadow: '3px 3px 1px 1px black'
                            }}
                          >Crear conjunto</Button>
                          {
                            typeof response === 'object' &&  <div> Conjunto creado capaso!! </div>
                            
                          }
                        </>                  
                    }
              
                    <Button variant="outlined" type="button" onClick={handleAddToObject} style={{width: '200px', backgroundColor: 'white', color: 'black', border: 'none', boxShadow: '3px 3px 1px 1px black'}}> Armar producto </Button>
                    <Button variant="outlined" type="submit" onClick={clearForm} style={{marginBottom: '20px', width: '100px', backgroundColor: 'white', color: 'black', border: 'none', boxShadow: '3px 3px 1px 1px black'}}>Enviar</Button>
                  </div>
          

                {/* <hr /> */}

                {/* <h3>Array de Objetos:</h3> */}
                <pre>{JSON.stringify(localArray, null, 2)}</pre>
                {/* <pre>{JSON.stringify(localArray, null, 2)}</pre> */}
              </form>
            </div>
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

