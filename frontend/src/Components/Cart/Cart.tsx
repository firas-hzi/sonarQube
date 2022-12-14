import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../Redux/Store';
import { Person } from '../../Types/Person';
import './Cart.css';
import { CartCard } from './CartCard';
import { getOrders, getTotalItemsCount, removeAllOrders, removeOrder } from '../../Redux/Slices/OrderSlice';
import { Order } from '../../Types/Order';
import { OrderCard } from './OrderCard';
import { Link, useNavigate } from 'react-router-dom';

export const Cart:React.FC = () => {

    const p:Person=  JSON.parse(localStorage.getItem("user")|| '');
    const dispatch:DispatchType= useDispatch();
    let navigate = useNavigate();
    const state = useSelector((state:RootState)=>state);
    console.log(p.address);

    const handleCancel = ()=>{
        navigate("/shop");
    };

    const handleCheckout = () => {
        navigate("/checkout");
    }
    
    useEffect(()=>{
        console.log("customer id is: "+p.customerId);
        dispatch({ type: 'REFRESH_PAGE' });
        dispatch(getOrders(p.customerId)).then(()=>{
            dispatch(getTotalItemsCount(p.customerId));
        });
        
        if(state.order.orders.length==0){
            dispatch(removeOrder(state.order.orders.length)).then(()=>{
                dispatch(getOrders(p.customerId));
        })}
    } , [dispatch]);

    //const orders=  JSON.parse(localStorage.getItem("orders")|| '{}');
   // console.log("all orders from cart page "+orders)
   const orders = useSelector((state:RootState) => state.order); 
   //console.log("order state orders "+orders.orders[0].product.description);

   let tprice = 0;

   let tquantity = 0;

    orders.orders.map((order:Order)=>{
       tquantity += (order.totalItem);
       return tquantity;
    })
   
    orders.orders.map((order:Order)=>{

        console.log("order inside map: " + order.product.quantity);
        tprice = tprice + (order.product.price * order.totalItem);
        return tprice;
    });
    
    console.log("total price: " + tprice);
    console.log("total quantity: " + tquantity);
    console.log(orders);

   return (

        <>
        <h1 className="cart-title">Shopping Cart</h1>     
        <div className="cart-container">
            <div className="left-col-container">
                <div className="product-container">
                {
                    orders.orders.map((order:Order)=>{
                    return <CartCard  key={order.orderId} id={order.orderId} 
                    title={order.product.title} price={order.product.price} 
                    quantity={order.product.quantity} description={order.product.description} />
                    })
                    }
                </div>
            </div>
            <div className="right-col-container">
                <div className="order-container">
                <h2>Order Details</h2>
                <OrderCard total_items={tquantity} total_price={tprice}  />
                <button className="checkout-option-span"  onClick={handleCheckout}>Checkout</button>
                <button className="checkout-option-span"  onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
        </>
    )
}
