import {configureStore} from '@reduxjs/toolkit';
import authReducer from './Slices/PersonSlice';
import  productReducer from './Slices/ProductSlice';
import OrderSlice from './Slices/OrderSlice';
import PaymentSlice from './Slices/PaymentSlice';
import AdminSlice from './Slices/AdminSlice';
import NotificationSlice from './Slices/NotificationSlice';

export const store = configureStore({
    reducer: {
        product: productReducer,
        auth: authReducer,
        order: OrderSlice,
        payment: PaymentSlice,
        admin: AdminSlice,
        notify: NotificationSlice
    },
    devTools:true
});
export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;