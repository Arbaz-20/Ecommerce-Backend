import product_order from "../models/product_order";
import { Op } from "sequelize";
import { productOrderData } from "../utils/types/orderTypes";
import { Model } from "sequelize";

class product_orderRepository {
    constructor(){
    }
    public createProduct_order = async ( product_orderData : object | any ) : Promise<object> => {
        return await product_order.create(product_orderData);
    }
    public UpdateProduct_order = async (id:string, product_orderData : object|any ):Promise<[affectedCount?:number|undefined]>=>{
        return await product_order.update(product_orderData,{where:{id:id}});
    }
    public GetProductById_order = async (id:string):Promise< object | null |{error?:string,status?:number}> =>{
        return await product_order.findByPk(id);
    }
    public GetAllProduct_order = async (page:number,limit:number) : Promise<{rows:Array<object>; count: number}> => {
        return await product_order.findAndCountAll({
            offset:page,
            limit:limit,
        });
    }
    public GetProduct_orderByName = async (name:string) :Promise<object[] | [] > => {
        return await product_order.findAll({where:{name:{[Op.iLike]:`%${name}%`}}})
    }
    public DeleteProduct_order = async(id:string) :Promise<number> => {
        return await product_order.destroy({where:{id:id}});
    }

    public DeleteProduct_orderByOrderId = async (orderId: string): Promise<number | {error?:string,status?:number} | undefined> => {
        return await product_order.destroy({where:{orderId:orderId}})    
    }

    public BulkDeleteProduct_order = async(ids:string[]) :Promise<number> => {
        return await product_order.destroy({where:{id:ids}})
    }
}
export default product_orderRepository;