
const express = require("express");
const cors = require('cors');
require("dotenv").config();

const app =  express();

app.use(cors());
app.enable("trust proxy");

app.use(express.json());

app.use("/auth",require("./routes/AuthRoutes"));
app.use("/proyect",require("./routes/proyectRoutes"));
app.use("/information",require("./routes/InfoRoutes"));
app.use("/module",require("./routes/moduleRoutes"));
app.use("/comment",require("./routes/CommentRoutes"));



const puerto  = 3004;

app.listen(
     
    process.env.PORT || puerto,
    console.log("el servidor esta corriendo en el puerto " + puerto.toString())
  );

app.get("/",function(req,resp){
    resp.send("Default page");
});