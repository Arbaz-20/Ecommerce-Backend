import {DataTypes, Sequelize} from "sequelize";
import db from "../config/database"; 
import order_status from "../utils/masterFiles/orderstatus";
import payment_status from "../utils/masterFiles/paymentstatus";


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
    order_status:{
        type:DataTypes.ENUM,
        values:order_status,
        get() {
            let order_status:string = this.getDataValue('order_status');
            let data = order_status.includes(order_status)
            return(data == false ? "Invalid status": order_status)
        },
        defaultValue:"waiting for confirmation"
    },
    payment_status:{
        type:DataTypes.ENUM,
        values:payment_status,
        // get() {
        //     // let payment_status= this.getDataValue('payment_status');
        //     let data = payment_status.includes(payment_status)
        //     return(data == false ?"invalid status":payment_status)
        // }
    },
    delivery_charges:{
        type:DataTypes.INTEGER
    },
    delivery_date:{
        type:DataTypes.DATE,
    },
    order_date:{
        type:DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
    },
    total_price:{
        type:DataTypes.STRING
    },
    discount_price:{
        type:DataTypes.STRING
    },
    GST_tax:{
        type:DataTypes.STRING
    },
    final_price:{
        type:DataTypes.FLOAT
    },
    total_discount :{
        type:DataTypes.FLOAT
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
export default order;