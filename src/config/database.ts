import {Sequelize} from "sequelize";
import dotenv from 'dotenv';
dotenv.config()

let database = new Sequelize(process.env.MySQL_DATABASE_NAME as string, process.env.MySQL_USERNAME as string, process.env.MySQL_PASSWORD as string, {
  host: "localhost",
  dialect: "postgres",
  define: {
    timestamps: false,
    freezeTableName: true,
  },
});
export default database;