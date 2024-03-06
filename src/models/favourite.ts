import {DataTypes, Model} from "sequelize";
import db from "../config/database";
import auth from "./auth";

const favourites = db.define('favourites',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4(),
        allowNull:false,
        primaryKey:true
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

export default favourites