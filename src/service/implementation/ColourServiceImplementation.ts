import IColourService from "../interface/IColourService";
import colourRespository from "../../repository/colourRepository";

class ColourServiceImplementation implements IColourService{
    
    repository: colourRespository;

    constructor(){
        this.repository = new colourRespository()
    }
    
    public createColour = async (colourData: object): Promise<object> =>{
        if(colourData == null || colourData == undefined){
            return {error:"colourData not found",status:400}
        }else{
            let response = await this.repository.createColour(colourData);
            return response;
        }
    }
    
    public UpdateColour= async (id: string, colourData: object): Promise<object| [ affectedCount?: number]> =>{
        if(id == null || id == undefined){
            return {error:"colour id is required",status:400}
        }else{
            let response : [affectedCount? : number] | object = await this.repository.UpdateColour(id,colourData);
            console.log(response);
            return response
        }
    }
       
    
    public GetColourById = async (id: string): Promise< object|null > => {
        if(id == null ||id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.GetColourById(id);
            return response;
        }
    }
    
    public GetAllColour = async (page: number, limit: number): Promise<{ rows: object[]; count: number; }>=> {
        if(page == null || page == undefined || limit == null || limit == undefined || page == 0 || limit == 0){
            page = 0;
            limit = 10;
        }
        let offset = (page - 1)*limit;
        let response = await this.repository.GetAllColour(offset,limit);
        return response;    
    }
    
    public GetColourByName = async (name: string): Promise<object[] | object> =>{
        if(name == null || name == undefined){
            return {error:"name is required",status:400}
        }else{
            let response = await this.repository.GetColourByName(name);
            return response;
        }
    }
    
    public DeleteColour = async (id: string): Promise<number | {error?:string,status?:number} | undefined> => {
        if(id == null || id == undefined){
            return {error:"id is required",status:400}
        }else{
            let response = await this.repository.DeleteColour(id);
            return response;
        }
        
    }
    
    public BulkDeleteColour = async (ids: string[]): Promise<number>=> {
        let response = await this.repository.BulkDeleteColour(ids);
        return response;
    }

};
export default ColourServiceImplementation