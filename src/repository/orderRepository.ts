import order from "../models/order";
import { Op } from "sequelize";
import product from "../models/product";
import product_order from "../models/product_order";

class OrderRepository {

    constructor(){

    }

    public CreateOrder = async ( OrderData : object|any ) : Promise<object> => {
        return await order.create(OrderData);
    }

    public UpdateOrder = async (id:string, OrderData : object|any ):Promise<[affectedCount?:number|undefined]>=>{
        return await order.update(OrderData,{where:{id:id}});
    }

    public GetOrderById = async (id:string):Promise< object | null |{error?:string,status?:number}> =>{
        return await order.findByPk(id);
    }

    public GetAllOrders = async (page:number,limit:number) : Promise<{rows:Array<object>; count: number}> => {
        return await order.findAndCountAll({
            offset:page,
            limit:limit,
            order:[["updatedAt","DESC"]],
            include:[product]
        });
    }

    public GetOrderByName = async (name:string) :Promise<object[] | object> => {
        return await order.findAll({where:{name:{[Op.iLike]:`%${name}%`}}})
    }

    public DeleteOrder = async(id:string) :Promise<number> => {
        return await order.destroy({where:{id:id}});
    }

    public BulkDeleteOrders = async(ids:string[]) :Promise<number> => {
        return await order.destroy({where:{id:ids}})
    }

}

export default OrderRepository;