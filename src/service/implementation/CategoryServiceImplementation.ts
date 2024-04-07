import ICategoryService from "../interface/ICategoryService";
import categoryRepository from "../../repository/categoryRepository";
import { ErrorStatus, categoryType } from "../../utils/types/userTypes";
import { Model } from "sequelize";

class CategoryServiceImplementation implements ICategoryService{

    repository: categoryRepository;

    constructor(){
        this.repository = new categoryRepository()
    }
   
    public CreateCategory = async(categoryData: any): Promise<object>=> {
        if(categoryData.category_name == null || categoryData.category_name == undefined){
            return {error:"Category's Name is required",status:400}
        }else{
            let response = await this.repository.CreateCategory(categoryData);
            return response as categoryType;
        }
    }
    public UpdateCategory=async (id: string, categoryData: any): Promise<object | [affectedCount?: number | undefined]> =>{
        if(id == null || id == undefined){
            return {error:"Please Select user to update",status:400} as ErrorStatus;
        }else{
            if(categoryData.name == null || categoryData.name == undefined){
                let response : [affectedCount? : number] = await this.repository.UpdateCategory(id,categoryData);
                return response               
            }else{
                let response : [affectedCount?:number|undefined] = await this.repository.UpdateCategory(id,categoryData);
                return response;
            }
        }
    }
    public GetCategoryById=async (id: string): Promise<ErrorStatus | Model<categoryType, categoryType> | null>=> {
        if(id == null ||id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.GetCategoryById(id);
            return response;
        }
    }
    public GetAllCategories = async (page: number, limit: number,keyword:string): Promise<{ rows: object[]; count: number; }>=> {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 0;
            limit = 10;
        }
        let offset = (page - 1)*limit;
        let response = await this.repository.GetAllCategories(offset,limit,keyword);
        return response;   
    }
    public GetCategoryByName = async (name: string): Promise<object | object[]> =>{
        if(name == null || name == undefined){
            return {error:"name is required",status:400}
        }else{
            let response = await this.repository.GetCategoryByName(name);
            return response;
        }
    }
    public GetCategoryByEmail=async (email: string): Promise<object | null> =>{
        let response = await this.repository.GetCategoryByEmail(email);
        return response as categoryType;
    }
    public DeleteCategory=async (id: string): Promise<number | object> =>{
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.DeleteCategory(id);
            return response;
        }
    }
    public BulkDeleteCategorys=async (ids: string[]): Promise<number> =>{
        let response = await this.repository.BulkDeleteCategory(ids);
        return response;
    }

}
export default CategoryServiceImplementation