interface ICartService {
     
    createCart (cartdata: object): Promise<object>

    updateCart(id: string, cartdata: object): Promise<[affectedCount?:number|undefined]>

    GetCartById(id: string): Promise<object | null |{error?:string,status?:number}>

    GetCartByUserId (user_id:string):Promise<{rows:Array<object>; count:number}>

    GetAllCarts(page:number,limit:number): Promise<{rows:Array<object>; count: number}>

    GetCartByName(name:string): Promise<object[]|[]>

    DeleteCart(id:string): Promise<number>

    BulkDeleteCarts(ids:string[]):Promise<number>

}

export default ICartService;