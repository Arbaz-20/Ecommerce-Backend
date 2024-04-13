import IProductService from "../interface/IProductService";
import productRepository from "../../repository/productRepository";
import { ErrorStatus } from "../../utils/types/userTypes";
class ProductServiceImplementation implements IProductService{
    
    repository: productRepository;

    constructor(){
        this.repository = new productRepository()
    }
    public createProduct = async (productData: any): Promise<object> =>{
        if(productData == null || productData == undefined){
            return {error:"productData not found",status:400}
        }else{
            let response = await this.repository.createProduct(productData);
            return response;
        }
    }
    
    public UpdateProduct= async (id: string, productData: any): Promise<{error?:string,status?:number}|[ affectedCount?: number]> =>{
        if(id == null || id == undefined){
            return {error:"product id is required",status:400}
        }else{
            let response : [affectedCount? : number]  = await this.repository.UpdateProduct(id,productData);
            console.log(response);
            return response
        }
    }
       
    
    public GetProductById = async (id: string): Promise< object|null > => {
        if(id == null ||id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.GetProductById(id);
            return response;
        }
    }
    
    public GetProductNameById = async (id: string): Promise< object|null > => {
        if(id == null ||id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.GetProductNameById(id);
            return response;
        }
    }

    public GetAllProduct = async (page: number, limit: number,keyword:string,filterBy:string): Promise<{ rows: object[]; count: number; }>=> {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 0;
            limit = 10;
        }
        let offset = (page - 1)*limit;
        let response = await this.repository.GetAllProduct(offset,limit,keyword,filterBy);
        return response;    
    }
    
    public GetProductByName = async (name: string): Promise<object[] | object> =>{
        if(name == null || name == undefined){
            return {error:"name is required",status:400}
        }else{
            let response = await this.repository.GetProductByName(name);
            return response;
        }
    }
    
    public DeleteProduct = async (id: string): Promise<number | {error?:string,status?:number} | undefined> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.DeleteProduct(id);
            return response;
        }
        
    }
    
    public BulkDeleteProduct = async (ids: string[]): Promise<number>=> {
        let response = await this.repository.BulkDeleteProduct(ids);
        return response;
    }

}
export default ProductServiceImplementation;