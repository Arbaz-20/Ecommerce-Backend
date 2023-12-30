import IProduct_orderService from "../interface/IProduct_orderService";
import product_orderRepository from "../../repository/product_orderRepository";
class Product_orderServiceImplementation implements IProduct_orderService{
    
    repository: product_orderRepository;

    constructor(){
        this.repository = new product_orderRepository()
    }

    createProduct_order(product_orderData: any): Promise<object> {
        throw new Error("Method not implemented.");
    }
    
    UpdateProduct_order(id: string, product_orderData: any): Promise<object | [affectedCount?: number | undefined]> {
        throw new Error("Method not implemented.");
    }

    GetProductById_order(id: string): Promise<object | null> {
        throw new Error("Method not implemented.");
    }

    GetAllProduct_order(page: number, limit: number): Promise<{ rows: object[]; count: number; }> {
        throw new Error("Method not implemented.");
    }

    GetProduct_orderByName(name: string): Promise<object | object[]> {
        throw new Error("Method not implemented.");
    }

    DeleteProduct_order(id: string): Promise<number | { error?: string | undefined; status?: number | undefined; } | undefined> {
        throw new Error("Method not implemented.");
    }
    
    BulkDeleteProduct_order(ids: string[]): Promise<number> {
        throw new Error("Method not implemented.");
    }
};
export default Product_orderServiceImplementation