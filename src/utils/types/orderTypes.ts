type productOrderData = {
    productId:string,
    orderId:string,
    product_quantity:BigInt,
    discount:number
}

export type OrderData = {
    id?:string,
    name?:string,
    address?:string
    product_no?:string
    order_status?:string
    payment_status?:string
    GST_tax?:string
    delivery_charges?:string
    delivery_date?:Date
    order_date?:Date
    order_price?:string
    discount_price?:string
    final_price?:string
    createdAt?:Date
    updatedAt?:Date
}

export{productOrderData}