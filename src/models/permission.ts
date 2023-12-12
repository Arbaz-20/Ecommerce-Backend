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
        allowNull:true   
    },
    edit:{
        type:DataTypes.BOOLEAN,
        allowNull:true
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