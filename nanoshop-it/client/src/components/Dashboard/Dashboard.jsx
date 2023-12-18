import { useState } from 'react';
import imagenLogo from '../../images/NanoShopPaint.png'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AgregarProductos from './AgregarProductos';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import imagenFondo from '../../images/sanlorenzo6.jpg'

const Dashboard = () => {

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
            display: 'flex',
            backgroundImage: `url(${imagenFondo})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            position: 'relative',
            width: '100%',
            // height: 'fit-content',
            height: tarea === 'AgregarProductos' ? '160vh' : '100vh',
            minHeight: '100vh',
            justifyContent: 'center',
            transition: '2s ease'
        }}> 
            <div             
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '2px 2px 10px 1px #9999',
                    backdropFilter: 'blur(0.8rem)',
                    backgroundColor: 'rgba(255, 255, 255, 0.060)',
                    width: '70px',
                    height: '500px',
                    position: 'absolute',
                    marginLeft: '2%',
                    borderRadius: '5px',
                    marginTop: '7.2%',
                    top: '0',
                    left: '0'
                }}>
                <img title='Webito Jr <3' onClick={handleResetTarea} src={imagenLogo} style={{margin: '0.8vh', marginTop: '4vh',marginBottom: '4vh', marginRight: '15%', cursor: 'pointer'}}></img>
                
                <div 
                    title='Agregar Productos'
                    style={{
                        margin:'0 auto',
                        scale: hoveredAdd === false ? '1' : '1.2',
                        transition: '1s ease',
                        cursor: 'pointer',
                        color: hoveredAdd === false ? 'black' : 'white'
                    }}
                    onMouseEnter={() => handleMouseEnter('Add')}
                    onMouseLeave={() => handleMouseLeave('Add')}
                    onClick={() => handleSetTarea('Add')}
                    ><AddCircleOutlineIcon/></div>
                <div
                    title='Eliminar Productos'
                    style={{
                        margin:'0 auto',
                        marginTop: '2vh',
                        scale: hoveredDelete === false ? '1' : '1.2',
                        transition: '1s ease',
                        cursor: 'pointer',
                        color: hoveredDelete === false ? 'black' : 'white'

                    }}
                    onMouseEnter={() => handleMouseEnter ('Delete')}
                    onMouseLeave={() => handleMouseLeave ('Delete')}
                    onClick={() => handleSetTarea('Delete')}
                >
                    <HighlightOffIcon/>
                </div>
            </div>
            <div style={{
                display: 'flex', 
                 
                }}>
                {
                    tarea === 'AgregarProductos' && <AgregarProductos/>
                }
            </div>
        </div>
    
  );
};

export default Dashboard;

