import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getConjuntosAll, getProductsAll } from '../../redux/actions/actions';
import Carrousel from '../Carousel/Carousel.jsx';
import CardsHome from '../Cards/CardsHome.jsx'

import "./Home.css";

export default function Home() {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsAll());
    }, [dispatch]);
    
    const conjuntosALL = useSelector((state) => state.productos);
    return (
        <div className='home'>
            <div className='hr1'></div>
            <Carrousel />
            <div className='titulo1Div'>
                <div className='hr2'>
                <div className="titulo1">DESTACADOS</div>
            </div>    
            </div>
            <CardsHome {...conjuntosALL}/>
        </div>

        );
    }

