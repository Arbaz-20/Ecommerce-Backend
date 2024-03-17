import { DataTypes} from "sequelize";
import db from "../config/database";
import product from "./product";
import order from "./order";
const product_order = db.define("product_order",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4(), 
        allowNull:false,
        primaryKey:true
    },
    productId:{
        type:DataTypes.UUID,
        references:{
            model:product,
            key:"id"
        }
    },
    orderId:{
        type:DataTypes.UUID,
    },
    product_quantity:{
        type:DataTypes.BIGINT
    },
    product_colour:{
        type:DataTypes.STRING
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue: db.literal('CURRENT_TIMESTAMP')
    },
    updatedAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue: db.literal('CURRENT_TIMESTAMP')
    }
});
export default product_order;