interface IAuthService{

    CreateUser( userData : object | any ) : Promise<object>

    UpdateUser(id:string, userData : object | any ):Promise<[affectedCount: number]>

    GetUserById(id:string):Promise< object | null >

    GetAllUsers(page:number,limit:number) : Promise<{rows:Array<object>; count: number}>

    GetUserByName(name:string) :Promise<object[] | [] >

    DeleteUser(id:string) :Promise<number>

    BulkDeleteUsers (ids:string[]) : Promise<number>

}

export default IAuthService;