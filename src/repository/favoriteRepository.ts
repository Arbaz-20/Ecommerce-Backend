import { Model, Op } from "sequelize";
import favouritess from "../models/favourite";
import product from "../models/product";
import auth from "../models/auth";

class favouritessRepository {

    constructor(){

    }
    public createfavourites = async (favouritesdata:object|any):Promise<object>=>{
        return await favouritess.create(favouritesdata);
    }

    public updatefavourites = async (id:string,favouritesdata:object|any ):Promise<[affectedCount?:number|undefined]>=>{
        return await favouritess.update(favouritesdata,{where:{id:id}});
    }
    public GetfavouritesById = async (id:string):Promise <object | null |{error?:string,status?:number}> =>{
        return await favouritess.findByPk(id,{include:[product]});
    }

    public GetAllfavouritess = async (page:number,limit:number,keyword:string) : Promise<{rows:Array<object>; count: number}> => {
        return await favouritess.findAndCountAll({
            offset:page,
            limit:limit,
            distinct:true,
            order:[["updatedAt","DESC"]],
            include:[{model:product,
                where:{
                    [Op.or]:{
                        name:{
                            [Op.iLike]:`%${keyword}%`
                        }
                    }
                }
                
            },{
                model:auth
            }]
        });
    }

    public GetfavouritesByName = async (name:string) :Promise<object[] | [] > => {
        return await favouritess.findAll({where:{name:{[Op.iLike]:`%${name}%`}}})
    }

    public GetfavouritesByauthIdAndProductId = async (authId:string,product_id:string) :Promise<object | null > => {
        return await favouritess.findOne({where:{
            [Op.and]:{
                authId:authId,
                productId:product_id
            }
        }})
    }

    public GetFavouritesByauthId = async (authId:string,page:number,limit:number):Promise<{count:number,rows:Model<any,any>[]}> =>{
        return await favouritess.findAndCountAll({
            where:{
                authId:authId
            },
            distinct:true,
            offset:page,
            limit:limit,
            order:[["updatedAt","DESC"]],
            include:[product]
        });
    }

    public Deletefavourites = async(id:string) :Promise<number> => {
        return await favouritess.destroy({where:{id:id}});
    }

    public BulkDeletefavouritess = async(ids:string[]) :Promise<number> => {
        return await favouritess.destroy({where:{id:ids}})
    }
};

export default favouritessRepository;