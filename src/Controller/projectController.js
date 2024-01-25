// let DepartmentModal = require("../Modal/")

const departmentModal = require("../Modal/departmentModal");
const projectModal = require("../Modal/projectModal");

// const bcrypt = require("bcrypt")
// const validator = require('validator');

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Creating Department  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

const createProject = async function (req, res) {

    let data = req.body;
    console.log("Create department --->", data);

    try {
        if (Object.keys(data).length != 0) {
            if (data.projectName.trim() !== "") {
let countProject = await projectModal.find();
                let obj ={
                    projectName:data.projectName,
                    projectId:  `PR0${countProject.length++}`
                }


                let saveProject = await projectModal.create(obj);
                return res.status(201).send({ message: "Project Created Succesfully !", Data: saveProject })


            } else {
                return res.status(404).send({ message: "Please send correct Project name !" })
            }

        } else {
            return res.status(404).send({ message: "Please send proper information" })
        }



    } catch (err) {
        console.log("Erroe=======>", err)
        return res.status(500).send({ message: "Internal Server Error" })
    }

}


const getAllProject = async function (req, res) {
    console.log("Inside Gett Department ");

    let Data = await projectModal.find();

    return res.status(200).send({ message: "project Details !", data: Data })


}


const uploadFile = async function (req,res){
const checkFile = req.files;

console.log(checkFile)
return res.status(200).send({ message: "project Details !" })


}

module.exports = { createProject, getAllProject,uploadFile }