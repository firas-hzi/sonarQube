export interface Product {
    id: number;
    title: string;
    price: number;
    image?:string;
    quantity: number;
    description: string;
    category?:Category;
    modifiedDate?: string
}


export interface Category{
    
productCategoryId: number;
category: string;
}

