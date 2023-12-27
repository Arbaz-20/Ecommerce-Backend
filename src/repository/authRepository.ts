import auth from "../models/auth";
import { Model, Op } from "sequelize";
import { UserType, user } from "../utils/types/userTypes";

class AuthRepository {

    constructor(){

    }

    public CreateUser = async ( userData : object | any ) : Promise<object> => {
        return await auth.create(userData);
    }

    public UpdateUser = async (id:string, userData : object|any ):Promise<[affectedCount?:number|undefined]>=>{
        return await auth.update(userData,{where:{id:id}});
    }

    public GetUserById = async (id:string):Promise<Model<user>| null |{error?:string,status?:number}> =>{
        return await auth.findByPk(id);
    }

    public GetAllUsers = async (page:number,limit:number) : Promise<{rows:Array<object>; count: number}> => {
        return await auth.findAndCountAll({
            offset:page,
            limit:limit,
        });
    }

    public GetUserByName = async (name:string) :Promise<object[] | [] > => {
        return await auth.findAll({where:{name:{[Op.iLike]:`%${name}%`}}})
    }

    public DeleteUser = async(id:string) :Promise<number> => {
        return await auth.destroy({where:{id:id}});
    }

    public BulkDeleteUsers = async(ids:string[]) :Promise<number> => {
        return await auth.destroy({where:{id:ids}})
    }

}

export default AuthRepository;