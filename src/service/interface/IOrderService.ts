interface IOrderService{

 CreateOrder ( OrderData : object|any ) : Promise<object>

 UpdateOrder (id:string, OrderData : object|any ):Promise<[affectedCount?:number|undefined]>

 UpdateOrderStatus (id:string,Order_status:string):Promise<[affectedCount?: number | undefined]>

 UpdatePaymentStatus(id:string,paymentStatus:string):Promise<[affectedCount?: number | undefined]>

 GetOrderById (id:string):Promise< object | null |{error?:string,status?:number}>

 GetAllOrders (page:number,limit:number,keyword:string,filterBy:string) : Promise<{rows:Array<object>; count: number}>

 GetOrderByName (name:string) :Promise<object[] | object >
        
 DeleteOrder (id:string) :Promise<number> 

 BulkDeleteOrders (ids:string[]) :Promise<number> 


}

export default IOrderService;