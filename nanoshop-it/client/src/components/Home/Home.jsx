import React, { useEffect } from 'react';
// import { getProductsAll } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

import "./Home.css";
import { getProductsAll } from '../../redux/actions/actions';

export default function Home() {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsAll());
    }, [dispatch]);
    
    const allProductsStore = useSelector((state) => state.productos);  

    console.log(allProductsStore)
    return (
        <div className='home'>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>
            <p>a</p>

        </div>

        );
    }

