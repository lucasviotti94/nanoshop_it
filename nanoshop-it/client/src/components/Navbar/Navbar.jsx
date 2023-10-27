import React, { useState, useEffect }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import { getModelosAll } from '../../redux/actions/actions';

import { Search, SearchIconWrapper, StyledInputBase } from './variables.js' 


import SearchIcon from '@mui/icons-material/Search';
import LogoNano from "../../images/NanoLogo.png"
import "./Navbar.css"


export default function NavBar () {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getModelosAll());
  }, [dispatch]);

  const modelosState = useSelector((state) => state.modelos);
  const menuLinks = ['Auriculares', 'iPhone', 'iPad', 'Mac', 'Watch']  
  console.log("MODELOS: ", modelosState)

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
              <div to={"/productos/accesorios"} className={'linksDown'} onMouseEnter={e => handleOnMouseEnter('Accesorios')} onMouseLeave={e => handleOnMouseLeave('Accesorios')} >Accesorios</div>
              <div className={dropDownAccesorios?'dropDown-menuOFF':'dropDown-menuON'}>
                <ul>
                  <div className="li">Adaptadores</div>
                  <div className="li">Cables</div>
                  <div className="li">Cargadores</div>
                  <div className="li">Fuentes</div>
                  <div className="li">Fundas</div>
                  <div className="li">Mallas</div>
                  <div className="li">Vidrios Templados</div>
                </ul>
              </div>
          </div>
        {
            menuLinks.map(link => {
              var variableModelos = []
              var dropDown = Boolean;
              if (link === 'Auriculares')  {
                  dropDown = dropDownAuriculares;
                  modelosState.Auriculares?.map(index => { return (variableModelos.push(index))})
              } else if (link === 'iPhone') {
                  dropDown = dropDownIphone
                  modelosState.Celulares?.map(index => { return (variableModelos.push(index))}) 
              } else if (link === 'iPad') {
                  dropDown = dropDownIpad
                  modelosState.Tablets?.map(index => { return (variableModelos.push(index))})
              } else if (link === 'Mac') {
                  dropDown = dropDownMac
                  modelosState.Computadoras?.map(index => { return (variableModelos.push(index))})
              } else {
                dropDown = dropDownWatch
                modelosState.Relojes?.map(index => { return (variableModelos.push(index))})
              }
              return (
                <div className='dropDown'>
                  <div to={"/productos/" + link.charAt(0).toUpperCase()} className={'linksDown'} onMouseEnter={e => handleOnMouseEnter(link)} onMouseLeave={e => handleOnMouseLeave(link)} >{link}</div>
                  <div className={dropDown?'dropDown-menuOFF':'dropDown-menuON'}>
                    <ul>
                      {
                        variableModelos?.map(modelo => {
                          return (
                            <li>
                              {modelo}
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
              )
            })
        }
      </div>
    </div>
    )
}