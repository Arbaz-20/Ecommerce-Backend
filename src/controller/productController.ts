import ProductServiceImplementation from "../service/implementation/ProductServiceImplementation"
import { Request,Response } from "express"
import { ErrorStatus, Fileinfo, user } from "../utils/types/userTypes";

class productController {
    print() {
        throw new Error("Method not implemented.");
    }
    product_service: ProductServiceImplementation | undefined;

    constructor(){
        this.product_service = new ProductServiceImplementation();
    }

    public createProduct=async( req : Request, res :Response)=>{
        let userdata = req.body;
        let file:Fileinfo | undefined = req.file; 
        if(userdata.name ==  null || userdata.name == undefined){
            res.status(404).json({error : "Product not found"})
        }else{
            try {
                    let userResponse : user | { error ? : string,status ? : number } | any  = await this.product_service?.createProduct(userdata)
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
                res.status(400).json({errors : error.message});
                
            }
              
            }
        }
        public UpdateProduct = async(req : Request,res : Response ) => {
            let userData = req.body;
            let {id} = req.params;
            if(id == null || id == undefined){
                res.status(404).json({error : "please provide id to update"})
            }else{
                try{
                    let isExist = await this.product_service?.GetProductById(id)
                    if(isExist == null ||isExist == undefined){
                        res.status(400).json({error: "please select user properly"})
                    }else{
                        let userResponse : object | [affectedCount:number] |any = await this.product_service?.UpdateProduct(id,userData);
                        if(userResponse == null || userResponse == undefined){
                            res.status(400).json({error:"Something went wrong please try again"});
                        }
                        else if(userResponse.error || userResponse.status){
                            res.status(userResponse.status).json({error:userResponse.error});
                        }
                        else{
                            if(userResponse > 0){
                                res.status(200).json({message:"updated Sucessfully"});
                            }else{
                                res.status(200).json({message:"Couldnt updated please try again"});
                            }
                            
                        }
                    }
                }catch(error : any){
                     res.status(400).json({errors:error.message});
                } 
            }
        }
        public GetProductById = async (req : Request,res:Response) => {
            let id = req.params.id;
            if(id == null || id == undefined){
                res.status(404).json({error:"please provide id"})
        }else{
                try {
                    let userResponse : user | {error ?:string,status?:number } | null|any = await this.product_service?.GetProductById(id);
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
        public GetAllProducts =  async (req : Request,res:Response) => {
            let page = req.query.page as unknown as number;
            let limit = req.query.limit as unknown as number;
            try {
                let userResponse :{count : number,rows:object[]} | {error ?: string ,status?:number }|any = await this.product_service?.GetAllProduct(Number(page),limit);
                if(userResponse == null || userResponse == undefined || page == undefined || limit == undefined||page == null || limit == null){
                    res.status(400).json({error:"Something went wrong please try again"});
                }else{
                    res.status(200).json({data : userResponse});
                }
            } catch (error:any) {
                res.status(400).json({error:error.message});
            }
        }
        public DeleteProduct = async (req : Request,res:Response) => {
            let id : string = req.params?.id;
            try {
                let userResponse : ErrorStatus<object> | any | number = await this.product_service?.DeleteProduct(id);
                if(userResponse == null || userResponse == undefined){
                    res.status(400).json({error:"Something went wrong please try again"});
                }else if (userResponse.error || userResponse.status == 400){
                    res.status(userResponse.status as number).json({error:userResponse.error});
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
                if(errors.length > 0){
                    res.status(400).json({error:errors});
                }else if(errors.length > 0,success.length > 0){
                    res.status(400).json({success:success,error:errors});
                }else{
                    res.status(400).json({message:"All Deleted Successfully"});
                }
            } catch (error:any) {
                res.status(400).json({error:error.message});
            }
            
        }    
    }
    
    
export default productController