

const departmentModal = require("../Modal/departmentModal");
const employeeModal = require("../Modal/employeeModal");
const projectModal = require("../Modal/projectModal");

// const bcrypt = require("bcrypt")
// const validator = require('validator');

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Creating Department  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\\

const createEmployee = async function (req, res) {

    let data = req.body;
    console.log("Create department --->", data);

    try {
        if (Object.keys(data).length != 0) {

            if (data.fname.trim() !== "" && data.lname.trim() !== "" && data.age.trim() !== "") {

                let countEmployee = await employeeModal.find();

                let obj = {
                    employeeFirstName: data.fname,
                    employeeLastName: data.lname,
                    age: data.age,
                    employeeId: `EMP00${countEmployee.length++}`

                }

                if (data.departmentName && data.departmentName.trim() != "") {
                    let findDepartment = await departmentModal.findOne({ departmentName: data.departmentName })
                    obj.departmentId = findDepartment.departmentId;
                    obj.departmentObjectId = findDepartment._id
                } else {
                    return res.status(404).send({ message: "Please Select Department !" })

                }

                if (data.projectName && data.projectName.trim() != "") {
                    let findProject = await projectModal.findOne({ projectNameName: data.projectName })
                    obj.projectId = findProject.projectId;
                    obj.projectObjectId = findProject._id;
                } else {
                    obj.projectId = "";

                    // obj.projectObjectId = "";

                }

                let saveEmployee = await employeeModal.create(obj);
                return res.status(201).send({ message: "Employee save succesfully ", data: saveEmployee })

            } else {
                return res.status(404).send({ message: "Field is missing " })


            }


        } else {
            return res.status(404).send({ message: "Please send proper information" })
        }



    } catch (err) {
        console.log("Erroe=======>", err)
        return res.status(500).send({ message: "Internal Server Error" })
    }

}



// app.get("/employees", async (req, res) => {
//     try {
//       const { employeeId, searchquery } = req.query;

//       // Build the query based on filters
//       const query = {
//         $or: [
//           { employeeId: employeeId },
//           { employeeFirstName: { $regex: new RegExp(searchquery, "i") } },
//           { employeeLastName: { $regex: new RegExp(searchquery, "i") } },
//           { departmentName: { $regex: new RegExp(searchquery, "i") } },
//           { "currentlyWorkingProject.projectName": { $regex: new RegExp(searchquery, "i") } }
//         ]
//       };

//       // Execute the query
//       const employees = await Employee.find(query);

//       res.json(employees);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });

const getAllEmployee = async function (req, res) {
    // console.log("Inside Get Department ");

    let ListofEmployee = await employeeModal.find();

    return res.status(200).send({ message: "Employee list !", data: ListofEmployee })


}




const getEmployeeDeatils = async function (req, res) {
    try {
        const { employeeId, searchquery } = req.query;

        // Build the employee query based on filters
        const employeeQuery = {
            $or: [
                { employeeId: employeeId }
            ]
        };

        if (searchquery) {
            // If there's a search query, add conditions for regex matching
            employeeQuery.$or.push(
                { employeeFirstName: { $regex: new RegExp(searchquery, "i") } },
                { employeeLastName: { $regex: new RegExp(searchquery, "i") } },
                { employeeId: { $regex: new RegExp(searchquery, "i") } }
            );
        }

        console.log("employeeId", employeeId, "searchquery", searchquery, "employeeQuery ", employeeQuery);

        const employeeDetails = await employeeModal.findOne(employeeQuery);
        let departmentDetails = "";
        let projectDetails = "";
        if (employeeDetails) {
            departmentDetails = await departmentModal.findOne({ departmentId: employeeDetails.departmentId }).select({ departmentName: 1, departmentId: 1 });
            console.log("departmentDetails", employeeDetails)
        }

        if (employeeDetails) {
            projectDetails = await projectModal.findOne({ projectId: employeeDetails.projectId }).select({ projectName: 1, projectId: 1 });

        }




        const combinedResponse = {
            message: "Employee Details with Department and Project Info!",
            data: {
                employees: employeeDetails,
                departments: departmentDetails,
                projects: projectDetails || "Project Not alloted"
            }
        };

        // Return the response
        return res.status(200).send(combinedResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


const assignProject = async function (req, res) {

    let data = req.body;

    try {
        let getProjectData = ""
        if ((req.body.projectName || req.body.projectId) && req.body.employeeName) {

            if (req.body.projectName) {


                getProjectData = await projectModal.findOne({ projectName: req.body.projectName });


            } else if (req.body.projectId) {
                getProjectData = await projectModal.findOne({ projectId: req.body.projectId });
            } else {
                return res.status(404).send({ message: "Please Assign Project" })
            }
            console.log("getProjectData",getProjectData,req.body.employeeName)

            if (getProjectData) {
                let findEmp = await employeeModal.findOneAndUpdate({ employeeFirstName: req.body.employeeName},
                    { projectId: getProjectData.projectId }, { new: true });

                return res.send({ message: "Project Alloted Succesfully !"  , data :findEmp })
            }else{
                return res.send({ message: "This Project Does not Exists !" })

            }


        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });

    }



}
module.exports = { createEmployee, getAllEmployee, getEmployeeDeatils, assignProject }