import { Sequelize,DataTypes} from "sequelize";
import db from "../config/database";
import countries  from "../utils/masterFiles/countrysMasterFile";

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
        // validate:{
        //     notEmpty:{
        //         msg:"Please provide a password"
        //     },
        //     notNull:{
        //         msg:"Please provide a password"
        //     }
        // },
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
export default auth