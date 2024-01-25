const mongoose= require("mongoose");

const departmentSchema= new mongoose.Schema({

    departmentName:{
        type:String
        
    },
    departmentId:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports=mongoose.model("departmentSchema",departmentSchema);
