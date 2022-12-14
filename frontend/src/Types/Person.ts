import { Order } from "./Order";

export interface Person{
    customerId: number;
	name: string;
	email:string;
	password:string;
	phone:string;
	image:string;
	theme:Theme;
	role: Role;
	orders: Order[];
	address?:Address;
}
export interface Role{
	roleId: number;
  role: string

}

export interface Theme{
themeId: number,
theme: string
}

export interface Address {
    customer_id?:number;
    address_id?:number;
    street:string;
    city:string;
    state:string;
    zip:number;
}
