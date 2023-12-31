interface IColourService{

    createColour(colourData : object  ) : Promise<object>

    UpdateColour(id:string,colourData : object | any ):Promise<object|[affectedCount?:number|undefined]>

    GetColourById(id:string):Promise< object | null >

    GetAllColour(page:number,limit:number) : Promise<{rows:Array<object>; count: number}>

    GetColourByName(name:string) :Promise<object[] | object>

    DeleteColour(id:string) :Promise<number |{error?:string,status?:number}|undefined>

    BulkDeleteColour (ids:string[]) : Promise<number>

}

export default IColourService;