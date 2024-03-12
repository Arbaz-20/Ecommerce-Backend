import order from "../models/order";
import { Op } from "sequelize";
import cart from "../models/cart";
import product from "../models/product";


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
        return await order.findByPk(id,{
            include:[{model:cart,include:[product]}]
        });
    }

    public GetAllOrders = async (page:number,limit:number) : Promise<{rows:Array<object>; count: number}> => {
        return await order.findAndCountAll({
            offset:page,
            limit:limit,
            distinct:true,
            order:[["updatedAt","DESC"]],
            include:[{model:cart,attributes:["quantity","price","user_id"],include:[product]}]
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