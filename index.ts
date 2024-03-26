import express from "express";
import dotenv from "dotenv";
import db from './src/config/database';
import cors from "cors";
import bodyParser from "body-parser";
import AuthRouter from "./src/routes/authRoutes";
import ProductRouter from "./src/routes/productRoutes";
import OrderRouter from "./src/routes/orderRoutes";
import CategoryRouter from "./src/routes/categoryRoutes";
import favouriteRouter from "./src/routes/favouriteRoutes";
import setAssociations from "./src/models/association";
import cartRouter from "./src/routes/cartRoutes";
import RoleRouter from "./src/routes/roleRoutes";


db.sync({alter:true}).then(()=>{
    console.log("Database is connected successfully");
}).catch((error)=>{
    console.log(error);
})
setAssociations()


dotenv.config()
let app = express()
let port = process.env.PORT

app.use(cors());
app.use(bodyParser())

app.use("/api/auth",AuthRouter);
app.use("/api/product",ProductRouter);
app.use("/api/order",OrderRouter);
app.use("/api/category",CategoryRouter);
app.use("/api/favourtie",favouriteRouter);
app.use("/api/cart",cartRouter)
app.use("/api/role",RoleRouter)

app.use("/src/utils/upload",express.static("src/utils/upload"))

app.listen(port, ()=>{
    console.log(`Server is accesssing on port : ${port}`);
})
