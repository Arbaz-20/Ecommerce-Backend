import { Sequelize,DataTypes} from "sequelize";
import db from "../config/database";

const category = db.define("category",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4(), 
        allowNull:false,
        primaryKey:true
    },
    category_name:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    type:{
        type:DataTypes.STRING,
        allowNull:false
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

export default category