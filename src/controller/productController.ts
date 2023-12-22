import ProductServiceImplementation from "../service/implementation/ProductServiceImplementation"
import { Request,Response } from "express"
import { ErrorStatus, Fileinfo, user } from "../utils/types/userTypes";

class productController {
    
    product_service: ProductServiceImplementation | undefined;

    constructor(){
        this.product_service = new ProductServiceImplementation();
    }

    public createProduct = async( req : Request, res :Response)=>{
        let productdata = req.body;
        let file:Fileinfo | undefined = req.file; 
        if(productdata.name ==  null || productdata.name == undefined){
            res.status(404).json({error : "Product not found"})
        }else{
            try {
                    let productResponse : user | { error ? : string,status ? : number } | any  = await this.product_service?.createProduct(productdata)
                    if(productResponse == null || productResponse == undefined){
                        res.status(400).json({error:"Something went wrong please try again"});
                    }
                    else if(productResponse.error || productResponse.status == 400){
                        res.status(productResponse.status as number).json({error:productResponse.error});
                    }
                    else{
                        res.status(200).json({message:"Sign Up Sucessfully",data: productResponse});
                    }
                    
            } catch (error:any) {
                res.status(400).json({errors : error.message});
            }
        }
    }

    public UpdateProduct = async(req : Request,res : Response ) => {
        let productData= req.body;
        let {id} = req.params;
        if(id == null || id == undefined){
            res.status(404).json({error : "please provide id to update"})
        }else{
            try{
                let isExist = await this.product_service?.GetProductById(id)
                if(isExist == null ||isExist == undefined){
                    res.status(400).json({error: "please select user properly"})
                }else{
                    let productResponse : object | [affectedCount:number] |any = await this.product_service?.UpdateProduct(id,productData);
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
                let productResponse : user | {error ?:string,status?:number } | null|any = await this.product_service?.GetProductById(id);
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
        try {
            let productResponse :{count : number,rows:object[]} | {error ?: string ,status?:number }|any = await this.product_service?.GetAllProduct(Number(page),limit);
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
                    let isExist : user | { error?: string | undefined , status?: number | undefined }|any = await this.product_service?.GetProductById(id);
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
}
    
    
export default productController