import AuthServiceImplementation from "../service/implementation/AuthServiceImplementation"
import { Request,Response } from "express"
import {permissionType,UserType,user,ErrorStatus,Fileinfo } from "../utils/types/userTypes"
import PermissionServiceImplementation from "../service/implementation/PermissionServiceImplementation"
import fs from 'fs'
import { Stream,Readable } from "stream"
import { Model } from "sequelize"
import jwt, { JwtPayload } from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import auth from "../models/auth"
class AuthController{
    auth_service: AuthServiceImplementation
    permissionService: PermissionServiceImplementation

    public destination: string = "src/utils/upload/user"

    constructor(){
        this.auth_service = new AuthServiceImplementation()
        this.permissionService = new PermissionServiceImplementation()
    }

    public CreateUser = async (req : Request ,res : Response) => {
        let userData = req.body;
        let file:Fileinfo | undefined = req.file as Fileinfo;
        
        
        if(userData.name == undefined || userData.email == undefined || userData.password == undefined || userData.name == null|| userData.email == null || userData.password == null){
            res.status(400).json({error : "please provide the required fields"})
        }else{
            try {
                let isExist = await this.auth_service.GetUserByEmail(userData.email);
                if(isExist == null){
                    if(file == null || file == undefined){
                        let response = this.auth_service.CreateUser(userData);
                        if(typeof response == "number")
                        if(response > 0){
                            res.status(200).json({message :"created successfully"})
                        }else{
                            res.status(400).json({error :"couldnot able to create"})
                        }
                    }else{
                        if(file.mimetype?.split("/")[1] == "jpg" || file.mimetype?.split("/")[1] == "png" || file.mimetype?.split("/")[1] == "jpeg"){
                            let stream = Readable.from(file.buffer as Buffer);
                            let filename = file.originalname?.replaceAll(" ","_");
                            let filePath = `${this.destination}/${filename?.split(".")[0]+"_"+this.getTimeStamp()+"."+filename?.split(".")[1]}`
                            let writer = fs.createWriteStream(filePath);
                            stream.pipe(writer);
                            let url = `${process.env.server}/${filePath}`
                            userData["image"] = url;
                            let response :any = this.auth_service.CreateUser(userData);
                            if(response.error && response.status){
                                res.status(400).json({error:response.error})
                            }else{
                                res.status(200).json({message:"Created User Successfully"})
                            }
                        }else{
                            res.status(400).json({error:"Please Select either png or jpg or jpeg file"});    
                        }
                    }
                }else{
                    res.status(400).json({error:`${userData.email} already exists please try different email`})
                }
                
            } catch (error:any) {
                this.print(error);
                if(error.errors){
                    let validationerror = []
                    for await(let response of error.errors){
                        let obj :{path : string,message : string} = {
                            path: "",
                            message: ""
                        };
                        obj.path = response.path,
                        obj.message = response.message
                        validationerror.push(obj);
                    }
                    res.status(400).json({errors : validationerror});
                }else{
                    res.status(400).json({errors : error.message});
                }
            }
        }
        
    }

