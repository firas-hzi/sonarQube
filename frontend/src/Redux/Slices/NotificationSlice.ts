import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import { NotificationData } from "../../Types/NotificationData";
import { Person } from "../../Types/Person";

interface NotificationSliceState {
    notifications: NotificationData[]
};

//const p:Person=  JSON.parse(localStorage.getItem("user")|| '{}');

const initialState: NotificationSliceState = {
    notifications: []
};

export const getNotifications = createAsyncThunk(
    'notifications/getAll',
    async(customerId:number) => {
        try{      
            const res = await axios.get(`http://localhost:8500/notifications/${customerId}`);
            console.log(res.data);
            return {notification: res.data};
           
        } catch(e) {  
            return null;      
        }
    }
);
export const NotificationSlice = createSlice({
    //We need to name our slice
    name:"notification",
    initialState,
    reducers: {
        
        getAllNotifications: (state:NotificationSliceState, action:PayloadAction<number>) => {
    
           
           // return state; 
        },
     
        removeProduct: (state:NotificationSliceState, action:PayloadAction<number>) => {
          //  state.products = state.products.filter((product:Product) => product.id !== action.payload);
            return state;
        }
        
    },
    extraReducers: (builder) => {
        builder.addCase(getNotifications.fulfilled, (state, action) => {
            state.notifications= action.payload?.notification;
            localStorage.setItem('notifications', JSON.stringify(action.payload?.notification));
            return state;
        });
    }
});
export default NotificationSlice.reducer;