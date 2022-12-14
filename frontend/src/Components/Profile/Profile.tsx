import React, { useEffect, useState } from 'react';

import { Person, Address, Theme } from '../../Types/Person';
import { DispatchType, RootState } from '../../Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import "./Profile.css"
import { updateProfile } from '../../Redux/Slices/PersonSlice';


export const Profile:React.FC = () => {

    const dispatch:DispatchType = useDispatch();
    
    const p:Person=  JSON.parse(localStorage.getItem("user")|| '');
    const userState = useSelector((state:RootState) => state.auth);

    const [newAddress, setNewAddress] = useState<Address>({
        address_id: p.address?.address_id?p.address.address_id:1,
        city:p.address?.city? p.address.city:'',
        street: p.address?.street? p.address.street:'',
        state: p.address?.state? p.address.state:'',
        zip:p.address?.zip? p.address.zip:0,

    });



    const [newPerson, setNewPerson] = useState<Person>({
        customerId: p.customerId,
        name: p.name,
        email: p.email,
        password: p.password,
        phone: p.phone,
        image: p.image,
        theme: p.theme,
        role: p.role,
        orders: p.orders,
        address: p.address
    });

    

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewPerson({
            ...newPerson,
            [e.target.name]: e.target.value
        });
    }
    const handleAddressChange=(e: { target: { name: any; value: any; }; })=>{
        setNewAddress({
            ...newAddress,
            [e.target.name]: e.target.value,
          
        });
    }

    const handleUpdate = () => {
        const person:Person = {
            customerId: newPerson.customerId,
            name: newPerson.name,
            email: newPerson.email,
            password: newPerson.password,
            phone: newPerson.phone,
            image: newPerson.image,
            theme: p.theme,
            role: p.role,
            orders: p.orders,
            address: newAddress
        };

        dispatch(updateProfile(person));
    }

    const initialState = {
        receipts:[]
    };

    return (
        <div className='ProfileRoot'>
            
            <div className="profileContainer">
            <h1>Gerneral Information</h1>

                <div className='profileForm'>
                <p>Name</p>
                <input name="name" placeholder={`${p.name}`} type="text" onChange={handleChange}/></div>
                <div className='profileForm'>
                <p>Email</p>
                <input name="email" placeholder={`${p.email}`}type="text" onChange={handleChange}/></div>
                <div className='profileForm'>
                <p>Password</p>
                <input name="password" placeholder={`${p.password}`}type="password" onChange={handleChange}/>
                </div>
                <div className='profileForm'>
                <p>Phone</p>
                <input name="phone" placeholder={`${p.phone}`} type="text" onChange={handleChange}/></div>
                <h1>Address Information</h1>

<div className='profileForm'>
<p>Street</p>
<input name="street" placeholder={`${p.address?.street}`} type="text" onChange={handleAddressChange}/></div>
<div className='profileForm'>
<p>City</p>
<input name="city" placeholder={`${p.address?.city}`}type="text" onChange={handleAddressChange}/></div>
<div className='profileForm'>
<p>State</p>
<input name="state" placeholder={`${p.address?.state}`}type="text" onChange={handleAddressChange}/>
</div>
<div className='profileForm'>
<p>Zip Code</p>
<input name="zip" placeholder={`${p.address?.zip}`} type="text" onChange={handleAddressChange}/>
</div>
<button onClick={handleUpdate}>Save</button>
</div>
</div>

)
/*

async function getReceipts() {
try {





const ReceiptCard: React.FC<Receipt> = ({ items, userId, receiptNumber: receiptId, dateTime: date, total }) => {

const totalPrice = (items: Items[]) => {
let total = 0;
for (let i: number = 0; i < items.length; i++) {
total += items[i].amount * items[i].price;
console.log(total)
}
return total;
}

return (
<div>
<h1>Receipt ID: {receiptId}</h1>
<h1>{date}</h1>
<body>
{
    items.map((item, index) => {
        return (
            <li key={index} >{item.amount} x {item.name}</li>
        )
    })
}
</body>
<h2>
Total Price: ${total}
</h2>
</div>
)
}

export default ReceiptCard




export const ViewReceipts:React.FC = () => {

const [receipts, setReceipts] = useState<Order[]>([]);
const [userId, setUserId] = useState<number>(7);
const [role, setRole] = useState<string>("customer");

useEffect(() => {

axios.get(`http://localhost:8500/receipts/?id=${localStorage.getItem("userId")}`)
.then(response => setReceipts(response.data));

}, []);

return (
<div>
<h1>Receipts</h1>
{ 
receipts.map((receipt) => {
    receiptId={receipt.receiptId}
    person={receipt.person}
    product={receipt.product}
    registeredAt={receipt.registeredAt}
    totalPrice={receipt.totalPrice}
    totalItem={receipt.totalItem}
    OrderStatus={receipt.OrderStatus}
    paymentType={receipt.paymentType}

})
}
</div>
);


}

*/
}
