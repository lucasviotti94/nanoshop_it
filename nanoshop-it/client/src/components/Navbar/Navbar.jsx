import * as React from 'react';
import { Link } from "react-router-dom"
// import SearchBar from '../SearchBar/SearchBar'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import "./Navbar.css"
import LogoNano from "../../images/NanoLogo.png"


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
        <div className='ulDivDown'>
            <Link to={"/productos/auriculares"} className='linksDown'>Auriculares</Link>
            <Link to={"/productos/accesorios"} className='linksDown'>Accesorios</Link>
            <Link to={"/productos/celulares"} className='linksDown'>iPhone</Link>
            <Link to={"/productos/tablets"} className='linksDown'>iPad</Link>
            <Link to={"/productos/computadoras"} className='linksDown'>Mac</Link>
            <Link to={"/productos/relojes"} className='linksDown'>Watch</Link>
        </div>
      </div>
    </div>
  )
}