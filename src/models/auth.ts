import { Sequelize,DataTypes} from "sequelize";
import db from "../config/database";
import countries  from "../utils/masterFiles/countrysMasterFile";
import Role from "./role";

const auth = db.define("auths",{
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
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        validate:{
            isEmail:{
                msg:"Invalid Email",
            }
        },
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:true
    },
    image:{
        type:DataTypes.STRING,
        allowNull:true
    },
    age:{
        type:DataTypes.INTEGER,
    },
    country:{
        type:DataTypes.STRING,
        values:countries,
        get() {
            let country = this.getDataValue('country');
            let data = countries.includes(country)
            return(data == false ?"Invalid Country":country)
        }
    },
    city:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    roleId:{
        references:{
            model:Role
        },
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
export default auth