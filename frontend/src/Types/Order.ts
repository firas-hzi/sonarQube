import { Person } from "./Person";
import { Product } from "./Product";

export interface Order{
    orderId:number;
    person:Person;
    product:Product;
    registeredAt?:string;
    totalPrice:number;
    totalItem:number;
    OrderStatus:orderStatus;
    paymentType:paymentType;
}

export interface paymentType{
    paymentTypeId: number;
    type: string;
}

export interface orderStatus{
    orderStatusId : number,
    status: string
}