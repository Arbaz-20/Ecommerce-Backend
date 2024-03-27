import {DataTypes} from "sequelize";
import db from "../config/database";

const Role = db.define("roles",{
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
    permissionId:{
        type:DataTypes.UUID,
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

export default Role;