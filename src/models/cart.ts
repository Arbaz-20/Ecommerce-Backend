import {DataTypes} from "sequelize";
import db from "../config/database";


const cart = db.define(`cart`,{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4(), 
        allowNull:false,
        primaryKey:true
    },
    user_id:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    price:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    quantity:{
        type:DataTypes.BIGINT,
        allowNull:false
    },
    date:{
        type:DataTypes.DATE,
        defaultValue:new Date().toISOString()
    },
    orderId:{
        type:DataTypes.UUID,
        allowNull:true
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

export default cart;
