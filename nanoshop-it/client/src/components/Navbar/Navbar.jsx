import React, { useState, useEffect }from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import { getModelosAll } from '../../redux/actions/actions';

import { Search, SearchIconWrapper, StyledInputBase } from './variables.js'
import Burguer from './Burguer.jsx';

import SearchIcon from '@mui/icons-material/Search';
import LogoNano from "../../images/NanoLogo.png";
import "./Navbar.css"


export default function NavBar () {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getModelosAll());
  }, [dispatch]);

  const modelosState = useSelector((state) => state.modelos);
  const menuLinks = ['Auriculares', 'iPhone', 'iPad', 'Mac', 'Watch']

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
            <Link to={"/nosotros"} className='linksUp'>Nosotros</Link>
            <Link to={"/contacto"} className='linksUp'>Contacto</Link>
            <Link to={"/productos"} className='linksUp'>Productos</Link>
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
        <Burguer {...modelosState}/>
        <div className='dropDown' onMouseEnter={e => handleOnMouseEnter('Accesorios')} onMouseLeave={e => handleOnMouseLeave('Accesorios')}>
              <div to={"/productos/accesorios"} className={'linksDown'}>Accesorios</div>
              <div className={dropDownAccesorios?'dropDown-menuOFF':'dropDown-menuON'} onMouseLeave={(e) => handleOnMouseLeave('Accesorios')}>
                <ul className='ulLinks'>
                  <li> <a className='linksToProduct' href={'/productos/adaptadores'} >Adaptadores</a></li>
                  <li> <a className='linksToProduct' href={'/productos/cables'} >Cables</a></li>
                  <li> <a className='linksToProduct' href={'/productos/cargdores'} >Cargadores</a></li>
                  <li> <a className='linksToProduct' href={'/productos/fuentes'} >Fuentes</a></li>
                  <li> <a className='linksToProduct' href={'/productos/fundas'} >Fundas</a></li>
                  <li> <a className='linksToProduct' href={'/productos/mallas'} >Mallas</a></li>
                  <li> <a className='linksToProduct' href={'/productos/vidriosProtectores'} >Vidrios Templados</a></li>
                </ul>
              </div>
          </div>
        {
            menuLinks.map(link => {
              var variableModelos = []
              var dropDown = Boolean;
              if (link === 'Auriculares') {
                  dropDown = dropDownAuriculares;
                  modelosState.Auriculares?.map(model => { return (variableModelos.push(model))})
              } else if (link === 'iPhone') {
                  dropDown = dropDownIphone
                  modelosState.Celulares?.map(model => { return (variableModelos.push(model))})
              } else if (link === 'iPad') {
                  dropDown = dropDownIpad
                  modelosState.Tablets?.map(model => { return (variableModelos.push(model))})
              } else if (link === 'Mac') {
                  dropDown = dropDownMac
                  modelosState.Computadoras?.map(model => { return (variableModelos.push(model))})
              } else {
                dropDown = dropDownWatch
                modelosState.Relojes?.map(model => { return (variableModelos.push(model))})
              }
              return (
                <div className='dropDown' onMouseEnter={(e) => handleOnMouseEnter(link)} onMouseLeave={(e) => handleOnMouseLeave(link)}>
                  <Link to={"/productos/" + link } className={'linksDown'} >{link}</Link>
                  <div className={dropDown?'dropDown-menuOFF':'dropDown-menuON'} onMouseLeave={(e) => handleOnMouseLeave(link)}>
                    <ul className='ulLinks'>
                      {
                          variableModelos?.map(modelo => {
                            return (
                              <li>
                                <a className='linksToProduct' href={'/productos/' +  (link.charAt(0).toLocaleLowerCase() + link.slice(1)) + "/" + modelo}>
                                {modelo}
                                </a>
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