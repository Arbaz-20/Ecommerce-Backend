import express from "express";
import dotenv from "dotenv";
import db from './src/config/database';
import cors from "cors";
import bodyParser from "body-parser";
import AuthRouter from "./src/routes/authRoutes";


db.sync({alter:true}).then(()=>{
    console.log("Database is connected successfully");
}).catch((error)=>{
    console.log(error);
})


dotenv.config()
let app = express()
let port = process.env.PORT

app.use(cors());
app.use(bodyParser())
app.use("/api/auth",AuthRouter);


app.listen(port, ()=>{
    console.log(`Server is accesssing on port : ${port}`);
})