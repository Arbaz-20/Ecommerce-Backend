interface IProductService{

    createProduct(productData : object | any ) : Promise<object>

    Updateproduct(id:string,productData : object | any ):Promise<object|[affectedCount?:number|undefined]>

    GetProductById(id:string):Promise< object | null >

    GetAllProduct(page:number,limit:number) : Promise<{rows:Array<object>; count: number}>

    GetProductByName(name:string) :Promise<object[] | object>

    DeleteProduct(id:string) :Promise<number |object>

    BulkDeleteProduct (ids:string[]) : Promise<number>

}

export default IProductService;