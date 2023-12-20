import { Sequelize,DataTypes} from "sequelize";
import db from "../config/database";

const permission= db.define("auths",{
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
        defaultValue: Sequelize.fn('now')
    },
    updatedAt:{
        type:DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
    }
});
export default permission