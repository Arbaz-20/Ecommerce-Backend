import jwt, { JwtPayload } from "jsonwebtoken"
import PermissionServiceImplementation from "../service/implementation/PermissionServiceImplementation"
import { Request,Response,NextFunction } from "express";
import { permissionType, UserType } from "../utils/types/userTypes";
import RoleServiceImplementation from "../service/implementation/RoleServiceImplementation";
import AuthServiceImplementation from "../service/implementation/AuthServiceImplementation";
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

let role = new RoleServiceImplementation()
let permission = new PermissionServiceImplementation()
let userService = new AuthServiceImplementation()

let PermissonsRestrict = async(req:Request,res:Response,next:NextFunction) => {
    let header = req.headers.authorization
    let type = req.headers.type as string
    
    if(header == null || header == undefined){
        res.status(401).json({error:"Unauthorized Access"});
        console.log(header)
    }else if(type == null ||type == undefined){
        res.status(401).json({error:"type required Unauthorized Access"});
    }
    else{
    
        try {
            let token : string | undefined = header?.split(" ")[1]
            if(token == null || token == undefined){
                res.status(401).json({error:"Unauthorized Access"});
            }else{
                let user = jwt.verify(token,process.env.jwt_secret as string) as user
                if(user == null || user == undefined){
                    res.status(401).json({error:"Unauthorized Access"});
                }else{
                    let userData :UserType = await userService.GetUserById(user?.id as string) as UserType
                    if(userData == null || userData == undefined){
                        res.status(400).json({error:"Unauthorized Access"});
                    }else{
                        let roleValue:roleType = userData["role"] as roleType
                        let permissionData :permissionType = await permission.GetPermissionById(roleValue.permissionId as string) as permissionType
                        switch(type){
                            case "create":
                                if(permissionData.create == true){
                                    next()
                                }else{  
                                    res.status(401).json({error:"Unauthorized Access for create"});
                                }
                                break;

                            case "update":
                                if(permissionData.update == true){
                                    next()
                                }else{  
                                    res.status(401).json({error:"Unauthorized Access for update"});
                                }
                                break;

                            case "view":
                                if(permissionData["view"] == true){
                                    console.log("this is the case",permissionData.view)
                                    next()
                                }else{  
                                    res.status(401).json({error:"Unauthorized Access for view"});
                                }
                                break;

                            case "delete":
                                if(permissionData.delete == true){
                                    next()
                                }else{  
                                    res.status(401).json({error:"Unauthorized Access for"});
                                }
                                break;
                            
                            default:
                                res.status(401).json({error:"Unauthorized Access"});
                        }
                    }
                }
            }
        } catch (error:any) {
            console.log(error)
            res.status(400).json({error:error})   
        }
    }
}

export default PermissonsRestrict;