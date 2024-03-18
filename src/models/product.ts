import { Sequelize,DataTypes} from "sequelize";
import db from "../config/database";
import colour from "./colour";

const product = db.define("product",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4(), 
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        validate:{
            notEmpty:{
                msg:"Name cannot be empty"
            },
            notNull:{
                msg:"Name cannot be empty"
            }
        },
        unique:true,
        allowNull:false
    },
    image:{
        type:DataTypes.STRING,
        allowNull:true
    },
    quantity:{
        type:DataTypes.INTEGER
    },
    description:{
        type:DataTypes.STRING
    },
    price:{
        type:DataTypes.FLOAT
    },
    discount:{
        type:DataTypes.FLOAT,
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
})
export default product;