import { Sequelize,DataTypes} from "sequelize";
import db from "../config/database";

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
    colour:{
        type:DataTypes.STRING
    },
    description:{
        type:DataTypes.STRING
    },
    price:{
        type:DataTypes.FLOAT
    },
    createdAt:{
        type:DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
    },
    updatedAt:{
        type:DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
    }
})
export default product;