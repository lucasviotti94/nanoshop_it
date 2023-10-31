import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';

import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
      ))(({ theme }) => ({
        border: `1px solid ${theme.palette.divider}`,
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          display: 'none',
        },
      }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
          expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
          {...props}
        />
      ))(({ theme }) => ({
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
        flexDirection: 'row-reverse',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
          transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
          marginLeft: theme.spacing(1),
        },
      }));
      
      const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        padding: theme.spacing(2),
        borderTop: '1px solid rgba(0, 0, 0, .125)',
      }));


export default function Burguer (props) {

    const menuLinks = ['Auriculares', 'iPhone', 'iPad', 'Mac', 'Watch']
    var counter = 1

    const [show, setShow] = useState(false);
    const handleShowNav = () => setShow(true);
    const handleCloseNav = () => setShow(false);
    const [expanded, setExpanded] = React.useState('');    


    const handleChange = (panel) => (event, newExpanded) => {       
      setExpanded(newExpanded ? panel : false);
    };

    return  (
        <div className='burguer'>
            <MenuIcon onClick={handleShowNav} style={{color: 'white'}}/>
            <Offcanvas show={show}  onHide={handleCloseNav} style={{ height: 'max-content', marginTop: '16vh', border: '2px solid black', boxShadow: ' 0 1px 2px 1px black'}}>
                <Accordion expanded={expanded === 'panel'+ counter.toString()} onChange={handleChange('panel'+ counter.toString())} style={{ backgroundColor: 'black', border: 'none'}}>
                    <AccordionSummary aria-controls={'panel'+ counter.toString()} id={'panel'+ counter.toString()} style={{ backgroundColor: 'white'}}>
                    <Typography style={{ color: 'black', fontWeight: '800'}}>Accesorios</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <div className='ulLinksOffCanvas'>
                        <Link className='linksToProduct' to={'/productos/adaptadores'} onClick={handleCloseNav} >Adaptadores</Link>
                        <Link className='linksToProduct' to={'/productos/cables'} onClick={handleCloseNav} >Cables</Link>
                        <Link className='linksToProduct' to={'/productos/cargadores'} onClick={handleCloseNav} >Cargadores</Link>
                        <Link className='linksToProduct' to={'/productos/fuentes'} onClick={handleCloseNav} >Fuentes</Link>
                        <Link className='linksToProduct' to={'/productos/fundas'} onClick={handleCloseNav} >Fundas</Link>
                        <Link className='linksToProduct' to={'/productos/mallas'} onClick={handleCloseNav} >Mallas</Link>
                        <Link className='linksToProduct' to={'/productos/vidriosProtectores'} onClick={handleCloseNav} >Vidrios Templados</Link>
                    </div>
                    </AccordionDetails>
                </Accordion>

                {
                    menuLinks?.map(link => {
                        counter += 1
                        var variableModelos = []
                        if (link === 'Auriculares') {
                            props.Auriculares?.map(model => { return (variableModelos.push(model))})
                        } else if (link === 'iPhone') {
                            props.Celulares?.map(model => { return (variableModelos.push(model))})
                        } else if (link === 'iPad') {
                            props.Tablets?.map(model => { return (variableModelos.push(model))})
                        } else if (link === 'Mac') {
                            props.Computadoras?.map(model => { return (variableModelos.push(model))})
                        } else {
                            props.Relojes?.map(model => { return (variableModelos.push(model))})
                        }
                        return (
                            <Accordion expanded={expanded === 'panel'+ counter.toString()} onChange={handleChange('panel'+ counter.toString())} style={{ backgroundColor: 'black', border: 'none'}}>
                                <AccordionSummary aria-controls={('panel'+ counter.toString()) + "d-content"} id={('panel'+ counter.toString()) + "d-header"} style={{ backgroundColor: 'white'}}>
                                <Typography style={{ color: 'black', fontWeight: '800'}}>{link}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <div className='ulLinksOffCanvas'>
                                
                                 {
                                  variableModelos?.map(modelo => {
                                    return (
                                      <li>
                                        <a className='linksToProduct' href={'/productos/auriculares/' + modelo} onClick={handleCloseNav} key={modelo} >
                                        {modelo}
                                        </a>
                                      </li>
                                    )
                                  })                                   
                                } 
                                </div>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </Offcanvas>
        </div>
    )
}
