import IColourService from "../interface/IColourService";
import colourRespository from "../../repository/colourRepository";

class ColourServiceImplementation implements IColourService{
    
    repository: colourRespository;

    constructor(){
        this.repository = new colourRespository()
    }
    
    createColour(colourData: any): Promise<object> {
        throw new Error("Method not implemented.");
    }

    UpdateColour(id: string, colourData: any): Promise<object | [affectedCount?: number | undefined]> {
            throw new Error("Method not implemented.");
    }

    GetColourById(id: string): Promise<object | null> {
            throw new Error("Method not implemented.");
    }

    GetAllColour(page: number, limit: number): Promise<{ rows: object[]; count: number; }> {
            throw new Error("Method not implemented.");
    }

    GetColourByName(name: string): Promise<object | object[]> {
            throw new Error("Method not implemented.");
    }

    DeleteColour(id: string): Promise<number | { error?: string | undefined; status?: number | undefined; } | undefined> {
            throw new Error("Method not implemented.");
    }

    BulkDeleteColour(ids: string[]): Promise<number> {
            throw new Error("Method not implemented.");
    }
}
export default ColourServiceImplementation