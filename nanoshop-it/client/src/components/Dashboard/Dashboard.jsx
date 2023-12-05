import { useState } from 'react';
import imagenLogo from '../../images/NanoShopPaint.png'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AgregarProductos from './AgregarProductos';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import imagenFondo from '../../images/Ciclon.jpg'
const Formulario = () => {

    const [tarea, setTarea] = useState('')
    const [hoveredAdd, setHoveredAdd] = useState(false);
    const [hoveredDelete, setHoveredDelete] = useState(false);
    // const [hoveredStadistics, setHoveredStadistics] = useState(false);
    
    const handleMouseEnter = (prop) => {
        prop === 'Add' && setHoveredAdd(true);    
        prop === 'Delete' && setHoveredDelete(true);    
    };                
    const handleMouseLeave = (prop) => {
        prop === 'Add' && setHoveredAdd(false);
        prop === 'Delete' && setHoveredDelete(false);
    };

    const handleSetTarea = (prop) => {
        prop === 'Add' && setTarea('AgregarProductos')
        prop === 'Delete' && setTarea('EliminarProductos')
    }
    const handleResetTarea = () => {
        setTarea('')
    }

  return (
    <div style={{
        height: '100', 
        backgroundColor: 'white'
    }}>
        <div style={{
            display: 'flex', 
            flexDirection: 'column', 
            backgroundColor: 'pink ',
            boxShadow: '4px 4px 0px 4px black',
            width: '70px', 
            height: '100%', 
            position: 'absolute',
            top: '0'
            }}>
            <img onClick={handleResetTarea} src={imagenLogo} style={{margin: '0.8vh', marginTop: '4vh',marginBottom: '4vh', marginRight: '15%', cursor: 'pointer'}}></img>
            
             <div 
                style={{
                    margin:'0 auto',
                    scale: hoveredAdd === false ? '1' : '1.2',
                    transition: '1s ease',
                    cursor: 'pointer',
                }}
                onMouseEnter={() => handleMouseEnter('Add')}
                onMouseLeave={() => handleMouseLeave('Add')}
                onClick={() => handleSetTarea('Add')}
                ><AddCircleOutlineIcon/></div>
            <div
                style={{
                    margin:'0 auto',
                    marginTop: '2vh',
                    scale: hoveredDelete === false ? '1' : '1.2',
                    transition: '1s ease',
                    cursor: 'pointer'
                }}
                onMouseEnter={() => handleMouseEnter ('Delete')}
                onMouseLeave={() => handleMouseLeave ('Delete')}
                onClick={() => handleSetTarea('Delete')}
            >
                <HighlightOffIcon/>
            </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center'}}>
            {
                tarea === 'AgregarProductos' && <AgregarProductos/>
            }
        </div>
    </div>
  );
};

export default Formulario;

