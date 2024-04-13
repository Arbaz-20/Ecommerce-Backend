import { Model, Op } from "sequelize";
import cart from "../models/cart";
import { CartType } from "../utils/types/cartType";
import product from "../models/product";


class cartRepository {

    constructor(){

    }
    public createCart = async (cartdata:object|any):Promise<object>=>{
        return await cart.create(cartdata);
    }

    public updateCart = async (id:string,cartdata:object|any ):Promise<[affectedCount?:number|undefined]>=>{
        return await cart.update(cartdata,{where:{id:id}});
    }
    public GetCartById = async (id:string):Promise <CartType |{error?:string,status?:number}|null> =>{
        return await cart.findByPk(id,{
            include:[{model:product}]
        }) as CartType;
    }
    public GetCartByUserId = async (user_id:string):Promise<{rows:Array<object>; count:number}|{rows:Array<object>; subtotal:number,count:number}>=>{
        return await cart.findAndCountAll({
            where:{
                user_id:user_id,
                
            },
            include:[{model:product,attributes:{exclude:["createdAt","categoryId"]}}],
            order:[["updatedAt","DESC"]]
        });
    }
    public GetAllCarts = async (page:number,limit:number,keyword:string) : Promise<{rows:Array<object>; count: number}> => {
        return await cart.findAndCountAll({
            offset:page,
            limit:limit,
            distinct:true,
            include:[{model:product,
                where:{
                    [Op.or]:{
                        name:{
                            [Op.iLike]:`%${keyword}%`   
                        }
                    }
                }
                ,attributes:{exclude:["createdAt","categoryId"]}}],
            order:[["updatedAt","DESC"]]

        });
    }

    public GetCartByName = async (name:string) :Promise<object[] | [] > => {
        return await cart.findAll({where:{name:{[Op.iLike]:`%${name}%`}}})
    }

    public DeleteCart= async(id:string) :Promise<number> => {
        return await cart.destroy({where:{id:id}});
    }

    public DeleteCartByUserId = async(user_id:string) :Promise<number> => {
        return await cart.destroy({where:{user_id:user_id}});
    }

    public BulkDeleteCarts = async(ids:string[]) :Promise<number> => {
        return await cart.destroy({where:{id:ids}})
    }
};

export default cartRepository;