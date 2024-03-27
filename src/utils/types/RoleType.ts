import { permissionType } from "./userTypes"

export type roleType = {
    id?:string,
    name?:string,
    permissionId?:string,
    createdAt?:Date,
    updatedAt?:Date,
    permissions?:Array<permissionType> | undefined
}