    public LoginController = async(req : Request, res : Response) =>{
        let {email,password} = req.body;
        if(email == null || password == null||password == undefined || email == undefined){
            res.status(401).json({errors :"please enter email or password"});
        }else{
            let isExist : user | null = await this.auth_service.GetUserByEmail(email);
            if(isExist == null){
                res.status(400).json({error:"Account Dosent Exist"});
            }else{
                if(await bcrypt.compare(password,isExist.password)){
                    let token = jwt.sign(
                        {id: isExist.id},
                        process.env.jwt_secret as string,
                        {expiresIn:"1day"}

                    )
                    let refreshToken = jwt.sign(
                        { id: isExist.id },
                        process.env.jwt_secret as string,
                        { expiresIn: "356d" }
                      );
                      res.cookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: true,
                      })
                      res.cookie("AccessToken", token, { httpOnly: true, secure: true });
                      res.status(200).json({message :"login successful",user:isExist})
                }else{
                    res.status(400).json({error:"Invalid Password"});
                }
            }
        }
    };

    public RefreshToken = async (req:Request, res:Response) => {
        let refreshToken = req.params.token;
        if (refreshToken == null || refreshToken == undefined) {
          res.status(400).json({ error: "refresh token required" });
        } else {
          try {
            let decode :string|JwtPayload = jwt.verify(refreshToken, process.env.jwt_secret as string);
            if (decode == null || decode == undefined) {
              res.status(400).json({ error: "invalid token" });
            } else {
              let userData = await auth.findByPk(decode as string);
              if (userData == null || userData == undefined) {
                res.status(400).json({ error: "invalid refresh token" });
              } else {
                let token = jwt.sign(
                  { data :decode},
                  process.env.jwt_secret as string,
                  { expiresIn: "30min" }
                );
                res.status(200).json({ accesToken: token /*,user:userData*/ });
              }
            }
          } catch (error:any) {
            res.status(400).json({ error: error.message });
          }
        }
      };

    public logoutController =(req: Request, res: Response)=>{
        try {
            res.cookie("AccessToken","",{maxAge:1});
            res.cookie("refreshToken","",{maxAge:1});
            res.status(200).json({message:"Logout successful"});
        } catch (error:any) {
            res.status(400).json({error:error});    
        }
    }

    public UpdateUser = async(req : Request,res : Response ) => {
        let userData = req.body;
        let {id} = req.params;
        let destination = "src/utils/upload/user"
        let file : Fileinfo = req.file as Fileinfo
        let stream = new Stream()
        if(id == null || id == undefined){
            res.status(404).json({error : "please provide id to update"})
        }else{
            try{
                let isExist : Model<UserType,UserType>|ErrorStatus|any = await this.auth_service.GetUserById(id)
                if(isExist == null ||isExist == undefined){
                    res.status(400).json({error: "please select user properly"})
                }else{
                    if(file == null || file == undefined){
                        let data :{error?:string,status:400}|[affectedCount?:number]|undefined = await this.auth_service.UpdateUser(id,userData);       
                        if(data instanceof Array){
                            if(typeof data == "number"){
                                if(data > 0){
                                    res.status(200).json({message:"Updated Successfully"});
                                }else{
                                    res.status(400).json({error:"Cannot update please try again"});
                                }
                            }
                        }else{
                            res.status(data.status).json({error:data.error})
                        }
                    }else{
                        if(isExist.image == null || isExist.image == undefined){
                            if(file.originalname?.split(".")[1] == "jpeg"||file.originalname?.split(".")[1] == "png"||file.originalname?.split(".")[1] == "jpg"){
                                let streamData = Readable.from(file.buffer as Buffer);
                                let filename = file.originalname?.replaceAll(" ","_");
                                let filePath = `${this.destination}/${filename?.split(".")[0]+"_"+this.getTimeStamp()+"."+filename?.split(".")[1]}`
                                let writer = fs.createWriteStream(filePath);
                                streamData.pipe(writer);
                                userData["image"] = `${process.env.server}/${filePath}`
                                let data :{error?:string,status:400}|[affectedCount?:number]|undefined = await this.auth_service.UpdateUser(id,userData);       
                                if(data instanceof Array){
                                    if(typeof data == "number"){
                                        if(data > 0){
                                            res.status(200).json({message:"Updated Successfully"});
                                        }else{
                                            res.status(400).json({error:"Cannot update please try again"});
                                        }
                                    }
                                }else{
                                    res.status(data.status).json({error:data.error})
                                }
                            }else{
                                res.status(400).json({error_message:"Plese select either png or jpeg or jpg file format"})
                            }
                        }else{
                            let imageName = isExist.image.split("/")
                            let filenameData = imageName[imageName.length - 1]
                            fs.rmSync(`${destination}/${filenameData}`);
                            let streamData = Readable.from(file.buffer as Buffer);
                            let filename = file.originalname?.replaceAll(" ","_");
                            let filePath = `${this.destination}/${filename?.split(".")[0]+"_"+this.getTimeStamp()+"."+filename?.split(".")[1]}`
                            let writer = fs.createWriteStream(filePath);
                            streamData.pipe(writer);
                            userData["image"] = `${process.env.server}/${filePath}`
                            let data :{error?:string,status:400}|[affectedCount?:number]|undefined = await this.auth_service.UpdateUser(id,userData); 
                            if(data instanceof Array){
                                if(Number(data[0]) > 0){
                                    res.status(200).json({message:"Updated Successfully"});
                                }else{
                                    res.status(400).json({error:"Cannot update please try again"});
                                }
                                
                            }else{
                                res.status(400).json({error:"Cannot able update please try again"})
                            }
                        }
                    }
                }
            }catch(error : any){
                console.log(error);
                if(error.errors){
                    let validationerror : Array<object> = [];
                    for await(let response of error.errors){
                        let obj:{path : string , message : string}={
                            path: "",
                            message: ""
                        }
                        obj.path = response.path;
                        obj.message = response.message;
                        validationerror.push(obj);
                    }
                    res.status(400).json({errors:validationerror})
                }else{
                    res.status(400).json({errors:error.message})
                }
            } 
        }
    }

    public GetUserById = async (req : Request,res:Response) => {
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(404).json({error:"please provide id"})
        }else{
            try {
                let userResponse : Model<user> | {error ?:string,status?:number } | null = await this.auth_service.GetUserById(id);
                if(userResponse == null || userResponse == undefined){
                    res.status(400).json({error:"No User Exists"});
                }
                else{
                    res.status(200).json({data: userResponse});
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    }

    public GetAllUsers = async (req : Request,res:Response) => {
        let page = req.query.page as unknown as number;
        let limit = req.query.limit as unknown as number;
        let name = req.query.name as unknown as string;
        name = name == null || name == undefined ? "": name
        try {
            let userResponse :{count : number,rows:object[]} | {error ?: string ,status?:number } = await this.auth_service.GetAllUsers(Number(page),limit,name);
            console.log(userResponse)
            if(userResponse == null || userResponse == undefined || page == undefined || limit == undefined||page == null || limit == null){
                res.status(400).json({error:"Something went wrong please try again"});
            }else{
                res.status(200).json({data : userResponse});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }
    }

    public DeleteUser = async (req : Request,res:Response) => {
        let id : string = req.params?.id;
        if(id == null || id == undefined){
            res.status(400).json({error:"id is requrired"});
        }else{
            try {
                let userResponse : {error?:string,status?:number} | any | number|undefined = await this.auth_service.DeleteUser(id);
                if(userResponse == null || userResponse == undefined){
                    res.status(400).json({error:"Something went wrong please try again"});
                }else if (userResponse.error || userResponse.status == 400){
                    res.status(userResponse.status as number).json({error:userResponse.error});
                }else{
                    let response = await this.auth_service.DeleteUser(id)
                    if(typeof response == "number"){
                        if(response > 0){
                            res.status(200).json({message:"Deleted Sucessfully"});
                        }else{
                            res.status(400).json({error:"couldnot able to delete"})
                        }
                    }else{
                        res.status(400).json({error:"Cannot Update Please try again"})
                    }
                }
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        }
    }

    public BulkDeleteUser =async (req : Request,res:Response) => {
        let ids : string[] = req.body.ids;
        let errors: string[] = [];
        let success:string[] = [];
        
        try {
            for await(let id of ids ){
                if(id != null || id != undefined || id != ""){
                    let isExist : user | { error?: string | undefined , status?: number | undefined }|any = await this.auth_service.GetUserById(id);
                    if(isExist !== null || isExist !== undefined){
                        let permission = await this.permissionService.getPermissionByUserId(id);
                        if(permission != null || permission != undefined){
                            let response : number | ErrorStatus|any = await this.auth_service.DeleteUser(id);
                            if(response > 0){
                                let response : {error?:string,status?:number}|number = await this.auth_service.DeleteUser(id);
                                if(Number(response) > 0){
                                    success.push(`${isExist.name} Deleted Successfully`);
                                }else{
                                    errors.push(`${isExist.name} cannot be deleted please try again`)
                                }
                            }
                            else{
                                errors.push(`${isExist.name} couldn't Delete plese try again`);
                            }
                        }
                    }
                }
            }
            if(errors.length > 0){
                res.status(400).json({error:errors});
            }else if(errors.length > 0,success.length > 0){
                res.status(400).json({success:success,error:errors});
            }else{
                res.status(200).json({success:success , message:"All Deleted Successfully"});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message})
        }
        
    }

    
    private getTimeStamp = () =>{
        return Math.floor(Date.now() / 1000)
    }

    private print = async(message:string) :Promise< string | void > => {
        return console.log(message);
    }

} 

export default AuthController

