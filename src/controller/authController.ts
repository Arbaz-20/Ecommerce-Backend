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

interface ErrorStatus{
    error?:string,
    status?:number
}
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
                let userResponse : user | { error ? : string,status ? : number }  = await this.auth_service.CreateUser(userData);
                if(userResponse == null || userResponse == undefined){
                    res.status(400).json({error:"Something went wrong please try again"});
                }
                else if(userResponse.error || userResponse.status == 400){
                    res.status(userResponse.status as number).json({error:userResponse.error});
                }
                else{
                    res.status(200).json({message:"Sign Up Sucessfully",data: userResponse});
                }
            } catch (error:any) {
                res.status(400).json({error:error.message});
            }
        }
    }

    public UpdateUser = async(res : Response ,req : Request)=>{
        let userData = req.body;
        let {id} = req.params;
        if(id == null || id == undefined){
            res.status(404).json({error : "please provide id to update"})
        }else{
            try{
                let userResponse : [affectedCount ? : number | undefined] | { error ? : string |undefined, status ? : number|undefined } = await this.auth_service.UpdateUser(id,userData);
                if(userResponse == null || userResponse == undefined){
                    res.status(400).json({error:"Something went wrong please try again"});
                }
                // else if(userResponse.error || userResponse.status == 400){

                // }
                else{
                    res.status(200).json({message:"updated Sucessfully",data: userResponse});
                }
            }catch(error : any){
                res.status(400).json({error:error.message});
            } 
        }
    }

    public GetUserById =async (res:Response,req : Request) => {
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(404).json({error:"please provide id"})
    }else{
            try {
                let userResponse : user | {error ?:string,status?:number } |null = await this.auth_service.GetUserById(id);
                if(userResponse == null || userResponse == undefined){
                    res.status(400).json({error:"Something went wrong please try again"});
                }
                else{
                    res.status(200).json({data: userResponse});
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    }

    public getallusers = async (res:Response,req : Request) => {
        let page =req.query.page;
        let limit =req.query.limit;
        try {
            let userResponse :{count : number,rows:object[]} | {error ?: string ,status?:number } 
        } catch (error) {
            
        }
    }
}

export default AuthController

