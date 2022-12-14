import { createAsyncThunk, createSlice, isAsyncThunkAction, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Order } from '../../Types/Order';
import { OrderDetail } from "../../Types/OrderDetail";


export interface Equant {
    order_id:number;
    quantity:number;
    total_quantity?:number;
}

export interface PType {
    customer_id:number;
    type:number;
}

interface OrderSliceState {
    orders: Order[],

};

const initialState:OrderSliceState = {
    orders:[],
};

export const createOrder = createAsyncThunk(
    'orders/addToCard',
    async(order:OrderDetail, thunkAPI) => {
        try{

            const res = await axios.post("http://localhost:8500/orders/addTocart", order);

            return {orders :res.data};

        } catch(e) {
            return thunkAPI.rejectWithValue('Item Already Exist');
        }
    }
);


export const getOrders = createAsyncThunk(
    'orders/getAllOrders',
    async(customerId:number) => {
        try{      
            const res = await axios.get(`http://localhost:8500/orders/${customerId}`);
            console.log(res.data);
            return {orders: res.data};

        } catch(e) {  
            return null;      
        }
    }
);

export const removeOrder = createAsyncThunk(
    'orders/removeOrder',
    async(orderId:number, thunkAPI) => {
        try{
            const res = await axios.delete(`http://localhost:8500/orders/${orderId}`);
            console.log(res.data);
            return{orders: res.data};
        } catch(e) {
            return null;
        }
    }
);

export const removeAllOrders = createAsyncThunk(
    'orders/removeAllOrders',
    async(customer_id:number) => {
        try{
            const res = await axios.delete(`http://localhost:8500/orders/remove-all/${customer_id}`);
            console.log(res.data);
            return{orders: res.data};
        }catch(e){
            return null;
        }
    }
);

export const updateQuantity = createAsyncThunk(
    'orders/updateQuantity',
    async(Equant:Equant, thunkAPI) => {
        try{console.log("in slice equant: " + Equant.order_id);
            const res = await axios.post("http://localhost:8500/orders/update/quantity", Equant);
            console.log(res.data);
            return{orders: res.data};
        } catch(e) {
            return null;
        }
    }
);

export const getTotalItemsCount = createAsyncThunk(
    'orders/getAllItemsCount',
    async(customer_id:number) => {
        try{      
            const res = await axios.get(`http://localhost:8500/orders/${customer_id}`);
            console.log(res.data);
            return {orders: res.data};

        } catch(e) {  
            return null;      
        }
    }
);

export const updatePaymentType = createAsyncThunk(
    'payments/updatePaymentType',
    async(PType:PType) => {
        try{console.log("type in slice: " + PType);
            const res = await axios.post("http://localhost:8500/orders/update/payment", PType);
            console.log(res.data);
            return{orders:res.data};
        }catch(e){
            console.log("type in slice: " + PType);
            return null;
        }
    }
);

//Create our slice and map our reducers
export const OrderSlice = createSlice({
    //we need to name our slice
    name: "order",
    initialState,
    reducers: {
    },
        extraReducers: (builder) => {
            builder.addCase(createOrder.fulfilled, (state, action) => {
                  // console.log("orders inside create order response "+action.payload.orders);
                //localStorage.setItem('orders', JSON.stringify(action.payload.orders));
                return state;
            });
            builder.addCase(getOrders.fulfilled, (state, action) => {
                state.orders= action.payload?.orders;
              //  localStorage.setItem('orders', JSON.stringify(action.payload?.orders));
                return state;
            });
            builder.addCase(removeOrder.fulfilled, (state, action) => {
                return state;
            });
            builder.addCase(removeAllOrders.fulfilled, (state, action) => {
                return state;
            })
            builder.addCase(updateQuantity.fulfilled, (state, action) => {
                return state;
            });
            builder.addCase(getTotalItemsCount.fulfilled, (state, action) => {
                state.orders= action.payload?.orders;
              //  localStorage.setItem('orders', JSON.stringify(action.payload?.orders));
                return state;
            });
            builder.addCase(updatePaymentType.fulfilled, (state, action) => {
                return state;
            });
    }
});
export const {} = OrderSlice.actions;
export default OrderSlice.reducer;

