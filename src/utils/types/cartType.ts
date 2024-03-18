import { DoubleDataType } from "sequelize";


export type CartType = {
    id ?:string;
    user_id?:string
    product_id?:string
    price?:DoubleDataType
    quantity?:bigint
    total_price?:DoubleDataType
    createdAt?:Date
    updatedAt?:Date
    date?:Date
    subtotal?:number,
    productId?:string,
    product?:{
        id?: string,
        name?: string,
        image?: string,
        quantity?:string,
        description?: string,
        price?:number,
        discount?: number,
        updatedAt?: Date
    }
}