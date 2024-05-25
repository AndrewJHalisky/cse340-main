// Needed Resources 
const express = require("express")
const utilities = require("../utilities")
const router = new express.Router() 
const invController = require("../controllers/invController");
const { addClassification } = require("../models/inventory-model");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
// router.get("/detail/:itemId", invController.buildManagementDetails);
router.get("/list/:accountId", invController.buildAccountDetails);

router.get("/newClassification", utilities.handleErrors(invController.classificationView));
router.get("/newRegister", utilities.handleErrors(invController.registerView));

router.post("/addClassification", utilities.handleErrors(invController, addClassification))
router.post("/update/", invController.updateInventory)
module.exports = router;