import jwt,{JwtPayload } from "jsonwebtoken";
import RoleServiceImplementation from "../service/implementation/RoleServiceImplementation";
import AuthServiceImplementation from "../service/implementation/AuthServiceImplementation";
import { Request,Response,NextFunction } from "express";
import { UserType } from "../utils/types/userTypes";
import { roleType } from "../utils/types/RoleType";


declare global{
    namespace Express{
        interface Request{
            user ?: {id:string} | JwtPayload
        }
    }
}

type user = {
    id : string | JwtPayload
}

let roles = new RoleServiceImplementation
let users = new AuthServiceImplementation

let RolesRestrict = async(req:Request,res:Response,next:NextFunction) => {
    
    let header = req.headers.authorization
    if(header == null || header == undefined){
        res.status(401).json({error:"Unauthorized Access"});
    }else{
        try {
            let token : string | undefined = header?.split(" ")[1]
            if(token == null || token == undefined){
                res.status(401).json({error:"Unauthorized Access"});
            }else{
                let user:user = jwt.verify(token,process.env.jwt_secret as string) as user
                if(user == null){
                    res.status(400).json({error:"Invalid Credentials"});
                }else{
                    let userData :UserType|null = await users.GetUserById(user?.id as string) as UserType
                    if(userData == null || user == undefined){
                        res.status(401).json({error:"Unauthorized Access"});
                    }else{
                        let roleData : roleType = await roles.GetRoleById(userData.roleId as string) as roleType
                        if(roleData == null || roleData == undefined){
                            res.status(401).json({error:"Unauthorized Access"});
                        }else{
                            if(roleData.name == "Admin"){
                                next()
                            }else{
                                res.status(401).json({error:"Your Not Authorized to Access"});
                            }
                        }
                    }
                }  
            }  
        } catch ( error:any) {
            res.status(400).json({error:error})
        }
    }
}

export default RolesRestrict