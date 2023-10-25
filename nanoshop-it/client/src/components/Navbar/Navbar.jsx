import React, { useState, useEffect }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom"

// import SearchBar from '../SearchBar/SearchBar'
// import { arbolLinks as Menu } from './files';
import { getProductsAll } from '../../redux/actions/actions';

import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import LogoNano from "../../images/NanoLogo.png"
import "./Navbar.css"



export default function NavBar () {

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));
  //   const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getProductsAll());
  // }, [dispatch]);

  const productosState = useSelector((state) => state.productos);
  // console.log("soy el console log de la navbar", productosState)


  const [dropDownAuriculares, setDropDownAuriculares] = useState(true)    //estados para que funcionen los dropdowns con los eventos onMouseEnter y onMouseLeave (un hover basicamente)
  const [dropDownAccesorios, setDropDownAccesorios] = useState(true)
  const [dropDownIphone, setDropDownIphone] = useState(true)
  const [dropDownIpad, setDropDownIpad] = useState(true)
  const [dropDownMac, setDropDownMac] = useState(true)
  const [dropDownWatch, setDropDownWatch] = useState(true)

  const handleOnMouseEnter = (section) => {
    section === 'Auriculares' && setDropDownAuriculares(false)
    section === 'Accesorios' && setDropDownAccesorios(false)
    section === 'iPhone' && setDropDownIphone(false)
    section === 'iPad' && setDropDownIpad(false)
    section === 'Mac' && setDropDownMac(false)
    section === 'Watch'  && setDropDownWatch(false)
  }

  const handleOnMouseLeave = (section) => {
    section === 'Auriculares' && setDropDownAuriculares(true)
    section === 'Accesorios' && setDropDownAccesorios(true)
    section === 'iPhone' && setDropDownIphone(true)
    section === 'iPad' && setDropDownIpad(true)
    section === 'Mac' && setDropDownMac(true)
    section === 'Watch'  && setDropDownWatch(true)
  }
  return(
    <div className='navBar'>   
      <div className='upNavbar'>
        <Link className='divLogo' to="/">
          <img src={LogoNano} alt="LogoNano" className="Logo"/>
        </Link>
        <div className='uldivUp'>              
          <div className='ulU'>
            <Link to={"/"} className='linksUp'>Inicio</Link>
            <Link to={"/about"} className='linksUp'>Nosotros</Link>
            <Link to={"/contact"} className='linksUp'>Contacto</Link>
            <Link to={"/products"} className='linksUp'>Productos</Link>
          </div>
        </div>
        <div className='searchBarDiv'>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </div>
      </div>
      <div className='downNavbar'>
        <div className='dropDown'>
          <div to={"/productos/auriculares"} className={'linksDown'} onMouseEnter={e => handleOnMouseEnter('Auriculares')} onMouseLeave={e => handleOnMouseLeave('Auriculares')} >Auriculares</div>
          <div className={dropDownAuriculares?'dropDown-menuOFF':'dropDown-menuON'}>
            <div className="ul">
            </div>
          </div>
        </div>
        <div className="dropDown">
          <div to={"/productos/accesorios"} className={'linksDown'} onMouseEnter={e => handleOnMouseEnter('Accesorios')} onMouseLeave={e => handleOnMouseLeave('Accesorios')}>Accesorios</div>
          <div className={dropDownAccesorios?'dropDown-menuOFF':'dropDown-menuON'}>
            Contenido Interior
          </div>
        </div>
          <div className="dropDown">
            <div to={"/productos/celulares"} className={'linksDown'} onMouseEnter={e => handleOnMouseEnter('iPhone')} onMouseLeave={e => handleOnMouseLeave('iPhone')}>iPhone</div>
          <div className={dropDownIphone?'dropDown-menuOFF':'dropDown-menuON'}>
            Contenido Interior
          </div>
        </div>
        <div className="dropDown">
            <div to={"/productos/tablets"} className={'linksDown'} onMouseEnter={e => handleOnMouseEnter('iPad')} onMouseLeave={e => handleOnMouseLeave('iPad')}>iPad</div>
          <div className={dropDownIpad?'dropDown-menuOFF':'dropDown-menuON'}>
            Contenido Interior
          </div>
        </div>
          <div className="dropDown">
            <div to={"/productos/computadoras"} className={'linksDown'} onMouseEnter={e => handleOnMouseEnter('Mac')} onMouseLeave={e => handleOnMouseLeave('Mac')}>Mac</div>
            <div className={dropDownMac?'dropDown-menuOFF':'dropDown-menuON'}>
              Contenido Interior
            </div>
          </div>
          <div className="dropDown">
            <div to={"/productos/relojes"} className={'linksDown'} onMouseEnter={e => handleOnMouseEnter('Watch')} onMouseLeave={e => handleOnMouseLeave('Watch')}>Watch</div>
            <div className={dropDownWatch?'dropDown-menuOFF':'dropDown-menuON'}>
              Contenido Interior
            </div>
          </div>
      </div>
    </div>
  )
}