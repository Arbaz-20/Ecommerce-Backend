interface IPermissionService{

    CreatePermission  ( PermissionData : object | any ) : Promise<object> 

    UpdatePermission (id:string,PermissionData : object | any ) : Promise<object> 

    UpdatePermissionByUserId(userId:string,PermissionData : object | any ) : Promise<[affectedCount: number]>

    GetPermissionById  (id:string):Promise< object | null > 

    getPermissionByUserId (userId:string):Promise<object|null>

    GetAllPermissions  (page:number,limit:number) : Promise<{rows:Array<object>; count: number}> 

    DeletePermission(id:string) :Promise<number> 

    DeletePermissionByUserId(userId:string) : Promise<number> 

    BulkDeletePermissionsByUserId  (userId:string[]) : Promise<number>

    BulkDeletePermissions (ids:string[]) : Promise<number>
}
export default IPermissionService