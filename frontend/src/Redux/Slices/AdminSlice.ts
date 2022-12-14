import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { Category, Product } from "../../Types/Product";
interface ProductState {
    currentProduct: Product;
}

interface AdminProductSliceState {
    products: Product[]
};


const initialState: AdminProductSliceState = {
    products: []
};

const cat :Category={
    productCategoryId: 0,
    category: ""
}

const p:Product={
    id: 0,
    title: "",
    price: 0,
    quantity: 0,
    description: "",
    category:cat
};

//const initialState:ProductState =  {  currentProduct: p };

export const addProduct = createAsyncThunk(
    'admin/addProduct',
    async(product:Product, thunkAPI) => {
        try{
            
            const res = await axios.post("http://localhost:8500/products/create", product);
            console.log(res.data);
            return {product:res.data};
        } catch(e) {
            return thunkAPI.rejectWithValue('Product Already Exist');
        }
    }
);
export const updateProduct = createAsyncThunk(
    'admin/updateProduct',
    async(product:Product, thunkAPI) => {
        try{
            
            const res = await axios.put("http://localhost:8500/products/update", product);
            console.log(res.data);
            return {product:res.data};
        } catch(e) {
            return thunkAPI.rejectWithValue('Product could not be updated');
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'admin/deleteProduct',
    async(product:Product, thunkAPI) => {
        try{
            
            const res = await axios.delete("http://localhost:8500/products/delete", { data: { id:product.id } });
            console.log(res.data);
            return {product:res.data};
        } catch(e) {
            return thunkAPI.rejectWithValue('Product could not be deleted');
        }
    }
);

export const allProducts = createAsyncThunk(
    'products/allProducts',
    async() => {
        try{      
            const res = await axios.get("http://localhost:8500/products/");
            return {products: res.data};
        } catch(e) {  
            return null;      
        }
    }
);

export const AdminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(addProduct.fulfilled, (state, action) => {      
          //  initialState.currentProduct = action.payload.product;
            localStorage.setItem('adminProducts', JSON.stringify(action.payload.product));
            return state;
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {      
            //  initialState.currentProduct = action.payload.product;
              localStorage.setItem('adminProducts', JSON.stringify(action.payload.product));
              return state;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {      
            //  initialState.currentProduct = action.payload.product;
              localStorage.setItem('adminProducts', JSON.stringify(action.payload.product));
              return state;
        });
        builder.addCase(allProducts.fulfilled, (state, action) => {
            state.products= action.payload?.products;
            localStorage.setItem('products', JSON.stringify(action.payload?.products));
            return state;
        });
        builder.addCase(allProducts.rejected, (state) => {
            state.products=[];
            return state
        });
      
    }
});
export default AdminSlice.reducer;