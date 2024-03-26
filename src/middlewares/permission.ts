import jwt, { JwtPayload } from "jsonwebtoken"
import PermissionServiceImplementation from "../service/implementation/PermissionServiceImplementation"
import { Request,Response,NextFunction } from "express";
import { permissionType } from "../utils/types/userTypes";

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


let permission = new PermissionServiceImplementation()

let PermissonsRestrict = async(req:Request,res:Response,next:NextFunction) => {
    let header = req.headers.authorization
    let type = req.headers.type as string
    if(header == null || header == undefined){
        res.status(401).json({error:"Unauthorized Access"});
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
                    let permissionData : permissionType | null = await permission.getPermissionByUserId(user?.id as string) as permissionType | null
                    if(permissionData == null || permission == undefined){
                        res.status(401).json({error:"Unauthorized Access"});
                    }else{
                        switch(type){
                            case "create":
                                if(permissionData.create == true){
                                    next()
                                }else{  
                                    res.status(401).json({error:"Unauthorized Access"});
                                }
                                break;

                            case "update":
                                if(permissionData.update == true){
                                    next()
                                }else{  
                                    res.status(401).json({error:"Unauthorized Access"});
                                }
                                break;

                            case "view":
                                if(permissionData.view == true){
                                    next()
                                }else{  
                                    res.status(401).json({error:"Unauthorized Access"});
                                }
                                break;

                            case "delete":
                                if(permissionData.delete == true){
                                    next()
                                }else{  
                                    res.status(401).json({error:"Unauthorized Access"});
                                }
                                break;
                            
                            default:
                                res.status(401).json({error:"Unauthorized Access"});
                        }
                    }
                }
            }
        } catch (error:unknown|any) {
            console.log(error)
            res.status(400).json({error:error})   
        }
    }
}

export default PermissonsRestrict;