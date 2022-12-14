import './ProductCard.css';
import { Product } from '../../Types/Product';
import { useNavigate } from 'react-router-dom';
import { DispatchType, RootState } from '../../Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { OrderDetail } from '../../Types/OrderDetail';
import { createOrder, getOrders } from '../../Redux/Slices/OrderSlice';
import { Person } from '../../Types/Person';
import { getNotifications } from '../../Redux/Slices/NotificationSlice';
export const ProductCard:React.FC<Product> = ({id, price, title, description,quantity ,category}) => {
//console.log(`../../Assets/products/${id}.jpeg`);
let navigate = useNavigate();
const userState = useSelector((state:RootState) => state.auth);
const dispatch:DispatchType = useDispatch();
let stringPrice= '';
if(category?.productCategoryId===3 || category?.productCategoryId===2)
{
    stringPrice= `$${price} - 20% OFF -   $${price*85/100}`;
}
else stringPrice = `$${price}`;
useEffect(()=>{
    if(userState.isLoggedIn)navigate("/shop");
}, [])
const user = JSON.parse(localStorage.getItem("user")|| '{}');
//console.log(user);


const handleAddToCard = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
   const order:OrderDetail ={
       person_id: user.customerId,
       product_id: id,
       status_id: 1,
       payment_id: 1,
       total_price: price,
       total_items: 1,
   }   
    dispatch(createOrder(order)).then(()=>{
        dispatch(getOrders(userState.currentUser.customerId));
        dispatch(getNotifications(userState.currentUser.customerId))
    });
};
    return (
 <div className="card">
    {
        category?.productCategoryId===4? <i className="fa fa-star featuredProduct"></i>:<></>
    }
  <img className="product_image" src={require(`../../Assets/products/${id}.jpeg`)} />
  <h1>{title}</h1>
  <p className="prduct-price">{stringPrice}</p>
  {
        category?.productCategoryId!==2?  <p className="price">In stock {quantity} items</p>
        :<></>
    }
 
  <p>{description}</p>
  <p><button onClick={handleAddToCard}>Add to Cart</button></p>
</div>
       
    )
}