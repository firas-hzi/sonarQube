import React, { useEffect, useState } from 'react';
import { Payment } from '../../Types/Payment';
import './PaymentCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../Redux/Store';
import { getTotalItemsCount, PType, updatePaymentType } from '../../Redux/Slices/OrderSlice';
import { Person } from '../../Types/Person';
import { Order } from '../../Types/Order';

export const PaymentCard:React.FC<Payment> = (payment) => {
    
    const state = useSelector((state:RootState) => state);
    const p:Person = JSON.parse(localStorage.getItem("user") || '');
    const dispatch:DispatchType = useDispatch();
    let [type, setType] = useState<number>(0);
    const payments = useSelector((state:RootState)=> state.payment)
    //const orders = JSON.parse(JSON.stringify(localStorage.getItem("orders")) ||'{}');
    let payType:number = 0;
    
    console.log("payment type from state"+ payments);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setType(parseInt(e.target.value));
        console.log("payment type: " + type) ;
     }

    let PType:PType = {
        customer_id:p.customerId,
        type:type
    }
    payments.payments.map((payment:Payment) => {
        payType = payment.paymentTypeId;
        console.log("all pay type in state: " + payType);
        return payType;
    })
    
    useEffect(()=>{
        dispatch(updatePaymentType(PType)).then(()=>{
            dispatch(getTotalItemsCount(p.customerId));
        });
    }, []);

    return (
        <>
        <div className="paymentcard-container">
            <div>
                <input type="checkbox" id={payment.type} name={payment.type} value={payment.paymentTypeId} 
                onChange={handleChange} checked={`${payType}` === `${payment.type}` ?  true : false }/>
                <span>{payment.type}</span>
                <br/><br/>
                <br />
            </div>
        </div>
        </> 
    )
}


