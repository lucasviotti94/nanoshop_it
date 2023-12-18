import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import Alert from 'react-bootstrap/Alert';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const Formularios = (prop) => {
  
  const [objeto, setObjeto] = useState({
    Adaptadores: {
      marca: '',
      modelo: '',
      tipo: '',
      estado: '',
      precio: 0,
      conjunto: '',
      informacion: '',
      imagenes: [],
    },
    Auriculares: {
      marca: '',
      modelo: '',
      ficha: '',
      inalambrico: false,
      color: '',
      estado: '',
      precio: 0,
      conjunto: '',
      informacion: '',
      imagenes: [],
    },
    Cables: {
      marca: '',
      modelo: '',
      ficha: '',
      largo: '',
      color: '',
      estado: '',
      precio: 0,
      conjunto: '',
      informacion: '',
      imagenes: [],
    },
    Cargadores: {
      marca: '',
      modelo: '',
      inalambrico: false,
      deAuto: '',
      estado: '',
      precio: 0,
      conjunto: '',
      informacion: '',
      imagenes: [],
    },
    Celulares: {
      marca: '',
      modelo: '',
      almacenamiento: 0,
      color: '',
      estado: '',
      bateria: '',
      precio: 0,
      conjunto: '',
      informacion: '',
      imagenes: [],
    },
    Computadoras: {
      marca: '',
      modelo: '',
      memoria: '',
      almacenamiento: 0,
      pantalla: '',
      color: '',
      chip: '',
      estado: '',
      precio: 0,
      informacion: '',
      conjunto: '',
      imagenes: [],
    },
    Fuentes: {
      marca: '',
      modelo: '',
      tipo: '',
      precio: 0,
      informacion: '',
      conjunto: '',
      imagenes: [],
    },
    Fundas: {
    marca: '',
      modelo: '',
      tipo: '',
      color: '',
      precio: 0,
      informacion: '',
      imagenes: [],
      conjunto: '',
    },
    Mallas: {
      marca: '',
      modelo: '',
      color: '',
      precio: 0,
      informacion: '',
      imagenes: [],
      conjunto: '',
    },
    Relojes: {
      marca: '',
      modelo: '',
      color: '',
      precio: 0,
      estado: '',
      informacion: '',
      imagenes: [],
      conjunto: '',
    },
    Tablets: {
      marca: '',
      modelo: '',
      almacenamiento: 0,
      color: '',
      pantalla: '',
      precio: 0,
      estado: '',
      informacion: '',
      imagenes: [],
      conjunto: '',
    },
    Vidrios_Protectores: {
      marca: '',
      modelo: '',
      precio: 0,
      informacion: '',
      imagenes: [],
      conjunto: '',
    },
  })

  const [localArray, setLocalArray] = useState([]); 
  const [idResponse, setIdResponse] = useState(''); 
  const [conjunto, setConjunto] = useState("")
  const [cantidad, setCantidad] = useState(1);
  const [imagenesModelo, setImagenesModelo] = useState([]);
  const [errors, setErrors] = useState({
    marca: [],
    modelo: [],
    precio: [],
    informacion: [],
    estado: [],
    conjunto: [],
    imagenes: [],
    tipo: [],
    ficha: [],
    inalambrico: [],
    color: [],
    deAuto: [], 
    almacenamiento: [],
    pantalla: [],
    chip: []
  });

  const validate = () => {

    
    const object = objeto[prop.producto]
    // Propiedades en comun de todos los modelos

    if (object.marca === '') {
      setErrors(prev => ({ ...prev, marca: ['incorrecto 1', 'Ingresar la marca aca!']}))
     } else if (!/^[a-zA-Z0-9\s]+$/.test(object.marca)) {
      setErrors(prev => ({...prev, marca: ['incorrecto 2', 'Ingresar numeros y/o letras (mayusculas/minusculas)!']})) 
     } else {
      setErrors(prev => ({...prev, marca: ['correcto','Caracteres correctos.']})) 
     }

     if (object.modelo === '') {
      setErrors(prev => ({ ...prev, modelo: ['incorrecto 1', 'Ingresar el modelo aca!']}))
    } else if (!/^[a-zA-Z0-9\s]+$/.test(object.modelo)) {
      setErrors(prev => ({ ...prev, modelo: ['incorrecto 2','Ingresar numeros y/o letras (mayusculas/minusculas)!']}))
    } else {
      setErrors(prev => ({...prev, modelo: ['correcto','Caracteres correctos.']})) 
    }
    
    if (object.precio === 0) {
      setErrors(prev => ({ ...prev, precio: ['incorrecto', 'Ingresar el precio !']})) ;
    } else {
      setErrors(prev => ({ ...prev, precio: ['correcto','Precio ingresado.']}));
    } 

    if (conjunto === '') {
      setErrors(prev => ({...prev, conjunto: ['incorrecto', 'Ingresar el modo !']}));
    } else {
      setErrors(prev => ({...prev, conjunto: ['correcto','Caracteres correctos.']}));
    }

    if (object.tipo === '') {
      setErrors(prev => ({...prev, tipo: ['incorrecto 1', 'Ingresar la tipo aca!']}))
    } else if (!/^[a-zA-Z0-9\s]+$/.test(object.tipo)) {
      setErrors(prev => ({ ...prev, tipo: ['incorrecto 2', 'Ingresar numeros y/o letras (mayusculas/minusculas)!']}))
    } else {
      setErrors(prev => ({...prev, tipo: ['correcto','Caracteres correctos.']}))
    }

    if (object.estado === '') {
      setErrors(prev => ({...prev, estado: ['incorrecto','Ingresar el estado !']}))
    } else {
      setErrors(prev => ({...prev, estado: ['correcto','Estado seleccionado.']}))
    }

    // Propiedades particulares

      objeto[prop.producto].ficha === '' && (errors.ficha = 'Ingresar el tipo de ficha.')
      !/^[a-zA-Z0-9\s]+$/.test(objeto[prop.producto].ficha) && (errors.ficha = 'Ingresar letras (mayusculas/minusculas) y numeros.');
      objeto[prop.producto].color === ''&& (errors.color = 'Ingresar el color.')
      !/^[a-zA-Z]+$/.test(objeto[prop.producto].color) && (errors.color = 'Ingresar solamente letras(mayusculas y/o minusculas.');
      objeto[prop.producto].largo === '' && (errors.largo = 'Ingresar el largo.');
      !/^[a-zA-Z0-9\s]+$/.test(objeto[prop.producto].largo) && (errors.largo = 'Ingresar letras (mayusculas y/o minusculas) y numeros.');
      objeto[prop.producto].almacenamiento === 0 && (errors.almacenamiento = 'Ingresar el almacenamiento.')
      !/^[0-9]+$/.test(objeto[prop.producto].almacenamiento) && (errors.almacenamiento = 'Ingresar letras (mayusculas y/o minusculas) y numeros.');
      objeto[prop.producto].bateria === 0 && (errors.bateria = 'Ingresar el porcentaje de vida util de la bateria.')
      objeto[prop.producto].memoria === 0 && (errors.memoria = 'Ingresar la memoria RAM del producto.')
      objeto[prop.producto].pantalla === 0 && (errors.pantalla = 'Ingresar las pulgadas de la pantalla.')
      objeto[prop.producto].chip === '' && (errors.chip = 'Ingresar el tipo de chip.')
      !/^[a-zA-Z0-9\s]+$/.test(objeto[prop.producto].chip) && (errors.chip = 'Ingresar letras (mayusculas y/o minusculas) y numeros.');

};

useEffect(() => {
  console.log('Estado actualizado:', objeto[prop.producto]);
}, [objeto, prop, errors]);

  const handleChange = (e) => {         //Con esta funcion rellenamos los datos del objeto del estado, usando la prop name de el evento 
    setErrors(prev => ({
      ...prev,
      [e.target.name]: ''
    })) 
    setObjeto(prev =>({
      ...prev,
      [prop.producto]: {
        ...prev[prop.producto],
        [e.target.name]:  (e.target.name === 'inalambrico') ? e.target.checked : e.target.value,
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

  const handleAddToObject = async () => {  
                                         // con esta funcion creo el array que contendra los objetos a partir del formulario y de el estado Cantidad
    validate()        
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
          imagenes: objeto[prop.producto].imagenes.length > 0 && objeto[prop.producto].imagenes.map((imagen) => (imagen || '')),
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
          imagenes: objeto[prop.producto].imagenes.length > 0 && objeto[prop.producto].imagenes.map((imagen) => (imagen || '')),
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

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validate()
    try {
      console.log('localArray', localArray)
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
          
          if (prop.producto === 'Adaptadores' || prop.producto === 'Fuentes') {
            formData.append('tipo', obj.tipo);
          }
          if (prop.producto === 'Auriculares' || prop.producto === 'Cables') {
            formData.append('ficha', obj.ficha);
          }
          if (prop.producto === 'Auriculares' || prop.producto === 'Cargadores') {
            formData.append('inalambrico', obj.inalambrico);
          }
          if (prop.producto === 'Auriculares' || prop.producto === 'Cable' || prop.producto === 'Celular' || prop.producto === 'Funda' || prop.producto === 'Malla') {
            formData.append('color', obj.color);
          }
          if (prop.producto === 'Cables') {
            formData.append('largo', obj.largo);
          }
          if (prop.producto === 'Cargadores') {
            formData.append('deAuto', obj.deAuto);
          }
          if (prop.producto === 'Celulares' || prop.producto === 'Computadora' || prop.producto === 'Tablet') {
            formData.append('almacenamiento', obj.almacenamiento);
          }
          if (prop.producto === 'Celulares') {
            formData.append('bateria', obj.bateria);
          }
          if (prop.producto === 'Computadoras') {
            formData.append('memoria', obj.memoria);
          }
          if (prop.producto === 'Computadoras' || prop.producto === 'Tablet') {
            formData.append('pantalla', obj.pantalla);
          }
          if (prop.producto === 'Computadoras') {
            formData.append('chip', obj.chip);
          }
          if (conjunto === 'Conjunto') {
            formData.append('idConjunto', idResponse);
          }

          const response = await axios.post(`http://localhost:3000/${prop.producto.charAt(0).toLowerCase() + prop.producto.slice(1)}`, formData , {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
        });
      setObjeto((prevObjeto) => {
        const producto = prop.producto;
        const camposLimpio = Object.keys(prevObjeto[producto]).reduce(
          (acc, campo) => ({ ...acc, [campo]: '' }),
          {}
        );
    
        return {
          ...prevObjeto,
          [producto]: camposLimpio,
        };
      });
      setConjunto("")
      setLocalArray([])
      setCantidad(1)
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

  if (prop.producto === 'Adaptadores') {
        return (
            <div style={{position: 'static'}}>
                <form onSubmit={handleSubmit} style={{display: 'flex',alignItems: 'center', flexDirection: 'column', width: 'fit-content', height: 'fit-content', marginBottom: '20px', transition: '1s ease'}}>
                  <div 
                    id='Marca' 
                    style={{
                      backdropFilter: 'blur(0.8rem)', 
                      backgroundColor: 'rgba(255, 255, 255, 0.260)',
                      width: '750px', 
                      boxShadow: '2px 4px 8px 1px #9999', 
                      height: '40px', 
                      marginTop:'84px', 
                      borderRadius: '8px', 
                      color: 'black',
                      display: 'flex',
                      alignContent: 'center'
                    }}>
                    <label 
                      style={{marginRight: '50px', marginTop: '8px', marginLeft: '10px', position: 'relative'}}
                    > Marca:
                    </label>
                      <input name='marca' id='Marca' value={objeto[prop.producto].marca} type="text" onChange={(e) => handleChange(e)} 
                        style={{ backdropFilter: 'blur(0.8rem)', backgroundColor: 'rgba(255, 255, 255, 0.360)', width: '600px', border: 'none', borderRadius: '6px', paddingLeft: '20px', display: 'flex', height: '32px', marginTop: '4.2px'}}/>
                      { 
                        errors.marca && (
                          <p style={{
                              display: 'flex' ,
                              position:'absolute', 
                              color: 'red', 
                              marginLeft: (errors.marca[0] === 'incorrecto 1') ? '576px' : (errors.marca[0] === 'incorrecto 2') ? '400px' : '670px', 
                              top: '0',
                              marginTop: ((errors.marca[0] === 'incorrecto 1') || (errors.marca[0] === 'incorrecto 2')) ? '10px' : '8px',
                              fontSize: '12px', 
                              fontWeight: '800', 
                              width: 'fit-content',
                              }}>{errors.marca[0] === 'correcto' ? <CheckCircleOutlineIcon style={{color: 'green'}}/> : errors.marca[1] }
                          </p> 
                        ) 
                      } 
                    <br />
                  </div>
                  <div 
                    id='Modelo' 
                    style={{
                      backdropFilter: 'blur(0.8rem)', 
                      backgroundColor: 'rgba(255, 255, 255, 0.260)',
                      width: '750px', 
                      boxShadow: '4px 4px 10px 2px #9999',
                      height: '40px', 
                      marginTop: '10px', 
                      borderRadius: '8px', 
                      color: 'black',
                      position: 'relative',
                      display: 'flex',
                    }}>
                    <label 
                      style={{marginRight: '40px', marginTop: '8px', marginLeft: '10px'}}
                    > Modelo:
                    </label>
                    <input name='modelo' id='Modelo' type="text" value={objeto[prop.producto].modelo} onChange={(e) => handleChange(e)} 
                      style={{ backdropFilter: 'blur(0.8rem)', backgroundColor: 'rgba(255, 255, 255, 0.360)', width: '600px', border: 'none', borderRadius: '6px', paddingLeft: '20px', display: 'flex', height: '32px', marginTop: '4.2px'}}/>
                      {
                        errors.modelo && (
                        <p style={{
                                display: 'flex',
                                position: 'absolute', 
                                color: 'red', 
                                marginLeft: (errors.modelo[0] === 'incorrecto 1') ? '569px' : (errors.modelo[0] === 'incorrecto 2') ? '400px' : '670px',
                                top: '0',
                                marginTop: ((errors.modelo[0] === 'incorrecto 1') || (errors.modelo[0] === 'incorrecto 2')) ? '10px' : '8px',
                                fontSize: '12px',
                                fontWeight: '800',
                                width: 'fit-content'
                                }}> {errors.modelo[0] === 'correcto' ? <CheckCircleOutlineIcon style={{color: 'green'}}/> : errors.modelo[1] }
                        </p>
                        )
                      } 
                    <br />
                  </div>
                  <div id='Tipo' 
                    style={{
                      backdropFilter: 'blur(0.8rem)', 
                      backgroundColor: 'rgba(255, 255, 255, 0.260)', 
                      width: '750px', 
                      boxShadow: '4px 4px 10px 2px #9999', 
                      height: '40px', 
                      marginTop: '10px', 
                      borderRadius: '8px', 
                      color: 'black',
                      position: 'relative',
                      display: 'flex',
                      }}>
                    <label 
                      style={{marginRight: '62px', marginTop: '8px', marginLeft: '10px'}}
                    > Tipo:
                    </label>
                    <input name='tipo' id='Tipo' type="text" value={objeto[prop.producto].tipo} onChange={(e) => handleChange(e)} 
                      style={{ backdropFilter: 'blur(0.8rem)', backgroundColor: 'rgba(255, 255, 255, 0.360)', width: '600px', border: 'none', borderRadius: '6px', paddingLeft: '20px', display: 'flex', height: '32px', marginTop: '4.2px'}}/>
                      {
                        errors.tipo && (
                          <p style={{
                              display: 'flex', 
                              position: 'absolute', 
                              color: 'red', 
                              marginLeft: (errors.tipo[0] === 'incorrecto 1') ? '588px' : (errors.tipo[0] === 'incorrecto 2') ? '400px' : '670px',
                              top: '0',
                              marginTop: ((errors.tipo[0] === 'incorrecto 1') || (errors.tipo[0] === 'incorrecto 2')) ? '10px' : '8px',
                              fontSize: '12px', 
                              width: '310px'
                              }}>{errors.tipo[0] === 'correcto' ? <CheckCircleOutlineIcon style={{color: 'green'}}/> : errors.tipo[1] }
                          </p>
                        ) 
                      } 
                    <br />
                  </div>
                  <div id='Precio' 
                    style={{
                      backdropFilter: 'blur(0.8rem)', 
                      backgroundColor: 'rgba(255, 255, 255, 0.260)', 
                      width: '750px', 
                      boxShadow: '4px 4px 10px 2px #9999', 
                      height: '40px', 
                      marginTop: '10px', 
                      borderRadius: '8px',
                      color: 'black',
                      position: 'relative',
                      display: 'flex',
                      }}>
                    <label 
                    style={{marginRight: '49px', marginTop: '8px', marginLeft: '10px'}}>
                      Precio:
                    </label>
                      <input name='precio' min="0" max="99999999" id='Precio' type="number" value={objeto[prop.producto].precio} onChange={(e) => handleChange(e)} 
                        style={{ backdropFilter: 'blur(0.8rem)', backgroundColor: 'rgba(255, 255, 255, 0.360)', width: '600px', border: 'none', borderRadius: '6px', paddingLeft: '20px', display: 'flex', height: '32px', marginTop: '4.2px'}}/>
                        {
                          errors.precio && (
                            <p style={{
                              display: 'flex', 
                              position: 'absolute', 
                              color: 'red', 
                              marginLeft: errors.precio[0] === 'incorrecto' ? '593px' : '670px',
                              top: '0',
                              marginTop: ((errors.precio[0] === 'incorrecto 1') || (errors.precio[0] === 'incorrecto 2')) ? '10px' : '8px',
                              fontSize: '12px', 
                              width: '150px'
                              }}>{errors.precio[0] === 'correcto' ? <CheckCircleOutlineIcon style={{color: 'green'}}/> : errors.precio[1]}
                            </p>
                          ) 
                        } 
                    <br />
                  </div>
                  <div id='Informacion' style={{display: 'flex',flexDirection: 'row' ,backdropFilter: 'blur(0.8rem)', backgroundColor: 'rgba(255, 255, 255, 0.260)', width: '750px', boxShadow: '4px 4px 10px 2px #9999', height: '200px', marginTop: '10px', borderRadius: '8px', color: 'gray', position: 'relative'}}>
                    <label 
                    style={{marginTop: '10px', marginLeft: '8px', color: 'black'}}>
                      Informacion:
                    </label>
                      <textarea id="Informacion" name="informacion" value={objeto[prop.producto].informacion} rows="6" cols="50" onChange={(e) => handleChange(e)} style={{ width: '600px',border: 'none', borderRadius: '6px', margin: '10px', zIndex: '999', backdropFilter: 'blur(0.8rem)', backgroundColor: 'rgba(255, 255, 255, 0.360)',}}/>
                    <br />
                  </div>
                 <div style={{display: 'flex', flexDirection: 'row', gap: '10px', transition: '2s ease', alignItems: 'center'}}>
                  <div id='Imagenes' style={{display: 'flex', flexDirection: 'row',backdropFilter: 'blur(0.8rem)', backgroundColor: 'rgba(255, 255, 255, 0.260)', width: '500px', boxShadow: '4px 4px 10px 2px #9999', height: '60px', marginTop: '10px', borderRadius: '8px' }}>
                    <label 
                    style={{marginTop: '17px', marginLeft: '10px', marginRight: '40px',color: 'black'}}>
                      Imagenes :
                    </label>
                    <input style={{marginTop: '14px', paddingLeft: '20px'}} type="file" onChange={e => handleImagenChange(e)} accept="image/*" multiple />
                    
                    <br />
                  </div>
                  <div id='showPics' 
                      style={{
                        display: imagenesModelo.length > '0' ?'flex': 'none',
                        backdropFilter: 'blur(0.8rem)', 
                        backgroundColor: 'rgba(255, 255, 255, 0.360)', 
                        width: '240px', 
                        boxShadow: '4px 4px 10px 2px #9999', 
                        height: '240px', 
                        marginTop: '10px', 
                        marginBottom: '10px', 
                        borderRadius: '8px', 
                        transition: '2s ease-in-out',
                      }}>
                      {
                        imagenesModelo.length > 0 ? (
                          <Carousel 
                          fade
                          style={{
                            display: 'flex',
                            marginTop: '4%',
                            justifyContent: 'center',
                            transition: '1s ease',
                            width: 'fit-content',
                            height: '220px',
                            margin: '0 auto'
                          }} 
                          >
                            {
                              imagenesModelo.map((image, index) => {
                                return (                                      
                                    <Carousel.Item key={index}>
                                      <img key={index} src={image} alt={`${image}+${index}`} style={{objectFit: 'contain', height: '220px', width: 'fit-content', borderRadius: '3%'}} />
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
                  </div>
                </div> 

                  <div id='Estado' 
                  style={{display: 'flex', flexDirection: 'row', backdropFilter: 'blur(0.8rem)', backgroundColor: 'rgba(255, 255, 255, 0.060)', width: '290px', boxShadow: '4px 4px 10px 2px #9999', height: '40px', borderRadius: '8px',marginTop: '10px'}}>
                    <label style={{marginRight: '76px', marginTop: '8px', marginLeft: '10px', color: 'black'}} htmlFor='estado'> Estado: </label>
                      <select id="estado" name="estado" value={objeto[prop.producto].estado} onChange={(e) => handleChange(e)} style={{ border: 'none', color: 'black', backdropFilter: 'blur(0.8rem)', backgroundColor: 'rgba(255, 255, 255, 0.260)'}}>
                        <option value="">-- Selecciona --</option>
                        <option value="Nuevo">Nuevo</option>
                        <option value="Usado">Usado</option>
                      </select>
                      {
                          errors.estado && (
                            <p style={{
                              display: 'flex', 
                              position: 'absolute', 
                              color: 'red', 
                              marginLeft: '310px',
                              top: '0',
                              marginTop: ((errors.estado[0] === 'incorrecto 1') || (errors.estado[0] === 'incorrecto 2')) ? '10px' : '8px',
                              fontSize: '12px', 
                              width: '150px'
                              }}>{errors.estado[0] === 'correcto' ? <CheckCircleOutlineIcon style={{color: 'green'}}/> : errors.estado[1]}
                            </p>
                          ) 
                        } 
                  </div>                  
                  <div id='Modo' style={{display: 'flex', flexDirection: 'row', backdropFilter: 'blur(0.8rem)', backgroundColor: 'rgba(255, 255, 255, 0.260)', width: '290px', boxShadow: '4px 4px 10px 2px #9999', height: '40px', borderRadius: '8px', marginTop: '10px', color: 'black' }}>
                    <label htmlFor='opciones' style={{marginLeft: '10px', marginTop: '8px', marginRight: '84px'}}> Modo: </label>
                    <select id="opciones" value={conjunto} name='conjunto' onChange={(e) => handleConjunto(e)} style={{border: 'none', color: 'black', backdropFilter: 'blur(0.8rem)', backgroundColor: 'rgba(255, 255, 255, 0.360)'}}>
                      <option style={{backdropFilter: 'blur(0.8rem)', backgroundColor: 'rgba(255, 255, 255, 0.060)'}} value="">-- Selecciona --</option>
                      <option value="Individual">Individual</option>
                      <option value="Conjunto">Conjunto</option>
                    </select>
                    {
                          errors.conjunto && (
                            <p style={{
                              display: 'flex', 
                              position: 'absolute', 
                              color: 'red', 
                              marginLeft: '310px',
                              top: '0',
                              marginTop: ((errors.conjunto[0] === 'incorrecto 1') || (errors.conjunto[0] === 'incorrecto 2')) ? '10px' : '8px',
                              fontSize: '12px', 
                              width: '150px'
                              }}>{errors.conjunto[0] === 'correcto' ? <CheckCircleOutlineIcon style={{color: 'green'}}/> : errors.conjunto[1]}
                            </p>
                          ) 
                        } 
                  </div>

                  <div style={{backdropFilter: 'blur(0.8rem)', backgroundColor: 'rgba(255, 255, 255, 0.060)', width: '290px', boxShadow: '4px 4px 10px 2px #9999', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                  <label style={{marginRight: '60px', marginTop: '10px', marginLeft: '10px', color: 'black'}}>
                    Cantidad:
                  </label>
                  <input type="number" min="1" max="50" value={cantidad} onChange={(e) => setCantidad(e.target.value)} style={{ width: '140px', border: 'none', backdropFilter: 'blur(0.8rem)', backgroundColor: 'rgba(255, 255, 255, 0.060)'}}/>
                  <br />
                </div>

                  <div style={{display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center'}}>
                  
                    <hr/>
                    <Button variant="outlined" type="button" onClick={handleAddToObject} style={{width: '200px', backdropFilter: 'blur(0.8rem)', backgroundColor: 'rgba(255, 255, 255, 0.060)', color: 'black', border: 'none', boxShadow: '4px 4px 10px 2px #9999'}}> Armar producto </Button>
                    <Button variant="outlined" type="submit" style={{marginBottom: '20px', width: '100px', backdropFilter: 'blur(0.8rem)', backgroundColor: 'rgba(255, 255, 255, 0.060)', color: 'black', border: 'none', boxShadow: '4px 4px 10px 2px #9999'}}>Enviar</Button>
                  </div>
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
                      <input name='marca' value={objeto[prop.producto].marca} id='Marca' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
                      <br />
                    </div>
                    <div id='Modelo' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                      <label 
                        style={{marginRight: '70px', marginTop: '10px', marginLeft: '10px'}}
                      > Modelo:
                      </label>
                      <input name='modelo' value={objeto[prop.producto].modelo} id='Modelo' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
                      <br />
                    </div>
                    <div id='Ficha' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                      <label 
                        style={{marginRight: '87px', marginTop: '10px', marginLeft: '10px'}}
                      > Ficha:
                      </label>
                      <input name='ficha' value={objeto[prop.producto].ficha} id='Ficha' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
                      <br />
                    </div>
                    <div id='Precio' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                      <label style={{marginRight: '78px', marginTop: '10px', marginLeft: '10px'}}>
                        Precio:
                      </label>
                        <input name='precio' value={objeto[prop.producto].precio} id='Precio' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
                      <br />
                    </div>
                    <div id='Color' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                      <label style={{marginRight: '86px', marginTop: '10px', marginLeft: '10px'}}>
                        Color:
                      </label>
                        <input name='color' value={objeto[prop.producto].color} id='Color' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
                      <br />
                    </div>
                    <div id='Informacion' style={{display: 'flex',flexDirection: 'row' ,backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '200px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                    <label style={{marginRight: '20px', marginTop: '10px', marginLeft: '10px'}}>
                      Informacion:
                    </label>
                      <textarea id="Informacion" value={objeto[prop.producto].informacion} name="informacion" rows="4" cols="50" onChange={(e) => handleChange(e)} style={{ width: '400px',border: 'none', borderRadius: '6px', margin: '10px', zIndex: '999'}}/>
                    <br />
                  </div>
                    <div id='Imagenes' style={{display: 'flex', flexDirection: 'row',backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '60px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                      <label style={{marginTop: '17px', marginLeft: '10px', marginRight: '40px',}}>
                        Imagenes :
                      </label>
                      <input name='imagenes' value={objeto[prop.producto].imagenes} style={{marginTop: '14px'}} type="file" onChange={e => handleImagenChange(e)} accept="image/*" multiple />
                      <br />
                    </div>
                    <div id='Inalambrico' style={{display: 'flex', flexDirection: 'row', backgroundColor: 'white', width: '290px', boxShadow: '4px 4px 10px 2px gray', height: '40px', borderRadius: '8px', marginTop: '10px', color: 'gray'}}>
                      <label style={{marginRight: '76px', marginTop: '8px', marginLeft: '10px'}} htmlFor='estado'> Inalambrico: </label>
                      <input name='inalambrico' checked={objeto[prop.producto].inalambrico} id='Inalambrico' type="checkbox" onChange={(e) => handleChange(e)} style={{display: 'flex', marginTop: '12px', marginLeft: '80px', width: '15px', border: 'none', borderRadius: '6px', height: 'fit-content'}}/>
                      
                    </div>  
                    <div id='Estado' style={{display: 'flex', flexDirection: 'row', backgroundColor: 'white', width: '290px', boxShadow: '4px 4px 10px 2px gray', height: '40px', borderRadius: '8px', marginTop: '10px', color: 'gray'}}>
                      <label style={{marginRight: '76px', marginTop: '8px', marginLeft: '10px'}} htmlFor='estado'> Estado: </label>
                        <select id="estado" name="estado" value={objeto[prop.producto].estado} onChange={(e) => handleChange(e)} style={{ border: 'none', color: 'gray'}}>
                          <option value="">-- Selecciona --</option>
                          <option value="Nuevo">Nuevo</option>
                          <option value="Usado">Usado</option>
                        </select>
                    </div>                  
                    <div id='Modo' style={{display: 'flex', flexDirection: 'row', backgroundColor: 'white', width: '290px', boxShadow: '4px 4px 10px 2px gray', height: '40px', borderRadius: '8px', marginTop: '10px', color: 'gray' }}>
                      <label htmlFor='opciones' style={{marginLeft: '10px', marginTop: '8px', marginRight: '84px'}}> Modo: </label>
                      <select id="opciones" name='conjunto' value={conjunto} onChange={(e) => handleConjunto(e)} style={{border: 'none', color: 'gray'}}>
                        <option value="">-- Selecciona --</option>
                        <option value="Individual">Individual</option>
                        <option value="Conjunto">Conjunto</option>
                      </select>                  
                    </div>

                    <div style={{backgroundColor: 'white', width: '290px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
                    <label style={{marginRight: '60px', marginTop: '10px', marginLeft: '10px'}}>
                      Cantidad:
                    </label>
                    <input type="number" value={cantidad} onChange={(e) => setCantidad(e.target.value)} style={{ width: '140px', border: 'none'}}/>
                    <br />
                  </div>

                    <div style={{display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center'}}>
                      <Button variant="outlined" type="button" onClick={handleAddToObject} style={{width: '200px', backgroundColor: 'white', color: 'black', border: 'none', boxShadow: '4px 4px 10px 2px gray',marginTop: '30px'}}> Armar producto </Button>
                      <Button variant="outlined" type="submit" style={{marginBottom: '20px', width: '100px', backgroundColor: 'white', color: 'black', border: 'none', boxShadow: '4px 4px 10px 2px gray'}}>Enviar</Button>
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
                              >Ficha: {localArray[0].ficha !== "" && localArray[0].ficha} 
                              </ListGroup.Item>
                              <ListGroup.Item                
                              style={{
                                marginTop: '10px',
                                color: 'gray'
                              }}
                              >Inalambrico: {localArray[0].inalambrico !== "" && localArray[0].inalambrico} 
                              </ListGroup.Item>
                              <ListGroup.Item                
                              style={{
                                marginTop: '10px',
                                color: 'gray'
                              }}
                              >Color: {localArray[0].color !== "" && localArray[0].color} 
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
                              <ListGroup.Item                
                              style={{
                                marginTop: '10px',
                                color: 'gray'
                              }}
                              >Cantidad: {cantidad !== "" && cantidad} 
                              </ListGroup.Item>

                          </Card.Body>
                          </Card>
                      </Col>
                      )
                  }
                  
                </form>
              </div>
          )
  } else if (prop.producto === 'Cables') {
    // return (
    //   <div style={{position: 'static'}}>
    //         <form onSubmit={handleSubmit} style={{display: 'flex',flexDirection: 'column', width: '800px', height: 'fit-content', marginBottom: '20px', transition: '1s ease'}}>
    //           <div id='Marca' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop:'84px', borderRadius: '8px', color: 'gray'}}>
    //             <label 
    //               style={{marginRight: '79px', marginTop: '10px', marginLeft: '10px'}}
    //             > Marca:
    //             </label>
    //             <input name='marca' id='Marca' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
    //             <br />
    //           </div>
    //           <div id='Modelo' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
    //             <label 
    //               style={{marginRight: '70px', marginTop: '10px', marginLeft: '10px'}}
    //             > Modelo:
    //             </label>
    //             <input name='modelo' id='Modelo' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
    //             <br />
    //           </div>
    //           <div id='Ficha' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
    //             <label 
    //               style={{marginRight: '87px', marginTop: '10px', marginLeft: '10px'}}
    //             > Ficha:
    //             </label>
    //             <input name='ficha' id='Ficha' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
    //             <br />
    //           </div>
    //           <div id='Largo' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
    //             <label 
    //               style={{marginRight: '87px', marginTop: '10px', marginLeft: '10px'}}
    //             > Largo:
    //             </label>
    //             <input name='largo' id='Largo' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
    //             <br />
    //           </div>
    //           <div id='Color' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
    //             <label style={{marginRight: '86px', marginTop: '10px', marginLeft: '10px'}}>
    //               Color:
    //             </label>
    //               <input name='color' id='Color' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
    //             <br />
    //           </div>
    //           <div id='Precio' style={{backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
    //             <label style={{marginRight: '78px', marginTop: '10px', marginLeft: '10px'}}>
    //               Precio:
    //             </label>
    //               <input name='precio' id='Precio' type="text" onChange={(e) => handleChange(e)} style={{ width: '400px', border: 'none', borderRadius: '6px'}}/>
    //             <br />
    //           </div>
    //           <div id='Informacion' style={{display: 'flex',flexDirection: 'row' ,backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '200px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
    //           <label style={{marginRight: '20px', marginTop: '10px', marginLeft: '10px'}}>
    //             Informacion:
    //           </label>
    //             <textarea id="Informacion" name="informacion" rows="4" cols="50" onChange={(e) => handleChange(e)} style={{ width: '400px',border: 'none', borderRadius: '6px', margin: '10px', zIndex: '999'}}/>
    //           <br />
    //         </div>
    //           <div id='Imagenes' style={{display: 'flex', flexDirection: 'row',backgroundColor: 'white', width: '550px', boxShadow: '4px 4px 10px 2px gray', height: '60px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
    //             <label style={{marginTop: '17px', marginLeft: '10px', marginRight: '40px',}}>
    //               Imagenes :
    //             </label>
    //             <input style={{marginTop: '14px'}} type="file" onChange={e => handleImagenChange(e)} accept="image/*" multiple />
    //             <br />
    //           </div>
    //           <div id='Estado' style={{display: 'flex', flexDirection: 'row', backgroundColor: 'white', width: '290px', boxShadow: '4px 4px 10px 2px gray', height: '40px', borderRadius: '8px', marginTop: '10px', color: 'gray'}}>
    //             <label style={{marginRight: '76px', marginTop: '8px', marginLeft: '10px'}} htmlFor='estado'> Estado: </label>
    //               <select id="estado" name="estado"  onChange={(e) => handleChange(e)} style={{ border: 'none', color: 'gray'}}>
    //                 <option value="">-- Selecciona --</option>
    //                 <option value="Nuevo">Nuevo</option>
    //                 <option value="Usado">Usado</option>
    //               </select>
    //           </div>                  
    //           <div id='Modo' style={{display: 'flex', flexDirection: 'row', backgroundColor: 'white', width: '290px', boxShadow: '4px 4px 10px 2px gray', height: '40px', borderRadius: '8px', marginTop: '10px', color: 'gray' }}>
    //             <label htmlFor='opciones' style={{marginLeft: '10px', marginTop: '8px', marginRight: '84px'}}> Modo: </label>
    //             <select id="opciones" name='conjunto' onChange={(e) => handleConjunto(e)} style={{border: 'none', color: 'gray'}}>
    //               <option value="">-- Selecciona --</option>
    //               <option value="Individual">Individual</option>
    //               <option value="Conjunto">Conjunto</option>
    //             </select>                  
    //           </div>

    //           <div style={{backgroundColor: 'white', width: '290px', boxShadow: '4px 4px 10px 2px gray', height: '40px', marginTop: '10px', borderRadius: '8px', color: 'gray'}}>
    //           <label style={{marginRight: '60px', marginTop: '10px', marginLeft: '10px'}}>
    //             Cantidad:
    //           </label>
    //           <input type="number" onChange={(e) => setCantidad(e.target.value)} style={{ width: '140px', border: 'none'}}/>
    //           <br />
    //         </div>

    //           <div style={{display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center'}}>
    //             <Button variant="outlined" type="button" onClick={handleAddToObject} style={{width: '200px', backgroundColor: 'white', color: 'black', border: 'none', boxShadow: '4px 4px 10px 2px gray',marginTop: '30px'}}> Armar producto </Button>
    //             <Button variant="outlined" type="submit" onClick={clearForm} style={{marginBottom: '20px', width: '100px', backgroundColor: 'white', color: 'black', border: 'none', boxShadow: '4px 4px 10px 2px gray'}}>Enviar</Button>
    //           </div>
      
              
    //           <Col md={4}  key={0}>
    //                       <Card 
    //                       style={{
    //                         position: 'absolute',
    //                         bottom: '0',
    //                         marginBottom: conjunto === 'Individual' ? '10px' : '26px',
    //                         right: '0',
    //                         border: 'none',
    //                         boxShadow: '4px 4px 10px 2px gray',
    //                         marginRight: '30px',
    //                         width: '280px',
    //                         padding: '10px',
    //                       }}
    //                       bg='light'>
    //                         <p style={{display: 'flex', justifyContent: 'center', alignItems: 'center',fontSize: '20px', marginTop: '10px', boxShadow: '4px 4px 10px 2px gray', width: '200px',height:'40px', margin: '0 auto', backgroundColor: 'pink', borderRadius: '10px', marginBottom: '30px'}}>Producto Modelo</p>
    //                         {
    //                           imagenesModelo.length > 1 ? (
    //                             <Carousel 
    //                             fade
    //                             style={{
    //                               maxHeight: '300px',
    //                               margin: '0 auto',
    //                               marginTop: '0.7vh',
    //                               height: 'fit-content',
    //                               width: 'fit-content',
    //                               borderRadius: '3%',
    //                               transition: '1s ease',
    //                             }} 
    //                             >
    //                               {
    //                                 imagenesModelo.map((image, index) => {
    //                                   return (                                      
    //                                       <Carousel.Item key={index}>
    //                                         {
    //                                           <img key={index} src={image} alt={`${image}+${index}`} style={{ maxWidth: '100%', marginRight: '10px', maxHeight: '200px' }} />
    //                                         }
    //                                       </Carousel.Item>  
    //                                   )
    //                                 })
    //                               }                          
                            
    //                             </Carousel>
    //                           ) : (
    //                             <div>
    //                               {
    //                               imagenesModelo.map((image,index) => (
    //                                 <img key={index} src={image} alt={`${image}`+`${index}`} style={{ maxWidth: '100%', marginRight: '10px' }}/>
    //                                 ))
    //                               }
    //                             </div>                              
    //                           )
    //                         }
    //                         <hr/>
  
    //                           <Card.Body 
    //                               style={{  
    //                               display: 'flex',
    //                               flexDirection: 'column',
    //                               }}>
    //                                 <p style={{margin: '0 auto', textDecoration: 'underline 2px', fontSize: '20px'}}>{conjunto}</p>
    //                           <ListGroup.Item                
    //                           style={{
    //                             marginTop: '10px',
    //                             color: 'gray'
    //                             }}
    //                           >Marca: {objeto.marca !== "" && localArray[0].marca} 
    //                           </ListGroup.Item>
    //                           <ListGroup.Item                
    //                           style={{
    //                             marginTop: '10px',
    //                             color: 'gray'
    //                           }}
    //                           >Modelo: {objeto.modelo !== "" && localArray[0].modelo} 
    //                           </ListGroup.Item>
    //                           <ListGroup.Item                
    //                           style={{
    //                             marginTop: '10px',
    //                             color: 'gray'
    //                           }}
    //                           >Ficha: {objeto.ficha !== "" && localArray[0].ficha} 
    //                           </ListGroup.Item>
    //                           <ListGroup.Item                
    //                           style={{
    //                             marginTop: '10px',
    //                             color: 'gray'
    //                           }}
    //                           >Largo: {objeto.largo !== "" && localArray[0].Largo} 
    //                           </ListGroup.Item>
    //                           <ListGroup.Item                
    //                           style={{
    //                             marginTop: '10px',
    //                             color: 'gray'
    //                           }}
    //                           >Color: {objeto.color !== "" && localArray[0].color} 
    //                           </ListGroup.Item>
    //                           <ListGroup.Item                
    //                           style={{
    //                             marginTop: '10px',
    //                             color: 'gray'
    //                           }}
    //                           >Precio: {objeto.precio !== "" && localArray[0].precio} 
    //                           </ListGroup.Item>
  
    //                           <ListGroup.Item                
    //                           style={{
    //                             marginTop: '10px',
    //                             color: 'gray'
    //                             }}
    //                           >Estado: {objeto.estado !== "" && localArray[0].estado} 
    //                           </ListGroup.Item>
    //                             {
    //                               conjunto === 'Conjunto' && (
    //                                 <ListGroup.Item                
    //                                 style={{
    //                                   marginTop: '10px',
    //                                   color: 'gray'
    //                                 }}
    //                                 >Cantidad: {cantidad !== "" && cantidad} 
    //                                 </ListGroup.Item>
                                    
    //                               )
    //                             }
    //                       </Card.Body>
    //                       </Card>
    //                   </Col>
            
    //       </form>
    //     </div>
    // )
  }
}

export default Formularios;

