import permission from "../models/permission";


class PermissionRepository{
 
    constructor(){

    }
    public CreateUser = async ( userData : object | any ) : Promise<object> => {
        return await permission.create(userData);
    }

    public updateUser = async (id:string,userData : object | any ) : Promise<object> => {
        return await permission.update(userData,{where:{id:id}});
    }

    public GetUserById = async (id:string):Promise< object | null > =>{
        return await permission.findByPk(id);
    }

    public GetAllUsers = async (page:number,limit:number) : Promise<{rows:Array<object>; count: number}> => {
        return await permission.findAndCountAll({
            offset:page,
            limit:limit,
        });
    }

    public DeleteUser = async(id:string) :Promise<number> => {
        return await permission.destroy({where:{id:id}});
    }

    public bulkDeleteUser = async (ids:string[]) : Promise<number> => {
        return await permission.destroy({where:{id:ids}})
    }
}

export default PermissionRepository