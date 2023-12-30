import { DataTypes} from "sequelize";
import db from "../config/database";

const product_order = db.define("product_order",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4(), 
        allowNull:false,
        primaryKey:true
    },

    productId:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4(),
        allowNull:false,
        primaryKey:true
    },

    orderId:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4(),
        allowNull:false,
        primaryKey:true
    },

    product_quantity:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4(),
        allowNull:false,
        primaryKey:true
    },

    product_colour:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4(),
        allowNull:false,
        primaryKey:true
    },
    discount:{
        type:DataTypes.FLOAT
    }
});

export default product_order;