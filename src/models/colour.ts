import { DataTypes} from "sequelize";
import db from "../config/database";
import product from "./product";

const colour = db.define("colour",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4(), 
        allowNull:false,
        primaryKey:true
    },

    productId:{
        type:DataTypes.UUID,
        references:{
            model:product
        }    
    },

    colour:{
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

export default colour;