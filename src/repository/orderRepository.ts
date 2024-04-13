import order from "../models/order";
import { cast, col, Op, where } from "sequelize";
import cart from "../models/cart";
import product from "../models/product";
import product_order from "../models/product_order";
import order_status from "../utils/masterFiles/orderstatus";


class OrderRepository {

    constructor(){

    }

    public CreateOrder = async ( OrderData : object|any ) : Promise<object> => {
        return await order.create(OrderData);
    }

    public UpdateOrder = async (id:string, OrderData : object|any ):Promise<[affectedCount?:number|undefined]>=>{
        return await order.update(OrderData,{where:{id:id}});
    }

    public UpdateOrderStatus = async (id:string,Order_status : string) : Promise<[affectedCount?: number]>=>{
        return await order.update ({ order_status: Order_status },{where:{id:id}})
    }

    public UpdatePaymentStatus = async (id:string,paymentStatus : string) : Promise<[affectedCount?: number]>=>{
        return await order.update ({ payment_status: paymentStatus },{where:{id:id}})
    }


    public GetOrderById = async (id:string):Promise< object | null |{error?:string,status?:number}> =>{
        return await order.findByPk(id,{
            include:[{model:cart,include:[product]}]
        });
    }

    public GetAllOrders = async (page:number,limit:number,keyword:string,filterBy:string) : Promise<{rows:Array<object>; count: number}> => {
        return await order.findAndCountAll({
            where:{
                [Op.or]:{
                    name:{
                        [Op.iLike]:`%${keyword}%`   
                    },
                    address:{
                        [Op.iLike]:`%${keyword}%`
                    },
                    order_status:where(cast(col("order_status"),"TEXT"),{
                        [Op.like]:`%${keyword}%`
                    }),
                    payment_status:where(cast(col("payment_status"),"TEXT"),{
                        [Op.iLike]:`%${keyword}%`
                    })
                },
                order_status: order_status.includes(filterBy) ? filterBy:order_status
            },
            offset:page,
            limit:limit,
            distinct:true,
            order:[["updatedAt","DESC"]],
            include:[{model:product_order}]
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