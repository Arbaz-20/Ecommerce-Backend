import colour from "../models/colour";
import { Op } from "sequelize";

class colourRespository {
    constructor(){

    }

    public createColour = async ( colourData : object | any ) : Promise<object> => {
        return await colour.create(colourData);
    }

    public UpdateColour = async (id:string, colourData : object|any ):Promise<[affectedCount?:number|undefined]>=>{
        return await colour.update(colourData,{where:{id:id}});
    }

    public GetColourById = async (id:string):Promise< object | null |{error?:string,status?:number}> =>{
        return await colour.findByPk(id);
    }

    public GetAllColour = async (page:number,limit:number) : Promise<{rows:Array<object>; count: number}> => {
        return await colour.findAndCountAll({
            offset:page,
            limit:limit,
        });
    }

    public GetColourByName = async (name:string) :Promise<object[] | [] > => {
        return await colour.findAll({where:{name:{[Op.iLike]:`%${name}%`}}})
    }

    public DeleteColour= async(id:string) :Promise<number> => {
        return await colour.destroy({where:{id:id}});
    }

    public BulkDeleteColour = async(ids:string[]) :Promise<number> => {
        return await colour.destroy({where:{id:ids}})
    }

}

export default colourRespository;