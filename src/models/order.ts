import {DataTypes} from "sequelize";
import db from "../config/database"; 
import order_status from "../utils/masterFiles/orderstatus";
import payment_status from "../utils/masterFiles/paymentstatus";
import database from "../config/database";

const order = db.define("orders",{
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
    address:{
        type:DataTypes.STRING,
        allowNull:true
    },
    product_no:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.ENUM,
        values:order_status,
        get() {
            let order_status = this.getDataValue('orderStatus');
            let data = order_status.includes(order_status)
            return(data == false ?"Invalid Country":order_status)
        }
    },
    payment_status:{
        type:DataTypes.ENUM,
        values:payment_status,
        get() {
            let payment_status = this.getDataValue('paymentStatus');
            let data = payment_status.includes(payment_status)
            return(data == false ?"Invalid Country":payment_status)
        }
    },
    GST_tax:{
        type:DataTypes.STRING
    },
    delivery_charges:{
        type:DataTypes.INTEGER
    },
    delivery_date:{
        type:DataTypes.DATE
    },
    order_date:{
        type:DataTypes.DATE
    },
    order_price:{
        type:DataTypes.STRING
    },
    discount_price:{
        type:DataTypes.STRING
    }
});
export default order;