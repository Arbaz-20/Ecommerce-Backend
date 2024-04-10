import { roleType } from "./RoleType"

export type user = {
    id ?:string,
    name:string,
    age:number,
    email:string,
    password:string,
    country:Enumerator,
    type:Enumerator,
    image:string,
    city:string,
    address:string,
    roleId:string,
    createdAt:Date,
    updatedAt:Date,
}

export type UserType = {
    name:string,
    age:number,
    email:string,
    password:string,
    country:Enumerator,
    type:Enumerator,
    image?:string,
    city:string,
    address:string,
    permission?:string|undefined
    roleId?:string
    role:Array<roleType>
}

export type permissionType = {
    id?:string,
    create:boolean,
    update:boolean,
    edit:boolean,
    delete:boolean,
    view:boolean,
    authId?:string,
}

export type ErrorStatus = {
    error?:string,
    status?:number
}

export type Fileinfo = {
    fieldname?:string,
    originalname?:string,
    encoding?:string
    mimetype?:string,
    buffer?:Buffer | undefined
}

export type DataInfo = {
    message?:string,
    status?:number
}

export type product = {
    id ?:string,
    name:string,
    image?:string,
    quantity?:number,
    colour?:string,
    description?:string,
    price?:number
    createdAt:Date,
    updatedAt:Date,
}
export type ProductType = {
    name:string,
    image?:string,
    quantity?:number,
    colour?:string,
    description?:string,
    price?:number,
    discount?:number
}

export type UpdateReturn = {
    affectedCount?:number,
    error?:string,
    status?:number
}

export type categoryType={
    id ?:string,
    name:string,
    description?:string,
    type?:string
}