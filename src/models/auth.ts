import { Sequelize,DataTypes} from "sequelize";
import db from "../config/database";
import countries  from "../utils/countrysMasterFile";

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
            },
        },
    },
    password:{
        type:DataTypes.STRING,
        validate:{
            notEmpty:{
                msg:"Please provide a password"
            },
            notNull:{
                msg:"Please provide a password"
            }
        }
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
        type:DataTypes.NUMBER,
    },
    country:{
        type:DataTypes.ENUM,
        values:countries,
        get() {
            let country = this.getDataValue('country');
            let data = countries.includes(country)
            return data == false ?? "Invalid Country"
        },
    },
    city:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    type:{
        type:DataTypes.STRING,
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
export default auth