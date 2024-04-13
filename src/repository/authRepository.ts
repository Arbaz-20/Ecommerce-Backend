import auth from "../models/auth";
import { Model, Op } from "sequelize";
import { UserType, user } from "../utils/types/userTypes";
import permissions from "../models/permission";
import Role from "../models/role";

class AuthRepository {

    constructor(){

    }

    public CreateUser = async ( userData : object | any ) : Promise<Model<UserType,UserType>> => {
        return await auth.create(userData);
    }

    public UpdateUser = async (id:string, userData : object|any ):Promise<{error?:string,status:400}|[affectedCount?:number|undefined]>=>{
        return await auth.update(userData,{where:{id:id}});
    }

    public GetUserById = async (id:string):Promise<Model<user>| null |{error?:string,status?:number}> =>{
        return await auth.findByPk(id,{
            include:[{
                model:Role,
                include:[{
                    model:permissions
                }]
            }]
        });
        
    }

    public GetAllUsers = async (page:number,limit:number,name:string) : Promise<{rows:Array<object>; count: number}> => {
        let role_attribute = ["id","name"]
        return await auth.findAndCountAll({
            where:{
                [Op.or]:{
                    name:{
                        [Op.iLike]:`%${name}%`
                    }
                }
            },
            offset:page,
            limit:limit,
            distinct:true,
            include:[{model:Role,attributes:role_attribute, include:[{model:permissions}]}],
            order:[["updatedAt","DESC"]]
        });
    }

    public GetUserByName = async (name:string) :Promise<object[] | [] > => {
        return await auth.findAll({where:{name:{[Op.iLike]:`%${name}%`}}})
    }

    public GetUserByEmail = async (email:string) :Promise<object|null> => {
        return await auth.findOne({where:{email:{[Op.iLike]:`%${email}%`}}})
    }

    public DeleteUser = async(id:string) :Promise<number> => {
        return await auth.destroy({where:{id:id}});
    }

    public BulkDeleteUsers = async(ids:string[]) :Promise<number> => {
        return await auth.destroy({where:{id:ids}})
    }

}

export default AuthRepository;