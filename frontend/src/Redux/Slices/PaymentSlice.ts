import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { responseEncoding } from 'axios';
import { Payment } from '../../Types/Payment';

interface PaymentSliceState {
    payments:Payment[]
};

const initialState:PaymentSliceState = {
    payments:[]
};

export const getPaymentTypes = createAsyncThunk(
    'payments/getPaymentTypes',
    async() => {
        try{      
            const res = await axios.get(`http://localhost:8500/payments/`);
            console.log(res.data);
            return {payments: res.data};
        } catch(e) {  
            return null;      
        }
    }
);

export const changePaymentType = createAsyncThunk(
    'payments/changePaymentType',
    async(payment_id:number) => {
        try{
            const res = await axios.post(`http://localhost:8500/payments/update/${payment_id}`)
            console.log(res.data);
            return{payments:res.data};
        }catch(e){
        return null;
        }
    }
)

export const PaymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getPaymentTypes.fulfilled, (state, action) => {

            state.payments= action.payload?.payments;
            console.log("payments inside payment slice "+state.payments);
          //  localStorage.setItem('orders', JSON.stringify(action.payload?.orders));
            return state;
        });
        builder.addCase(changePaymentType.fulfilled, (state, action) => {
            return state;
        });
    }
});

export const {} = PaymentSlice.actions;
export default PaymentSlice.reducer;
