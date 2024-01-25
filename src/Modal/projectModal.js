const mongoose= require("mongoose");

const projectSchema= new mongoose.Schema({

    projectName:{
        type:String
        
    },
    projectId:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports=mongoose.model("projectSchema",projectSchema);
