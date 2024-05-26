// Needed Resources 
const express = require("express")
const utilities = require("../utilities")
const router = new express.Router() 
const invController = require("../controllers/invController");
const regValidate = require('../utilities/inventory-validation')
const { addClassification } = require("../models/inventory-model");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/list/:accountId", invController.buildAccountDetails);

router.post("/addClassification", utilities.handleErrors(invController, addClassification));
router.post("/update", utilities.handleErrors(invController.updateInventory));

router.get("/add-classification", utilities.handleErrors(invController.classificationView));
router.get("/add-inventory", utilities.handleErrors(invController.registerView));

// Process the classification data
router.post(
    "/add-classification",
    regValidate.checkClassificationData,
    utilities.handleErrors(invController.classificationView)
  )
// Process the inventory data
router.post(
  "/add-inventory",
  regValidate.checkInventoryData,
  utilities.handleErrors(invController.registerView)
)

router.get("/management", utilities.handleErrors(invController.buildAccountDetails));

router.post(
    "/management",
    regValidate.checkManagementData,
    utilities.handleErrors(invController.buildAccountDetails)
)

module.exports = router;