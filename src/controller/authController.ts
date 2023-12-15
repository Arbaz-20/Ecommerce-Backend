import AuthServiceImplementation from "../service/implementation/AuthServiceImplementation"
import { Request,Response } from "express"

interface user{
    id:string,
    name:string,
    age:number,
    email:string,
    password:string,
    country:Enumerator,
    type:Enumerator,
    image:string,
    city:string,
    address:string,
    createdAt:Date,
    updatedAt:Date
}

let Errors = new Error()

class AuthController{
    auth_service: AuthServiceImplementation

    constructor(){
        this.auth_service = new AuthServiceImplementation()
    }

    public CreateUser = async (req : Request ,res : Response) => {
        let userData = req.body
        if(userData.name == undefined || userData.email == undefined || userData.password == undefined || userData.name == null|| userData.email == null || userData.password == null){
            res.status(400).json({error : "please provide the required fields"})
        }else{
            try {
                let userResponse :  object | user | any  = await this.auth_service.CreateUser(userData);
                if(userResponse == null || userResponse == undefined){
                    res.status(400).json({error:"Something went wrong please try again"});
                }
                else if(userResponse.error || userResponse.status == 400){
                    res.status(userResponse.status).json({error:userResponse.error});
                }
                else{
                    res.status(200).json({message:"Sign Up Sucessfully",data: userResponse});
                }
            } catch (error:any) {
                res.status(400).json({error:error.message});
            }
        }
    }


}

export default AuthController