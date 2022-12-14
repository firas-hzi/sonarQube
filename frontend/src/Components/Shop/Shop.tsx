
import { ProductCard } from '../Product/ProductCard';
import image from '../../Assets/sale.png'
import './Shop.css'
import { DispatchType, RootState } from '../../Redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../Types/Product';
import { allProducts, productByCategory } from '../../Redux/Slices/ProductSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotifications } from '../../Redux/Slices/NotificationSlice';
import { getOrders } from '../../Redux/Slices/OrderSlice';
import { Person } from '../../Types/Person';

export const Shop:React.FC = () => {

    const person:Person= JSON.parse(localStorage.getItem("user")||'{}');
    const productState = useSelector((state:RootState) => state.product); 
    const products = JSON.parse(localStorage.getItem("products")|| '{}');
    const userState = useSelector((state:RootState) => state.auth); 
    const dispatch:DispatchType = useDispatch();
    let navigate = useNavigate();
   
    //console.log(JSON.parse(localStorage.getItem("products")|| '{}'));
    //console.log(productState.products);

    useEffect(()=>{
       // dispatch({ type: 'REFRESH_PAGE' });
        if(!userState.currentUser.customerId)navigate("/login");
         dispatch(getNotifications(userState.currentUser.customerId));
        dispatch(getOrders(userState.currentUser.customerId));
        if(!productState.products) dispatch(allProducts());
    }, [userState.isLoggedIn])
    
    const handleClick = (categoryId:number)=>
    {
        if(categoryId===1)
        dispatch(allProducts());
        else dispatch(productByCategory(categoryId))
    }

    return (
        <div>
            <img className='heroImage' src={image}></img>

       <div className= "container">

        <div className="category">
            <h1>Categories</h1>
            <button className='categoryBtn' name="all" onClick={()=>handleClick(1)}>All</button>
            <button className='categoryBtn' name= "sales"onClick={()=>handleClick(3)}>Sales</button>
            <button className='categoryBtn' name="deals" onClick={()=>handleClick(2)}>Deals</button>
            <button className='categoryBtn' name="featured" onClick={()=>handleClick(4)}>Featured</button>
           
        </div>
       
        <div className="productcard">
        <h1 className="shoptitle">Shop</h1>
        {
            !products?
                products.map((product:Product) => {
                    return <ProductCard key={product.id} id={product.id} price={product.price}
                    title={product.title} description={product.description}
                     quantity={product.quantity} image={''} category={product.category}                 />
                })
                :  productState.products.map((product:Product) => {
                    return <ProductCard key={product.id} id={product.id} price={product.price}
                    title={product.title} description={product.description}
                     quantity={product.quantity} image={''} category={product.category}                 />
                })
            }
                    
        </div>
        </div>
        </div>
    )
}