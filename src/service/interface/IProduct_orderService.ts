import { Model } from "sequelize";
import { productOrderData } from "../../utils/types/orderTypes";
import { ErrorStatus } from "../../utils/types/userTypes";

interface IProduct_orderService{

    createProduct_order(product_orderData : object  ) : Promise<object>
    createProduct_order(product_orderData : object  ) : Promise<productOrderData |ErrorStatus>

    UpdateProduct_order(id:string,product_orderData : object  ):Promise<object|[affectedCount?:number|undefined]>

    GetProductById_order(id:string):Promise< object | null >
    GetAllProduct_order(page:number,limit:number) : Promise<{rows:Array<object>; count: number}>

    GetProduct_orderByName(name:string) :Promise<object[] | object>

    DeleteProduct_orderByOrderId(orderId: string): Promise<number | {error?:string,status?:number} | undefined>

    DeleteProduct_order(id:string) :Promise<number |{error?:string,status?:number}|undefined>

    BulkDeleteProduct_order (ids:string[]) : Promise<number>
}
export default IProduct_orderService;