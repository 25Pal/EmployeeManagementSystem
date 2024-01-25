const { ObjectId } = require("mongodb");
const mongoose= require("mongoose");

const employeeSchema= new mongoose.Schema({

    employeeFirstName:{
        type:String
        
    },
    employeeLastName:{
        type:String

    },
    employeeId:{
        type:String
    },
    age:{
        type:String

    },
    departmentId :{
        type:String
        

    },
    departmentObjectId :{
        type:mongoose.Types.ObjectId,
        ref:"departmentSchema"


    },
   projectObjectId :{
        type:mongoose.Types.ObjectId,
        ref:"departmentSchema"


    },

    projectId :{
        type:String
       
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports=mongoose.model("employeeSchema",employeeSchema);
