import IOrderService from "../interface/IOrderService";
import OrderRepository from "../../repository/orderRepository";
import order_status from "../../utils/masterFiles/orderstatus";

class OrderServiceImplementation implements IOrderService {

    repository: OrderRepository;

    constructor(){
        this.repository = new OrderRepository()
    }

    public CreateOrder= async(OrderData: any): Promise<object> =>{
        if(OrderData == null || OrderData == undefined){
            return {error:"userdata not found",status:400}
        }else{
            let response = await this.repository.CreateOrder(OrderData);
            return response;
        }
    }
    public UpdateOrder=async(id: string, OrderData: any): Promise<[affectedCount?: number | undefined]|any> =>{
        if(id == null || id == undefined){
            return {error:"user id is required",status:400}
        }else{
            let response : [affectedCount? : number] | object = await this.repository.UpdateOrder(id,OrderData);
            console.log(response);
            return response
        }
    }
    public UpdateOrderStatus = async(id:string,Order_status:string):Promise<[affectedCount?: number | undefined]|any>=>{
        if(id == null || id == undefined){
            return{error:"user id is required",status:400}
        }else{
            let response : [affectedCount? : number]= await this.repository.UpdateOrderStatus(id,Order_status);
            return response
        }
    }
    public UpdatePaymentStatus = async(id:string,paymentStatus:string):Promise<[affectedCount?: number | undefined]|any>=>{
        if(id == null || id == undefined){
            return{error:"user id is required",status:400}
        }else{
            let response : [affectedCount? : number]= await this.repository.UpdatePaymentStatus(id,paymentStatus);
            return response
        }
    }
    public GetOrderById = async(id: string): Promise<object | { error?: string | undefined; status?: number | undefined; } | null> =>{
        if(id == null ||id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.GetOrderById(id);
            return response;
        }
    }
    public GetAllOrders = async(page: number, limit: number,keyword:string,filterBy:string): Promise<{ rows: object[]; count: number; }> =>{
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 0;
            limit = 10;
        }
        let offset = (page - 1)*limit;
        let response = await this.repository.GetAllOrders(offset,limit,keyword,filterBy);
        return response;   
    }
    public GetOrderByName = async(name: string): Promise<object[] | object> =>{
        if(name == null || name == undefined){
            return {error:"name is required",status:400}
        }else{
            let response = await this.repository.GetOrderByName(name);
            return response;
        }
    }
    public DeleteOrder = async(id: string): Promise<number| {error?:string,status?:number}|any>=> {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.DeleteOrder(id);
            return response;
        }
    }
    public BulkDeleteOrders = async(ids: string[]): Promise<number>=> {
        let response = await this.repository.BulkDeleteOrders(ids);
        return response;
    }
    
};
export default OrderServiceImplementation;