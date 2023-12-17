interface IAuthService{

    CreateUser( userData : object | any ) : Promise<object>

    UpdateUser(id:string, userData : object | any ):Promise<object|[affectedCount?:number|undefined]>

    GetUserById(id:string):Promise< object | null >

    GetAllUsers(page:number,limit:number) : Promise<{rows:Array<object>; count: number}>

    GetUserByName(name:string) :Promise<object[] | object>

    DeleteUser(id:string) :Promise<number |object>

    BulkDeleteUsers (ids:string[]) : Promise<number>

}

export default IAuthService;