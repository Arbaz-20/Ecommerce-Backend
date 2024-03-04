import { Op } from "sequelize";
import cart from "../models/cart";


class cartRepository {

    constructor(){

    }
    public createCart = async (cartdata:object|any):Promise<object>=>{
        return await cart.create(cartdata);
    }

    public updateCart = async (id:string,cartdata:object|any ):Promise<[affectedCount?:number|undefined]>=>{
        return await cart.update(cartdata,{where:{id:id}});
    }
    public GetCartById = async (id:string):Promise <object | null |{error?:string,status?:number}> =>{
        return await cart.findByPk(id);
    }
    public GetCartByUserId =async (user_id:string):Promise<{rows:Array<object>; count:number}>=>{
        return await cart.findAndCountAll({
            where:{
                user_id:user_id
            }
        });
    }
    public GetAllCarts = async (page:number,limit:number) : Promise<{rows:Array<object>; count: number}> => {
        return await cart.findAndCountAll({
            offset:page,
            limit:limit
        });
    }

    public GetCartByName = async (name:string) :Promise<object[] | [] > => {
        return await cart.findAll({where:{name:{[Op.iLike]:`%${name}%`}}})
    }

    public DeleteCart= async(id:string) :Promise<number> => {
        return await cart.destroy({where:{id:id}});
    }

    public BulkDeleteCarts = async(ids:string[]) :Promise<number> => {
        return await cart.destroy({where:{id:ids}})
    }
};

export default cartRepository;