import { JwtPayload } from "jsonwebtoken";
import PermissionServiceImplementation from "../service/implementation/PermissionServiceImplementation"
import { Request,Response,NextFunction } from "express";

let permission = new PermissionServiceImplementation()

let PermissonsRestrict = async(req:Request,res:Response,next:NextFunction) => {
    let headers = req.headers
    console.log(headers.user_id)
    if(headers.user_id == null || headers.user_id == undefined){

    }else{

        next()
    }
}

export default PermissonsRestrict;