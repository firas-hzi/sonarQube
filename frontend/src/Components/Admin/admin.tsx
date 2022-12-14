import React, {useEffect, useState} from 'react';
import  { useDispatch, useSelector } from 'react-redux'
import { Category, Product } from '../../Types/Product';
import { DispatchType, RootState } from '../../Redux/Store';
import { addProduct, allProducts, deleteProduct, updateProduct } from '../../Redux/Slices/AdminSlice';
import "./Admin.css"
import { AdminProductCard } from './AdminCard';


export const Admin: React.FC = () => {
   
    const products = JSON.parse(localStorage.getItem("products")|| '{}');
    const productState = useSelector((state:RootState) => state.product); 
    const dispatch:DispatchType = useDispatch();

    const cat: Category={
        productCategoryId: 0,
        category: ''
    }
    
    useEffect(()=>{
      dispatch(allProducts());
        }, []);

    const [newProduct, setNewProduct] = useState<Product>({
        id: 0,
            title: '',
            price: 0,
            quantity: 0,
            description: '',
            category: cat
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value
        });
    }

    //Create a product
    const handleClick = () => {


        const product:Product = {
            id: newProduct.id,
            title: newProduct.title,
            price: newProduct.price,
            quantity: newProduct.quantity,
            description: newProduct.description,
            category: newProduct.category
        };
        console.log(product);
        dispatch(addProduct(product)).then(()=>{
            dispatch(allProducts());
            clearAllInputs();
        });
    }

    const handleAllProducts = (categoryId:number)=> {
    dispatch(allProducts());
    }

    const handleUpdate = () => {
        const product:Product = {
            id: newProduct.id,
            title: newProduct.title,
            price: newProduct.price,
            quantity: newProduct.quantity,
            description: newProduct.description,
            category: newProduct.category
        };
        console.log(product);
        dispatch(updateProduct(product)).then(()=>{
            dispatch(allProducts());
        });
    }

    const handleDelete = () => {
        const product:Product = {
            id: newProduct.id,
            title: newProduct.title,
            price: newProduct.price,
            quantity: newProduct.quantity,
            description: newProduct.description,
            category: newProduct.category
        };
        dispatch(deleteProduct(product)).then(()=>{
            dispatch(allProducts());
            clearAllInputs();
        });
    }
 const  clearAllInputs = ()=>{
    var elements = document.getElementsByTagName("input");
for (var ii=0; ii < elements.length; ii++) {
  if (elements[ii].type == "text") {
    elements[ii].value = "";
  }
}
}

    return(
        <>
        <br/><br/><br/>
                <div className="adminRoot">
            
            <div className="generalContainer">
            <div className="adminForm">
            <h1>title</h1>
            <input name="title" type="text" required onChange={handleChange}/></div>
            <div className="adminForm">
            <h1>price</h1>
            <input name="price" type="text" required onChange={handleChange}/> </div>
            <div className="adminForm">
            <h1>image</h1>
            <input name="image" onChange={handleChange}/></div>
            <div className="adminForm">
            <h1>quantity</h1>
            <input name="quantity" onChange={handleChange}/></div>
            <div className="adminForm">
            <h1>description</h1>
            <input name="description" type="textarea" onChange={handleChange}/></div>
            <div className="adminForm">
            <h1>category</h1>
            <input name="category" onChange={handleChange}/></div>
            <button onClick={handleClick}>Create Product</button>
        </div>

        <div className="addressContainer">
                <div className="adminForm">
                <h1>id</h1>
                <input name="id" required onChange={handleChange}/></div>
                <div className="adminForm">
                <h1>title</h1>
                <input name="title" type="text" required onChange={handleChange}/></div>
                <div className="adminForm">
                <h1>price</h1>
                <input name="price" type="text" required onChange={handleChange}/> </div>
                <div className="adminForm">
                <h1>image</h1>
                <input name="image" onChange={handleChange}/></div>
                <div className="adminForm">
                <h1>quantity</h1>
                <input name="quantity" onChange={handleChange}/></div>
                <div className="adminForm">
                <h1>description</h1>
                <input name="description" type="textarea" onChange={handleChange}/></div>
                <div className="adminForm">
                <h1>category</h1>
                <input name="category" onChange={handleChange}/></div>
                <button onClick={handleClick}>Update Product</button>
            </div>

            <div className="addressContainer">
                <div className="adminDeleteContainer">
                <h1>id</h1>
                <input name="id" required onChange={handleChange}/>
                <button onClick={handleDelete}>Delete Product</button>
                </div>
            </div>
 </div>
        <div className="addressContainer">
        <h1 className="shoptitle">Product List</h1>
        {
            
            !products?
            products.map((product:Product) => {
                return <AdminProductCard key={product.id} id={product.id} price={product.price}
                title={product.title} description={product.description}
                quantity={product.quantity} image={''} category={product.category}                 />
            })
            :  productState.products.map((product:Product) => {
                return <AdminProductCard key={product.id} id={product.id} price={product.price}
                title={product.title} description={product.description}
                quantity={product.quantity} image={''} category={product.category}                 />
            })
        }   
        </div>
       
        
        </>
    )
    
}