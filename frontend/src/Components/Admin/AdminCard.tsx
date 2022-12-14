import { Product } from '../../Types/Product';
import { useNavigate } from 'react-router-dom';
import { DispatchType, RootState } from '../../Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { OrderDetail } from '../../Types/OrderDetail';
import { createOrder, getOrders } from '../../Redux/Slices/OrderSlice';
import { Person } from '../../Types/Person';

export const AdminProductCard:React.FC<Product> = ({id, price, title, description,quantity }) => {
//console.log(`../../Assets/products/${id}.jpeg`);
let navigate = useNavigate();
const userState = useSelector((state:RootState) => state.auth);
const dispatch:DispatchType = useDispatch();

const user = JSON.parse(localStorage.getItem("user")|| '{}');
//console.log(user);



    return (
 <div className="admincard">
  <img className="admin_image" src={require(`../../Assets/products/${id}.jpeg`)} />
  <h1>{id}</h1>
  <h1>{title}</h1>
  <p className="price">$ {price}</p>
  <p className="price">In stock {quantity} items</p>
  <p>{description}</p>
  
</div>
       
    )

}