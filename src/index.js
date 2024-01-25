const express = require("express");
const mongoose = require('mongoose')
const app = express();
// const userModel = require("./Modal/departmentModal");
const userRoutes = require("./Routes/systemRoutes");

app.use(express.json());

app.use("/", userRoutes);



mongoose.connect("mongodb://127.0.0.1:27017/boppoManagementDB").then(() => {
    console.log("DataBase Connected Succesfully !");
}).catch((err) => {
    console.log(err);
})

app.listen(3000, () => {
    console.log(`Server Running on ${3000}`)
})

