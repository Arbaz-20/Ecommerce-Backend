import { Model } from "sequelize";
import { ErrorStatus,categoryType } from "../../utils/types/userTypes";

interface ICategoryService{

    CreateCategory( categoryData : object | any ) : Promise<object>

    UpdateCategory(id:string, categoryData : object | any ):Promise<object|[affectedCount?:number|undefined]>

    GetCategoryById(id:string):Promise<Model<categoryType>|null|ErrorStatus >

    GetAllCategories(page:number,limit:number,keyword:string) : Promise<{rows:Array<object>; count: number}>

    GetCategoryByName(name:string) :Promise<object[] | object>

    GetCategoryByEmail(email:string) :Promise<object|null>

    DeleteCategory(id:string) :Promise<number |object>

    BulkDeleteCategorys(ids:string[]) : Promise<number>

}

export default ICategoryService;