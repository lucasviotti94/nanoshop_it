import { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';

const Formularios = (prop) => {
  
  const estadoInicial = {
    Adaptadores: {
      marca: null,
      modelo: null,
      tipo: null,
      estado: null,
      precio: null,
      conjunto: null,
      informacion: null,
      imagenes: [],
    },
    Auriculares: {
      marca: null,
      modelo: null,
      ficha: null,
      inalambrico: null,
      color: null,
      estado: null,
      precio: null,
      conjunto: null,
      informacion: null,
      imagenes: null,
    },
    Cables: {
      marca: null,
      modelo: null,
      ficha: null,
      largo: null,
      color: null,
      estado: null,
      precio: null,
      conjunto: null,
      informacion: null,
      imagenes: null,
    },
    Cargadores: {
      marca: null,
      modelo: null,
      inalambrico: null,
      deAuto: null,
      estado: null,
      precio: null,
      conjunto: null,
      informacion: null,
      imagenes: null,
    },
    Celulares: {
      marca: null,
      modelo: null,
      almacenamiento: null,
      color: null,
      estado: null,
      bateria: null,
      precio: null,
      conjunto: null,
      informacion: null,
      imagenes: null,
    },
    Computadoras: {
      marca: null,
      modelo: null,
      memoria: null,
      almacenamiento: null,
      pantalla: null,
      color: null,
      chip: null,
      estado: null,
      precio: null,
      informacion: null,
      imagenes: null,
      conjunto: null,
    },
    Fuentes: {
      marca: null,
      modelo: null,
      tipo: null,
      precio: null,
      informacion: null,
      imagenes: null,
      conjunto: null,
    },
    Fundas: {
      marca: null,
      modelo: null,
      tipo: null,
      color: null,
      precio: null,
      informacion: null,
      imagenes: null,
      conjunto: null,
    },
    Mallas: {
      marca: null,
      modelo: null,
      color: null,
      precio: null,
      informacion: null,
      imagenes: null,
      conjunto: null,
    },
    Relojes: {
      marca: null,
      modelo: null,
      color: null,
      precio: null,
      estado: null,
      informacion: null,
      imagenes: null,
      conjunto: null,
    },
    Tablets: {
      marca: null,
      modelo: null,
      almacenamiento: null,
      color: null,
      pantalla: null,
      precio: null,
      estado: null,
      informacion: null,
      imagenes: null,
      conjunto: null,
    },
    Vidrios_Protectores: {
      marca: null,
      modelo: null,
      precio: null,
      informacion: null,
      imagenes: null,
      conjunto: null,
    },
  }
  const [objeto, setObjeto] = useState(estadoInicial)
  const [localArray, setLocalArray] = useState([]); 
  const [idResponse, setIdResponse] = useState(''); 
  const [conjunto, setConjunto] = useState("Individual")
  const [imagenesModelo, setImagenesModelo] = useState([]);
  const [cantidad, setCantidad] = useState(1);

  
  const handleChange = (e) => {         //Con esta funcion rellenamos los datos del objeto del estado, usando la prop name de el evento 
    setObjeto(prev =>({
      ...prev,
      [prop.producto]: {
        ...prev[prop.producto],
        [e.target.name]: e.target.value,
      }
    }));
  };

  const handleConjunto = (e) => {
      setConjunto(e.target.value)
      setObjeto(prev => ({
        ...prev,
        [prop.producto]: {
          ...prev[prop.producto],
          [e.target.name]: e.target.value,
      }}))
      setLocalArray([])
  }

  const handleAddToObject = async () => {                                            // con esta funcion creo el array que contendra los objetos a partir del formulario y de el estado Cantidad
    if (conjunto === 'Individual') {
      const objetosIndividuales = []
      for (let i = 0; i < cantidad; i++) {
        var nuevoObjeto = {
          marca: objeto[prop.producto].marca,
          modelo: objeto[prop.producto].modelo,
          estado: objeto[prop.producto].estado,
          precio: objeto[prop.producto].precio,
          conjunto: objeto[prop.producto].conjunto,
          informacion: objeto[prop.producto].informacion,
          imagenes: objeto[prop.producto].imagenes.length > 0 && objeto[prop.producto].imagenes.map((imagen) => (imagen || null)),
        }
        if (prop.producto === 'Adaptadores') {
          nuevoObjeto.tipo = objeto[prop.producto].tipo;
        } else if (prop.producto === 'Auriculares') {
          nuevoObjeto.ficha = objeto[prop.producto].ficha;
          nuevoObjeto.inalambrico = objeto[prop.producto].inalambrico;
          nuevoObjeto.color = objeto[prop.producto].color;
        } else if (prop.producto === 'Cables') {     
          nuevoObjeto.ficha = objeto[prop.producto].ficha;
          nuevoObjeto.largo = objeto[prop.producto].largo;
          nuevoObjeto.color = objeto[prop.producto].color;
        } else if (prop.producto === 'Cargadores') {        
          nuevoObjeto.inalambrico = objeto[prop.producto].inalambrico;
          nuevoObjeto.deAuto = objeto[prop.producto].deAuto;
        } else if (prop.producto === 'Celulares') {     
          nuevoObjeto.almacenamiento = objeto[prop.producto].almacenamiento;
          nuevoObjeto.color = objeto[prop.producto].color;
          nuevoObjeto.bateria = objeto[prop.producto].bateria;
        } else if (prop.producto === 'Computadoras') {   
          nuevoObjeto.memoria = objeto[prop.producto].memoria;
          nuevoObjeto.almacenamiento = objeto[prop.producto].almacenamiento;
          nuevoObjeto.pantalla = objeto[prop.producto].pantalla;
          nuevoObjeto.chip = objeto[prop.producto].chip;
        } else if (prop.producto === 'Relojes') {  
          nuevoObjeto.estado = objeto[prop.producto].estado;
        } else if (prop.producto === 'Tablets') {  
          nuevoObjeto.almacenamiento = objeto[prop.producto].almacenamiento;
          nuevoObjeto.pantalla = objeto[prop.producto].pantalla;
        } else if (prop.producto === 'Fuentes') {      
          nuevoObjeto.tipo = objeto[prop.producto].tipo;
        } else if (prop.producto === 'Fundas') {    
          nuevoObjeto.tipo = objeto[prop.producto].tipo;
          nuevoObjeto.color = objeto[prop.producto].color;
        } else if (prop.producto === 'Mallas') {   
          nuevoObjeto.color = objeto[prop.producto].color;
        }
        objetosIndividuales.push(nuevoObjeto)
      }
      setLocalArray((prevArray) => [...prevArray, ...objetosIndividuales]);         //Guardo el objeto nuevo  en el array que usare para hacer la peticion
      clearForm();
    } else {
      const datosConjunto = {
        producto: prop.producto,
        marca: objeto[prop.producto].marca,
        modelo: objeto[prop.producto].modelo,
        cantidad: cantidad,
        estado: objeto[prop.producto].estado,
        precio: objeto[prop.producto].precio,
      }
      try {
        const response = await axios.post('http://localhost:3000/conjuntos', datosConjunto ,{
          headers: {
            'Content-Type': 'application/json',
          },
          })
        response.status === 200 && setIdResponse(response.data.conjuntoNuevo.id)
      } catch (error) {
      }
      const objetosDelConjunto = []
      for (let i = 0; i < cantidad; i++) {
        var nuevoObjeto = {
          marca: objeto[prop.producto].marca,
          modelo: objeto[prop.producto].modelo,
          estado: objeto[prop.producto].estado,
          precio: objeto[prop.producto].precio,
          conjunto: objeto[prop.producto].conjunto,
          informacion: objeto[prop.producto].informacion,
          imagenes: objeto[prop.producto].imagenes.length > 0 && objeto[prop.producto].imagenes.map((imagen) => (imagen || null)),
          idBundle: idResponse
        }
        if (prop.producto === 'Adaptadores') {
          nuevoObjeto.tipo = objeto[prop.producto].tipo;
        } else if (prop.producto === 'Auriculares') {
          nuevoObjeto.ficha = objeto[prop.producto].ficha;
          nuevoObjeto.inalambrico = objeto[prop.producto].inalambrico;
          nuevoObjeto.color = objeto[prop.producto].color;
        } else if (prop.producto === 'Cables') {     
          nuevoObjeto.ficha = objeto[prop.producto].ficha;
          nuevoObjeto.largo = objeto[prop.producto].largo;
          nuevoObjeto.color = objeto[prop.producto].color;
        } else if (prop.producto === 'Cargadores') {        
          nuevoObjeto.inalambrico = objeto[prop.producto].inalambrico;
          nuevoObjeto.deAuto = objeto[prop.producto].deAuto;
        } else if (prop.producto === 'Celulares') {     
          nuevoObjeto.almacenamiento = objeto[prop.producto].almacenamiento;
          nuevoObjeto.color = objeto[prop.producto].color;
          nuevoObjeto.bateria = objeto[prop.producto].bateria;
        } else if (prop.producto === 'Computadoras') {   
          nuevoObjeto.memoria = objeto[prop.producto].memoria;
          nuevoObjeto.almacenamiento = objeto[prop.producto].almacenamiento;
          nuevoObjeto.pantalla = objeto[prop.producto].pantalla;
          nuevoObjeto.chip = objeto[prop.producto].chip;
        } else if (prop.producto === 'Relojes') {  
          nuevoObjeto.estado = objeto[prop.producto].estado;
        } else if (prop.producto === 'Tablets') {  
          nuevoObjeto.almacenamiento = objeto[prop.producto].almacenamiento;
          nuevoObjeto.pantalla = objeto[prop.producto].pantalla;
        } else if (prop.producto === 'Fuentes') {      
          nuevoObjeto.tipo = objeto[prop.producto].tipo;
        } else if (prop.producto === 'Fundas') {    
          nuevoObjeto.tipo = objeto[prop.producto].tipo;
          nuevoObjeto.color = objeto[prop.producto].color;
        } else if (prop.producto === 'Mallas') {   
          nuevoObjeto.color = objeto[prop.producto].color;
        }
        objetosDelConjunto.push(nuevoObjeto)
      }
      setLocalArray((prevArray) => [...prevArray, ...objetosDelConjunto]);         //Guardo el objeto nuevo en el array que usare para hacer la peticion
      clearForm();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
          localArray.forEach(async (obj, index) => {
              const formData = new FormData();

              formData.append('marca', obj.marca);
              formData.append('modelo', obj.modelo);
              formData.append('estado', obj.estado);
              formData.append('precio', obj.precio);
              formData.append('conjunto', obj.conjunto);
              formData.append('informacion', obj.informacion);
              obj.imagenes.forEach((imagen, i) => {
                formData.append('imagenes', imagen);
              });          
              conjunto === "Conjunto" && (formData.append('idConjunto', idResponse));
              prop.producto === ('Adaptadores' || 'Fuentes') && (formData.append('tipo', obj.tipo))
              prop.producto === ('Auriculares' || 'Cables') && (formData.append('ficha', obj.ficha))
              prop.producto === ('Auriculares' || 'Cargadores') && (formData.append('inalambrico', obj.inalambrico))
              prop.producto === ('Auriculares' || 'Cable' || 'Celular' || 'Funda' || 'Malla') && (formData.append('color', obj.color))
              prop.producto === ('Cables') && (formData.append('largo', obj.largo))
              prop.producto === ('Cargadores') && (formData.append('deAuto', obj.deAuto))
              prop.producto === ('Celulares' || 'Computadora' || 'Tablet') && (formData.append('almacenamiento', obj.almacenamiento))
              prop.producto === ('Celulares') && (formData.append('bateria', obj.bateria))
              prop.producto === ('Computadoras') && (formData.append('memoria', obj.memoria))
              prop.producto === ('Computadoras' || 'Tablet') && (formData.append('pantalla', obj.pantalla))
              prop.producto === ('Computadoras') && (formData.append('chip', obj.chip))



              const response = await axios.post(`http://localhost:3000/${prop.producto.charAt(0).toLowerCase() + prop.producto.slice(1)}`, formData , {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  },
              });
          });
        } catch (error) {
          console.error('Error en la solicitud:', error);
        }
  };

  const handleImagenChange = (e) => {
    const files = e.target.files;
    if (files) {
      const imagesArrayBase64 = [];   //Leo las imagenes y las guardo en formato base64 para poder mostrarlas en el front
      const arrayImagenes = []
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagesArrayBase64.push(e.target.result);
          setImagenesModelo(imagesArrayBase64)
        };
        reader.readAsDataURL(files[i]);
        arrayImagenes.push(files[i])
      }

      setObjeto(prev => ({
        ...prev, 
        [prop.producto] : {
          ...prev[prop.producto],
          imagenes: arrayImagenes
        }
      }));
    }
  };

  const clearForm = () => {
      setObjeto(estadoInicial);
  };

  if (prop.producto === 'Adaptadores') {
        return (
            <div style={{position: 'static'}}>
                <form onSubmit={handleSubmit} style={{display: 'flex',flexDirection: 'column', width: '800px', height: 'fit-content', marginBottom: '20px', transition: '1s ease'}}>

                  <div id='Marca' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop:'84px', borderRadius: '8px', color: 'gray'}}>
                    <label 
                      style={{marginRight: '79px', marginTop: '10px', marginLeft: '10px'}}
                    > Marca:
                    </label>
                    <input name='marca' id='Marca' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
                    <br />
                  </div>
                  <div id='Modelo' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                    <label 
                      style={{marginRight: '70px', marginTop: '10px', marginLeft: '10px'}}
                    > Modelo:
                    </label>
                    <input name='modelo' id='Modelo' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
                    <br />
                  </div>
                  <div id='Tipo' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                    <label 
                      style={{marginRight: '92px', marginTop: '10px', marginLeft: '10px'}}
                    > Tipo:
                    </label>
                    <input name='tipo' id='Tipo' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
                    <br />
                  </div>
                  <div id='Precio' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                    <label style={{marginRight: '78px', marginTop: '10px', marginLeft: '10px'}}>
                      Precio:
                    </label>
                      <input name='precio' id='Precio' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
                    <br />
                  </div>
                  <div id='Informacion' style={{display: 'flex',flexDirection: 'row' ,backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '200px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                    <label style={{marginRight: '20px', marginTop: '10px', marginLeft: '10px'}}>
                      Informacion:
                    </label>
                      <textarea id="Informacion" name="informacion" rows="4" cols="50" onChange={(e) => handleChange(e)} style={{ width: '400px',border: 'none', borderRadius: '6px', margin: '10px', zIndex: '999'}}/>
                    <br />
                  </div>
                  <div id='Imagenes' style={{display: 'flex', flexDirection: 'row',backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '60px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                    <label style={{marginTop: '17px', marginLeft: '10px', marginRight: '40px',}}>
                      Imagenes :
                    </label>
                    <input style={{marginTop: '14px'}} type="file" onChange={e => handleImagenChange(e)} accept="image/*" multiple />
                    <br />
                  </div>
                      
                  <div id='Estado' style={{display: 'flex', flexDirection: 'row', backgroundColor: 'white', width: '290px', boxShadow: '4px 4px 10px 2px gray', height: '40px', borderRadius: '8px', marginTop: '10px', color: 'gray'}}>
                    <label style={{marginRight: '76px', marginTop: '8px', marginLeft: '10px'}} htmlFor='estado'> Estado: </label>
                      <select id="estado" name="estado"  onChange={(e) => handleChange(e)} style={{ border: 'none', color: 'gray'}}>
                        <option value="">-- Selecciona --</option>
                        <option value="Nuevo">Nuevo</option>
                        <option value="Usado">Usado</option>
                      </select>
                  </div>                  
                  <div id='Modo' style={{display: 'flex', flexDirection: 'row', backgroundColor: 'white', width: '290px', boxShadow: '4px 4px 10px 2px gray', height: '40px', borderRadius: '8px', marginTop: '10px', color: 'gray' }}>
                    <label htmlFor='opciones' style={{marginLeft: '10px', marginTop: '8px', marginRight: '90px'}}> Modo: </label>
                    <select id="opciones" name='conjunto' onChange={(e) => handleConjunto(e)} style={{border: 'none', color: 'gray'}}>
                      <option value="">-- Selecciona --</option>
                      <option value="Individual">Individual</option>
                      <option value="Conjunto">Conjunto</option>
                    </select>                  
                  </div>

                  <div style={{backgroundColor: 'white', width: '290px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                  <label style={{marginRight: '60px', marginTop: '10px', marginLeft: '10px'}}>
                    Cantidad:
                  </label>
                  <input type="number" onChange={(e) => setCantidad(e.target.value)} style={{ width: '140px', border: 'none'}}/>
                  <br />
                </div>

                  <div style={{display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center'}}>

                    <Button variant="outlined" type="button" onClick={handleAddToObject} style={{width: '200px', backgroundColor: 'white', color: 'black', border: 'none', boxShadow: '4px 4px 10px 2px gray',marginTop: '30px'}}> Armar producto </Button>
                    <Button variant="outlined" type="submit" onClick={clearForm} style={{marginBottom: '20px', width: '100px', backgroundColor: 'white', color: 'black', border: 'none', boxShadow: '4px 4px 10px 2px gray'}}>Enviar</Button>
                  </div>
          
                  {
                    localArray.length > 0 && (
                      <Col md={4}  key={0}>
                          <Card 
                          style={{
                            position: 'absolute',
                            bottom: '0',
                            marginBottom: conjunto === 'Individual' ? '10px' : '26px',
                            right: '0',
                            border: 'none',
                            boxShadow: '4px 4px 10px 2px gray',
                            marginRight: '30px',
                            width: '280px',
                            padding: '10px',
                          }}
                          bg='light'>
                            <p style={{
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                fontSize: '20px', 
                                marginTop: '10px', 
                                boxShadow: '4px 4px 10px 2px gray', 
                                width: '200px',
                                height:'40px', 
                                margin: '0 auto', 
                                backgroundColor: 'pink', 
                                borderRadius: '10px', 
                                marginBottom: '30px'
                                }}>Producto Modelo</p>
                            {
                              imagenesModelo.length > 1 ? (
                                <Carousel 
                                fade
                                style={{
                                  maxHeight: '300px',
                                  margin: '0 auto',
                                  marginTop: '0.7vh',
                                  height: 'fit-content',
                                  width: 'fit-content',
                                  borderRadius: '3%',
                                  transition: '1s ease',
                                }} 
                                >
                                  {
                                    imagenesModelo.map((image, index) => {
                                      return (                                      
                                          <Carousel.Item key={index}>
                                            {
                                              <img key={index} src={image} alt={`${image}+${index}`} style={{ maxWidth: '100%', marginRight: '10px', maxHeight: '200px' }} />
                                            }
                                          </Carousel.Item>  
                                      )
                                    })
                                  }                          
                            
                                </Carousel>
                              ) : (
                                <div>
                                  {
                                  imagenesModelo.map((image,index) => (
                                    <img key={index} src={image} alt={`${image}`+`${index}`} style={{ maxWidth: '100%', marginRight: '10px' }}/>
                                    ))
                                  }
                                </div>                              
                              )
                            }
                            <hr/>

                              <Card.Body 
                                  style={{  
                                  display: 'flex',
                                  flexDirection: 'column',
                                  }}>
                                    <p style={{margin: '0 auto', textDecoration: 'underline 2px', fontSize: '20px'}}>{conjunto}</p>
                              <ListGroup.Item                
                              style={{
                                marginTop: '10px',
                                color: 'gray'
                                }}
                              >Marca: {localArray[0].marca !== "" && localArray[0].marca} 
                              </ListGroup.Item>
                              <ListGroup.Item                
                              style={{
                                marginTop: '10px',
                                color: 'gray'
                              }}
                              >Modelo: {localArray[0].modelo !== "" && localArray[0].modelo} 
                              </ListGroup.Item>
                              <ListGroup.Item                
                              style={{
                                marginTop: '10px',
                                color: 'gray'
                              }}
                              >Tipo: {localArray[0].tipo !== "" && localArray[0].tipo} 
                              </ListGroup.Item>
                              <ListGroup.Item                
                              style={{
                                marginTop: '10px',
                                color: 'gray'
                              }}
                              >Precio: {localArray[0].precio !== "" && localArray[0].precio} 
                              </ListGroup.Item>

                              <ListGroup.Item                
                              style={{
                                marginTop: '10px',
                                color: 'gray'
                                }}
                              >Estado: {localArray[0].estado !== "" && localArray[0].estado} 
                              </ListGroup.Item>
                                {
                                  conjunto === 'Conjunto' && (
                                    <ListGroup.Item                
                                    style={{
                                      marginTop: '10px',
                                      color: 'gray'
                                    }}
                                    >Cantidad: {cantidad !== "" && cantidad} 
                                    </ListGroup.Item>
                                  )
                                }
                          </Card.Body>
                          </Card>
                      </Col>
                      )
                  }
                
              </form>
            </div>
        )    

  } else if (prop.producto === 'Auriculares') {
    return (
            <div style={{position: 'static'}}>
                  <form onSubmit={handleSubmit} style={{display: 'flex',flexDirection: 'column', width: '800px', height: 'fit-content', marginBottom: '20px', transition: '1s ease'}}>
                    <div id='Marca' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop:'84px', borderRadius: '8px', color: 'gray'}}>
                      <label 
                        style={{marginRight: '79px', marginTop: '10px', marginLeft: '10px'}}
                      > Marca:
                      </label>
                      <input name='marca' id='Marca' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
                      <br />
                    </div>
                    <div id='Modelo' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                      <label 
                        style={{marginRight: '70px', marginTop: '10px', marginLeft: '10px'}}
                      > Modelo:
                      </label>
                      <input name='modelo' id='Modelo' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
                      <br />
                    </div>
                    <div id='Ficha' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                      <label 
                        style={{marginRight: '87px', marginTop: '10px', marginLeft: '10px'}}
                      > Ficha:
                      </label>
                      <input name='ficha' id='Ficha' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
                      <br />
                    </div>

                    <div id='Tipo' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                      <label 
                        style={{marginRight: '92px', marginTop: '10px', marginLeft: '10px'}}
                      > Tipo:
                      </label>
                      <input name='tipo' id='Tipo' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
                      <br />
                    </div>
                    <div id='Precio' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                      <label style={{marginRight: '78px', marginTop: '10px', marginLeft: '10px'}}>
                        Precio:
                      </label>
                        <input name='precio' id='Precio' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
                      <br />
                    </div>
                    <div id='Color' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                      <label style={{marginRight: '86px', marginTop: '10px', marginLeft: '10px'}}>
                        Color:
                      </label>
                        <input name='color' id='Color' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
                      <br />
                    </div>
                    <div id='Informacion' style={{display: 'flex',flexDirection: 'row' ,backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '200px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                    <label style={{marginRight: '20px', marginTop: '10px', marginLeft: '10px'}}>
                      Informacion:
                    </label>
                      <textarea id="Informacion" name="informacion" rows="4" cols="50" onChange={(e) => handleChange(e)} style={{ width: '400px',border: 'none', borderRadius: '6px', margin: '10px', zIndex: '999'}}/>
                    <br />
                  </div>
                    <div id='Imagenes' style={{display: 'flex', flexDirection: 'row',backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '60px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                      <label style={{marginTop: '17px', marginLeft: '10px', marginRight: '40px',}}>
                        Imagenes :
                      </label>
                      <input style={{marginTop: '14px'}} type="file" onChange={e => handleImagenChange(e)} accept="image/*" multiple />
                      <br />
                    </div>
                    <div id='Inalambrico' style={{display: 'flex', flexDirection: 'row', backgroundColor: 'white', width: '290px', boxShadow: '4px 4px 10px 2px gray', height: '40px', borderRadius: '8px', marginTop: '10px', color: 'gray'}}>
                      <label style={{marginRight: '76px', marginTop: '8px', marginLeft: '10px'}} htmlFor='estado'> Inalambrico: </label>
                      <input name='inalambrico' id='Inalambrico' type="checkbox" onChange={(e) => handleChange(e)} style={{display: 'flex', marginTop: '12px', marginLeft: '80px', width: '15px', border: 'none', borderRadius: '6px', height: 'fit-content'}}/>
                      
                    </div>  
                    <div id='Estado' style={{display: 'flex', flexDirection: 'row', backgroundColor: 'white', width: '290px', boxShadow: '4px 4px 10px 2px gray', height: '40px', borderRadius: '8px', marginTop: '10px', color: 'gray'}}>
                      <label style={{marginRight: '76px', marginTop: '8px', marginLeft: '10px'}} htmlFor='estado'> Estado: </label>
                        <select id="estado" name="estado"  onChange={(e) => handleChange(e)} style={{ border: 'none', color: 'gray'}}>
                          <option value="">-- Selecciona --</option>
                          <option value="Nuevo">Nuevo</option>
                          <option value="Usado">Usado</option>
                        </select>
                    </div>                  
                    <div id='Modo' style={{display: 'flex', flexDirection: 'row', backgroundColor: 'white', width: '290px', boxShadow: '4px 4px 10px 2px gray', height: '40px', borderRadius: '8px', marginTop: '10px', color: 'gray' }}>
                      <label htmlFor='opciones' style={{marginLeft: '10px', marginTop: '8px', marginRight: '84px'}}> Modo: </label>
                      <select id="opciones" name='conjunto' onChange={(e) => handleConjunto(e)} style={{border: 'none', color: 'gray'}}>
                        <option value="">-- Selecciona --</option>
                        <option value="Individual">Individual</option>
                        <option value="Conjunto">Conjunto</option>
                      </select>                  
                    </div>

                    <div style={{backgroundColor: 'white', width: '290px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                    <label style={{marginRight: '60px', marginTop: '10px', marginLeft: '10px'}}>
                      Cantidad:
                    </label>
                    <input type="number" onChange={(e) => setCantidad(e.target.value)} style={{ width: '140px', border: 'none'}}/>
                    <br />
                  </div>

                    <div style={{display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center'}}>
                      <Button variant="outlined" type="button" onClick={handleAddToObject} style={{width: '200px', backgroundColor: 'white', color: 'black', border: 'none', boxShadow: '4px 4px 10px 2px gray',marginTop: '30px'}}> Armar producto </Button>
                      <Button variant="outlined" type="submit" onClick={clearForm} style={{marginBottom: '20px', width: '100px', backgroundColor: 'white', color: 'black', border: 'none', boxShadow: '4px 4px 10px 2px gray'}}>Enviar</Button>
                    </div>
            
                    
                      <Col md={4}  key={0}>
                          <Card 
                          style={{
                            position: 'absolute',
                            bottom: '0',
                            marginBottom: conjunto === 'Individual' ? '10px' : '26px',
                            right: '0',
                            border: 'none',
                            boxShadow: '4px 4px 10px 2px gray',
                            marginRight: '30px',
                            width: '280px',
                            padding: '10px',
                          }}
                          bg='light'>
                            <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center',fontSize: '20px', marginTop: '10px', boxShadow: '4px 4px 10px 2px gray', width: '200px',height:'40px', margin: '0 auto', backgroundColor: 'pink', borderRadius: '10px', marginBottom: '30px'}}>Producto Modelo</p>
                            {
                              imagenesModelo.length > 1 ? (
                                <Carousel 
                                fade
                                style={{
                                  maxHeight: '300px',
                                  margin: '0 auto',
                                  marginTop: '0.7vh',
                                  height: 'fit-content',
                                  width: 'fit-content',
                                  borderRadius: '3%',
                                  transition: '1s ease',
                                }} 
                                >
                                  {
                                    imagenesModelo.map((image, index) => {
                                      return (                                      
                                          <Carousel.Item key={index}>
                                            {
                                              <img key={index} src={image} alt={`${image}+${index}`} style={{ maxWidth: '100%', marginRight: '10px', maxHeight: '200px' }} />
                                            }
                                          </Carousel.Item>  
                                      )
                                    })
                                  }                          
                            
                                </Carousel>
                              ) : (
                                <div>
                                  {
                                  imagenesModelo.map((image,index) => (
                                    <img key={index} src={image} alt={`${image}`+`${index}`} style={{ maxWidth: '100%', marginRight: '10px' }}/>
                                    ))
                                  }
                                </div>                              
                              )
                            }
                            <hr/>
  
                              <Card.Body 
                                  style={{  
                                  display: 'flex',
                                  flexDirection: 'column',
                                  }}>
                                    <p style={{margin: '0 auto', textDecoration: 'underline 2px', fontSize: '20px'}}>{conjunto}</p>
                              <ListGroup.Item                
                              style={{
                                marginTop: '10px',
                                color: 'gray'
                                }}
                              >Marca: {objeto.marca !== "" && objeto.marca} 
                              </ListGroup.Item>
                              <ListGroup.Item                
                              style={{
                                marginTop: '10px',
                                color: 'gray'
                              }}
                              >Modelo: {objeto.modelo !== "" && objeto.modelo} 
                              </ListGroup.Item>
                              <ListGroup.Item                
                              style={{
                                marginTop: '10px',
                                color: 'gray'
                              }}
                              >Tipo: {objeto.tipo !== "" && objeto.tipo} 
                              </ListGroup.Item>
                              <ListGroup.Item                
                              style={{
                                marginTop: '10px',
                                color: 'gray'
                              }}
                              >Precio: {objeto.precio !== "" && objeto.precio} 
                              </ListGroup.Item>
  
                              <ListGroup.Item                
                              style={{
                                marginTop: '10px',
                                color: 'gray'
                                }}
                              >Estado: {objeto.estado !== "" && objeto.estado} 
                              </ListGroup.Item>
                                {
                                  conjunto === 'Conjunto' && (
                                    <ListGroup.Item                
                                    style={{
                                      marginTop: '10px',
                                      color: 'gray'
                                    }}
                                    >Cantidad: {cantidad !== "" && cantidad} 
                                    </ListGroup.Item>
                                    
                                  )
                                }
                          </Card.Body>
                          </Card>
                      </Col>
                  
                </form>
              </div>
          )
  } else {
    
  }
}

export default Formularios;

