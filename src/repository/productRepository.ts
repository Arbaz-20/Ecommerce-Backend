import order from "../models/order";
import product from "../models/product";
import { Op } from "sequelize";

class ProductRepository {
    constructor(){

    }

    public createProduct = async ( productData : object | any ) : Promise<object> => {
        return await product.create(productData);
    }

    public UpdateProduct = async (id:string, productData : object|any ):Promise<[affectedCount?:number|undefined]>=>{
        return await product.update(productData,{where:{id:id}});
    }

    public GetProductById = async (id:string):Promise< object | null |{error?:string,status?:number}> =>{
        return await product.findByPk(id);
    }

    public GetAllProduct = async (page:number,limit:number) : Promise<{rows:Array<object>; count: number}> => {
        return await product.findAndCountAll({
            offset:page,
            limit:limit,
            order:[["updatedAt","DESC"]],
        });
    }

    public GetProductByName = async (name:string) :Promise<object[] | [] > => {
        return await product.findAll({where:{name:{[Op.iLike]:`%${name}%`}}})
    }

    public DeleteProduct = async(id:string) :Promise<number> => {
        return await product.destroy({where:{id:id}});
    }

    public BulkDeleteProduct = async(ids:string[]) :Promise<number> => {
        return await product.destroy({where:{id:ids}})
    }

}

export default ProductRepository;