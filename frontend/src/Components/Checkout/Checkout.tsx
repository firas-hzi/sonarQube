import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../Redux/Store';
import './Checkout.css';
import { Order } from '../../Types/Order';
import { OrderCard } from '../Cart/OrderCard';
import { Payment } from '../../Types/Payment';
import { useNavigate } from 'react-router-dom'
import { getTotalItemsCount, PType, removeAllOrders, updatePaymentType } from '../../Redux/Slices/OrderSlice';
import { getPaymentTypes } from '../../Redux/Slices/PaymentSlice';
import { Person } from '../../Types/Person';

export const Checkout:React.FC = () => {
    
    const dispatch:DispatchType = useDispatch();
    const state = useSelector((state:RootState) => state);
    const orders = useSelector((state:RootState) => state.order); 
    const payments = useSelector((state:RootState)=> state.payment);
    const p:Person = JSON.parse(localStorage.getItem("user")|| '');
    let navigate = useNavigate();
    const [type, setType] = useState<number>(0);

    const handlePaymentType = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setType(parseInt(e.target.value));
    }

    let ptype:PType = {
        customer_id:p.customerId,
        type:type
    }

    const handlePurchase = ()=>{
        dispatch(updatePaymentType(ptype));
        //dispatch(removeAllOrders(p.customerId));
        navigate("/checkout-complete");
    };

    const handleCancel = ()=>{
            navigate("/shop");
    };

    useEffect(()=>{
        if(payments.payments.length===0){
            dispatch(getPaymentTypes()).then(()=>{
                dispatch(getTotalItemsCount(p.customerId));
            });
        }
    }, [dispatch, payments.payments.length]);

    let tprice = 0
    let tquantity = 0;

    orders.orders.map((order:Order)=>{
       tquantity += (order.totalItem);
       return tquantity;
    })

    orders.orders.map((order:Order)=>{

        console.log("order inside map: " + order.product.quantity);
        tprice = tprice + (order.product.price * order.totalItem);
        return tprice;});

    console.log("total price: " + tprice);
    console.log("total quantity: " + tquantity);
    console.log(payments);
    console.log("orders: " + state.order.orders);

    return (
        <>
        <h1 className="checkout-title">Checkout Page</h1>     
        <div className="checkout-container">
            <div className="left-col-container">
                <div className="payment-container">
                    <h2>Payment</h2>
                    <div>
                    {
                        payments.payments.map((payment:Payment)=>{
                            return(<>
                            <label>{payment.type}</label>
                            <input
                                type="radio"
                                name="option"
                                value={payment.paymentTypeId}
                                onChange={handlePaymentType}
                            /><br/><br/>
                            </>
                            )
                        })

                    }
                    
                    </div>
                </div>
                <div className="address-container">
                    <h2>Mailing/Shipping Address</h2>
                    <span>{p.address?.street}</span>
                    <span>{p.address?.city}</span>
                    <span>{p.address?.state}</span>
                    <span>{p.address?.zip}</span>
                </div>
            </div>
            <div className="right-col-container">
                <div className="order-container">
                    <h2>Order Details</h2>
                    <OrderCard total_items={tquantity} total_price={tprice} />
                    <button className="checkout-option-span"  onClick={handlePurchase}>Purchase Order!</button>
                    <button className="checkout-option-span"  onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        </div>
        </>
        
        
    )
}