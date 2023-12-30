import { DataTypes} from "sequelize";
import db from "../config/database";

const colour = db.define("colour",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4(), 
        allowNull:false,
        primaryKey:true
    },

    productId:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4(),
        allowNull:false,
        primaryKey:true
    },

    colour:{
        type:DataTypes.STRING
    }

});

export default colour;