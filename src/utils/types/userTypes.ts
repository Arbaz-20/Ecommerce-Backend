export interface user {
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
    createdAt:Date,
    updatedAt:Date
}

export type ErrorStatus = {
    error?:string,
    status?:number
}

export interface Fileinfo{
    fieldname?:string,
    originalname?:string,
    encoding?:string
    mimetype?:string,
    buffer?:Buffer
}
