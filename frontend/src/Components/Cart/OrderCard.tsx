
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DispatchType } from '../../Redux/Store';
import { OrderDetail } from '../../Types/OrderDetail';

export const OrderCard:React.FC<OrderDetail> = ({total_price, total_items}) => {
    const dispatch:DispatchType = useDispatch();
    const [newOrder, setOrder] = useState();
    const checkout = () => {
        // dispatch(checkoutOrder(order));
    }
    useEffect(()=>{
    }, [newOrder])

    let tpriceUSD;
    tpriceUSD = total_price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }); 
    
    return (

        <div>
            <h3>Total Item: {total_items}</h3>
            <h3>Total Price: {tpriceUSD}</h3>
        </div>

    )
}