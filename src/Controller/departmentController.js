// let DepartmentModal = require("../Modal/")

const departmentModal = require("../Modal/departmentModal");

// const bcrypt = require("bcrypt")
// const validator = require('validator');

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Creating Department  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

const createDepartment = async function (req, res) {
    
let data = req.body ;
console.log("Create department --->", data);

try{
    if(Object.keys(data).length !=0 ){
        if(data.departmentName.trim()!== ""){

            let countDepartment = await departmentModal.find();

           let obj ={
            departmentName : data.departmentName,
            departmentId:`DP0${countDepartment.length++}`,


           }

            let saveDepartment = await departmentModal.create(obj);
            return res.status(201).send({message:"Department Create Succesfully !", Data:saveDepartment})


        }else{
            return res.status(404).send({message:"Please send correct deppartment name !"})
        }

    }else{
        return res.status(404).send({message:"Please send proper information"})
    }



}catch(err){
    console.log("Erroe=======>",err)
return res.status(500).send({message:"Internal Server Error"})
}

}


const getAllDepartment = async function(req,res){
console.log("Inside Gett Department ");

let Data = await departmentModal.find();

return res.status(200).send({message:"Department Details !", data :Data})


}


module.exports ={createDepartment,getAllDepartment}