import { Model, Op } from "sequelize";
import category from "../models/category";
import { categoryType } from "../utils/types/userTypes";
import product from "../models/product";

class categoryRepository {

    constructor(){

    }

    public CreateCategory = async ( categoryData : object | any ) : Promise<object> => {
        return await category.create(categoryData);
    }

    public UpdateCategory= async (id:string, categoryData : object|any ):Promise<[affectedCount?:number|undefined]>=>{
        return await category.update(categoryData,{where:{id:id}});
    }

    public GetCategoryById = async (id:string):Promise<Model<categoryType>| null |{error?:string,status?:number}> =>{
        return await category.findByPk(id);
    }

    public GetAllCategories = async (page:number,limit:number,keyword:string) : Promise<{rows:Array<object>; count: number}> => {
        return await category.findAndCountAll({
            where:{
                [Op.or]:{
                    category_name:{
                        [Op.iLike]:`%${keyword}%`
                    },
                }
            },
            offset:page,
            limit:limit,
            distinct:true,
            order:[["updatedAt","DESC"]],
            include:[{model:product,separate:true}]
        });
    }

    public GetCategoryByName = async (name:string) :Promise<object[] | [] > => {
        return await category.findAll({where:{name:{[Op.iLike]:`%${name}%`}}})
    }

    public GetCategoryByEmail = async (email:string) :Promise<object|null> => {
        return await category.findOne({where:{email:{[Op.iLike]:`%${email}%`}}})
    }

    public DeleteCategory= async(id:string) :Promise<number> => {
        return await category.destroy({where:{id:id}});
    }

    public BulkDeleteCategory = async(ids:string[]) :Promise<number> => {
        return await category.destroy({where:{id:ids}})
    }

}

export default categoryRepository;