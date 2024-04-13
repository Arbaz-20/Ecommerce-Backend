import ProductServiceImplementation from "../service/implementation/ProductServiceImplementation"
import { Request,Response } from "express"
import { ErrorStatus, Fileinfo, ProductType,product } from "../utils/types/userTypes";
import fs from 'fs'
import { Stream,Readable } from "stream"
import { Model } from "sequelize"

class productController {
    
    product_service: ProductServiceImplementation;
    
    public destination: string = "src/utils/upload/product"

    constructor(){
        this.product_service = new ProductServiceImplementation();
    }

    public createProduct = async( req : Request, res :Response)=>{
        let productdata = req.body;
        let file:Fileinfo | undefined = req.file; 
        if(productdata.name ==  null || productdata.name == undefined ||productdata.name == ""){
            res.status(404).json({error : "Product not found"})
        }else{
            try {
                if(file == null || file == undefined){
                    let response = await this.product_service?.createProduct(productdata)
                    if(response!=null||response!=undefined ){
                        res.status(200).json({message : "Product created successfully"})
                    }else{
                        res.status(404).json({error:"could not able to create product"})
                    }
                }else{
                    if(file.mimetype?.split("/")[1] == "jpg" || file.mimetype?.split("/")[1] == "png" || file.mimetype?.split("/")[1] == "jpeg"){
                        let stream = Readable.from(file.buffer as Buffer);
                        let filename = file.originalname?.replaceAll(" ","_");
                        let filePath = `${this.destination}/${filename?.split(".")[0]+"_"+this.getTimeStamp()+"."+filename?.split(".")[1]}`
                        let writer = fs.createWriteStream(filePath);
                        stream.pipe(writer);
                        let url = `${process.env.server}/${filePath}`
                        productdata["image"] = url;
                        let productResponse : product | { error ? : string,status ? : number } | any  = await this.product_service?.createProduct(productdata)
                        if(productResponse == null || productResponse == undefined){
                            res.status(400).json({error:"Something went wrong please try again"});
                        }
                       else if(productResponse.error || productResponse.status == 400){
                            res.status(productResponse.status as number).json({error:productResponse.error});
                        }
                        else{
                            res.status(200).json({message:`${productResponse.name} created succcesfully`,data: productResponse});
                        }
                    }
                } 
               
                    
            } catch (error:any) {
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

    public UpdateProduct = async(req : Request,res : Response ) => {
        let productdata = req.body;
        let id = req.params?.id;
        let file : Fileinfo = req.file as Fileinfo
        let destination = "src/utils/upload/product"
        let stream = new Stream()
        if(id == null || id == undefined){
            res.status(404).json({error : "please provide id to update"})
        }else{
            try{
                let isExist :  Model<ProductType,ProductType>|null|ErrorStatus|any = await this.product_service.GetProductById(id)
                if(isExist == null ||isExist == undefined){
                    res.status(400).json({error: "please select product properly"})
                }else{
                    if(file == null || file == undefined){
                        let productResponse : object | [affectedCount:number] |any = await this.product_service.UpdateProduct(id,productdata);
                        if(productResponse == null || productResponse == undefined){
                            res.status(400).json({error:"Something went wrong please try again"});
                        }
                        else if(productResponse.error || productResponse.status){
                            res.status(productResponse.status).json({error:productResponse.error});
                        }
                        else{
                            if(productResponse > 0){
                                res.status(200).json({message:"updated Sucessfully"});
                            }else{
                                res.status(200).json({message:"Couldnt updated please try again"});
                            }
                            
                        }
                    }else{
                        if(isExist.image == null || isExist.image == undefined || isExist.image == ""){
                            if(file.originalname?.split(".")[1] == "jpeg"||file.originalname?.split(".")[1] == "png"||file.originalname?.split(".")[1] == "jpg"){
                                let streamData = Readable.from(file.buffer as Buffer);
                                let filename = file.originalname?.replaceAll(" ","_");
                                let filepath = `${this.destination}/${filename?.split(".")[0]+"_"+this.getTimeStamp()+"."+filename?.split(".")[1]}`
                                let writer = fs.createWriteStream(filepath);
                                streamData.pipe(writer);
                                productdata.image = `${process.env.server}/${filepath}`
                                let updateResponse : object | [affectedCount:number] |any = await this.product_service.UpdateProduct(id,productdata);
                                if(updateResponse > 0){
                                    res.status(200).json({message:"Product updated successfully"})
                                }else{
                                    res.status(400).json({error_message:"error"})
                                }
                            }else{
                                res.status(400).json({error:"Please Select either png or jpg or jpeg file"})
                            }
                                
                        }else{
                            let imageName = isExist.image.split("/")
                            let filenamedata = imageName[imageName.length - 1]
                            fs.rm(`${destination}/${filenamedata}`,(error:unknown)=>{console.log(error)});
                            let streamData = Readable.from(file.buffer as Buffer);
                            let filename = file.originalname?.replaceAll(" ","_");
                            let filepath = `${this.destination}/${filename?.split(".")[0]+"_"+this.getTimeStamp()+"."+filename?.split(".")[1]}`
                            let writer = fs.createWriteStream(filepath);
                            streamData.pipe(writer);
                            productdata["image"] = `${process.env.server}/${filepath}`
                            let updateResponse: {error?:string,status?:number}|[ affectedCount?: number] | any = await this.product_service.UpdateProduct(id,productdata);
                            if(updateResponse > 0){
                                res.status(200).json({message:"product updated successfully"})
                            }else{
                                res.status(400).json({error:"couldn't update product"})
                            }
                        }
                    }
                }
            }catch(error : any){
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

    public GetProductById = async (req : Request,res:Response) => {
        let id = req.params.id;
        if(id == null || id == undefined){
            res.status(404).json({error:"please provide id"})
        }else{
            try {
                let productResponse : product | {error ?:string,status?:number } | null|any = await this.product_service?.GetProductById(id);
                if(productResponse == null || productResponse == undefined){
                    res.status(400).json({error:"Something went wrong please try again"});
                }
                else{
                    res.status(200).json({data: productResponse});
                }
            } catch (error : any) {
                res.status(400).json({error:error.message});
            }
        }
    }

    public GetAllProducts =  async (req : Request,res:Response) => {
        let page = req.query.page as unknown as number;
        let limit = req.query.limit as unknown as number;
        let keyword  = req.query.keyword as string
        let filterBy = req.query.filterBy as string

        keyword = keyword == null || keyword == undefined ? "" : keyword
        filterBy = filterBy == null || filterBy == undefined ? "" : filterBy

        try {
            let productResponse :{count : number,rows:object[]} | {error ?: string ,status?:number }|any = await this.product_service?.GetAllProduct(Number(page),limit,keyword,filterBy);
            if(productResponse == null || productResponse == undefined || page == undefined || limit == undefined||page == null || limit == null){
                res.status(400).json({error:"Something went wrong please try again"});
            }else{
                res.status(200).json({data : productResponse});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message});
        }
    }

    public DeleteProduct = async (req : Request,res:Response) => {
        let id : string = req.params?.id;
        try {
            let productResponse : ErrorStatus | any | number = await this.product_service?.DeleteProduct(id);
            if(productResponse == null || productResponse == undefined){
                res.status(400).json({error:"Something went wrong please try again"});
            }else if (productResponse.error || productResponse.status == 400){
                res.status(productResponse.status as number).json({error:productResponse.error});
            }else{
                res.status(200).json({message:"deleted Sucessfully"});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message})
        }
        
    }

    public BulkDeleteProduct = async (req : Request,res:Response) => {
        let ids : string[] = req.body.ids;
        let errors: string[] = [];
        let success:string[] = [];
        try {
            for await(let id of ids ){
                if(id != null || id != undefined || id != ""){
                    let isExist : product | { error?: string | undefined , status?: number | undefined }|any = await this.product_service?.GetProductById(id);
                    if(isExist !== null || isExist !== undefined){
                        let response : ErrorStatus | number | undefined = await this.product_service?.DeleteProduct(id);
                        if(response == undefined || response == null){
                            errors.push(`Please select the product properly to delete`);
                        }
                        else if(Number(response) > 0){
                            success.push(`${isExist.name} Deleted Sucessfully`);
                        }
                        else{
                            errors.push(`${isExist.name} couldn't Delete plese try again`);
                        }
                    }    
                }
            }
            if(errors.length > 0){
                res.status(400).json({error:errors});
            }else if(errors.length > 0,success.length > 0){
                res.status(400).json({success:success,error:errors});
            }else{
                res.status(400).json({success:success , message:"All Deleted Successfully"});
            }
        } catch (error:any) {
            res.status(400).json({error:error.message})
        }
    }  
    
    private getTimeStamp = () =>{
        return Math.floor(Date.now() / 1000)
    }
}


    
export default productController