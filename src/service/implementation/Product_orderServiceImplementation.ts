import IProduct_orderService from "../interface/IProduct_orderService";
import product_orderRepository from "../../repository/product_orderRepository";
import { productOrderData } from "../../utils/types/orderTypes";
import { ErrorStatus } from "../../utils/types/userTypes";
import { Model } from "sequelize";
class Product_orderServiceImplementation implements IProduct_orderService{

    repository: product_orderRepository;
    constructor(){
        this.repository = new product_orderRepository()
    }


    public createProduct_order = async (product_orderData: object): Promise<productOrderData |ErrorStatus> =>{
        if(product_orderData == null || product_orderData == undefined){
            return {error:"product_orderData not found",status:400}
        }else{
            let response :object = await this.repository.createProduct_order(product_orderData);
            return response as productOrderData;
        }
    }

    public UpdateProduct_order= async (id: string, product_orderData: object): Promise<object| [ affectedCount?: number]> =>{
        if(id == null || id == undefined){
            return {error:"product_order id is required",status:400}
        }else{
            let response : [affectedCount? : number] | object = await this.repository.UpdateProduct_order(id,product_orderData);
            console.log(response);
            return response
        }
    }
       
    
    public GetProductById_order = async (id: string): Promise< object|null > => {
        if(id == null ||id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.GetProductById_order(id);
            return response;
        }
    }
    
    public GetAllProduct_order = async (page: number, limit: number): Promise<{ rows: object[]; count: number; }>=> {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 0;
            limit = 10;
        }
        let offset = (page - 1)*limit;
        let response = await this.repository.GetAllProduct_order(offset,limit);
        return response;    
    }
    
    public GetProduct_orderByName = async (name: string): Promise<object[] | object> =>{
        if(name == null || name == undefined){
            return {error:"name is required",status:400}
        }else{
            let response = await this.repository.GetProduct_orderByName(name);
            return response;
        }
    }
    
    public DeleteProduct_order = async (id: string): Promise<number | {error?:string,status?:number} | undefined> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.DeleteProduct_order(id);
            return response;
        }

    }

    public DeleteProduct_orderByOrderId = async (orderId: string): Promise<number | {error?:string,status?:number} | undefined> => {
        if(orderId == null || orderId == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.DeleteProduct_orderByOrderId(orderId);
            return response;
        }

    }

    public BulkDeleteProduct_order = async (ids: string[]): Promise<number>=> {
        let response = await this.repository.BulkDeleteProduct_order(ids);
        return response;
    }
};
export default Product_orderServiceImplementation