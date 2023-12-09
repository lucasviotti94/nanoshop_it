import { useState } from "react"
import Formularios from './Formularios';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import CableIcon from '@mui/icons-material/Cable';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LaptopWindowsIcon from '@mui/icons-material/LaptopWindows';
import WatchIcon from '@mui/icons-material/Watch';
import TabletMacIcon from '@mui/icons-material/TabletMac';
import PhonelinkLockIcon from '@mui/icons-material/PhonelinkLock';



const AgregarProductos = () => {

    const [ producto, setProducto ] = useState("Adaptadores")
    const [ html, setHtml ] = useState(0)

    const handleTransitionMainDiv = () => {
        setTimeout(() => {
            setHtml(1)
        }, 500);
    }
    handleTransitionMainDiv()

   
    const handleProducto = (prop) => {
        setProducto(prop)
    }

    
    return  (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transition: '2s ease', opacity: html}}>        
            <div 
                style={{
                    position: 'inherit',
                    marginBottom: '4vh', 
                    marginTop: '4vh', 
                    boxShadow: '4px 4px 10px 2px gray', 
                    width: '280px', 
                    border: 'none',
                    height: '35px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '20px',
                    borderRadius: '1vh',
                    color: 'black',
                    backgroundColor: 'pink',
                    letterSpacing: '3   px'
                }}> Agregar Productos 
            </div>
            <div 
                style={{ 
                    backgroundColor: 'pink',
                    borderRadius: '1vh', 
                    border: 'none',
                    boxShadow: '4px 4px 10px 2px gray',
                    position: 'relative',
                    width: '1000px',
                    marginBottom: '4vh'
                    }}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center ', flexDirection: 'column'}}> 
                    <hr/>

                    <label htmlFor='opciones' 
                        style={{ 
                            display: 'flex', 
                            position: 'absolute', 
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            border: 'none',
                            top: '0',
                            color: 'black',
                            marginTop: '50px', 
                            fontSize: '30px',
                            borderRadius: '10px',
                            // textDecoration: 'underline',
                            boxShadow: '4px 4px 10px 2px gray',
                            width: '220px',
                            letterSpacing: '4px'
                            }}> Formulario
                    </label>
                    
                    <ButtonGroup aria-label="Basic example" style={{boxShadow: '4px 4px 2px 1px gray', marginTop: '100px'}}>
                        <Button title='Adaptadores' id='Adaptadores' style={{color: producto === 'Adaptadores' ? 'pink' : 'gray', backgroundColor: 'white', border: 'none'}} variant="secondary" onClick={() => handleProducto('Adaptadores')}><SettingsInputHdmiIcon/></Button>
                        <Button title='Auriculares' id='Auriculares' style={{color: producto === 'Auriculares' ? 'pink' : 'gray', backgroundColor: 'white', border: 'none'}} variant="secondary" onClick={() => handleProducto('Auriculares')}><HeadphonesIcon/></Button>
                        <Button title='Cables' id='Cables' style={{color: producto === 'Cables' ? 'pink' : 'gray', backgroundColor: 'white', border: 'none'}} variant="secondary" onClick={() => handleProducto('Cables')} ><CableIcon/></Button>
                        <Button title='Cargadores' id='Cargadores' style={{color: producto === 'Cargadores' ? 'pink' : 'gray', backgroundColor: 'white', border: 'none'}} variant="secondary" onClick={() => handleProducto('Cargadores')} ><ElectricalServicesIcon/></Button>
                        <Button title='Celulares' id='Celulares' style={{color: producto === 'Celulares' ? 'pink' : 'gray', backgroundColor: 'white', border: 'none'}} variant="secondary" onClick={() => handleProducto('Celulares')} ><PhoneAndroidIcon/></Button>
                        <Button title='Computadoras' id='Computadoras' style={{color: producto === 'Computadoras' ? 'pink' : 'gray', backgroundColor: 'white', border: 'none'}} variant="secondary" onClick={() => handleProducto('Computadoras')} ><LaptopWindowsIcon/></Button>
                        <Button title='Relojes' id='Relojes' style={{color: producto === 'Relojes' ? 'pink' : 'gray', backgroundColor: 'white', border: 'none'}} variant="secondary" onClick={() => handleProducto('Relojes')} ><WatchIcon/></Button>
                        <Button title='Tablets' id='Tablets' style={{color: producto === 'Tablets' ? 'pink' : 'gray', backgroundColor: 'white', border: 'none'}} variant="secondary" onClick={() => handleProducto('Tablets')} ><TabletMacIcon/></Button>
                        <Button title='Vidrios_Protectores' id='Vidrios_Protectores' style={{color: producto === 'Vidrios_Protectores' ? 'pink' : 'gray', backgroundColor: 'white', border: 'none'}} variant="secondary" onClick={() => handleProducto('Vidrios_Protectores')} ><PhonelinkLockIcon/></Button>
                        <Button title='Ya dice Fuente ahi wachin que mas info queres' id='Fuentes' style={{color: producto === 'Fuentes' ? 'pink' : 'gray', backgroundColor: 'white', border: 'none'}} variant="secondary" onClick={() => handleProducto('Fuentes')} >Fuente</Button>
                        <Button title='Enserio te fijaste aca tambien?' id='Fundas' style={{color: producto === 'Fundas' ? 'pink' : 'gray', backgroundColor: 'white', border: 'none'}} variant="secondary" onClick={() => handleProducto('Fundas')} >Funda</Button>
                        <Button title='Fua k pesa2' id='Mallas' style={{color: producto === 'Mallas' ? 'pink' : 'gray', backgroundColor: 'white', border: 'none'}} variant="secondary" onClick={() => handleProducto('Mallas')} >Malla</Button>
                    </ButtonGroup>
                    <Formularios producto={producto} />
                </div>


            </div>
        </div>
    )
}



export default AgregarProductos;