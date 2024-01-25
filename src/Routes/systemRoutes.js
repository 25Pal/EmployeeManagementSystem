const router = require ("express").Router();
const deparmentController = require("../Controller/departmentController");
const projectController = require("../Controller/projectController");
const employeeController = require("../Controller/employeeController");

// ------------------- Department Routes -----------------\\
router.post("/createDepartment",deparmentController.createDepartment);
router.get("/getAllDepartment",deparmentController.getAllDepartment);




// ------------------- Project Routes ----------------------\\

router.post("/createProject",projectController.createProject);
router.get("/getAllProject",projectController.getAllProject);


// ------------------- Employeee Routes --------------------\\
router.post("/createEmployee",employeeController.createEmployee);
router.get("/getAllEmployee",employeeController.getAllEmployee);


//------------------- All Employye Deatails with Search query ------------\\
router.get("/getEmployeeDeatils",employeeController.getEmployeeDeatils);

//------------------- Allot Project To Employee ----------------------------\\
router.put("/assignProject",employeeController.assignProject);

router.post("/uploadFile",projectController.uploadFile );

module.exports=router;