import { Sequelize,DataTypes} from "sequelize";
import db from "../config/database";
import auth from "./auth";

const permissions = db.define("permissions",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4(), 
        allowNull:false,
        primaryKey:true
    },
    create:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    edit:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    update:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    delete:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    },
    view:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
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
export default permissions