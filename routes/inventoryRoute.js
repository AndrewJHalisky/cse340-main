// Needed Resources 
const express = require("express")
const utilities = require("../utilities")
const router = new express.Router() 
const invController = require("../controllers/invController");
const regValidate = require('../utilities/inventory-validation')
const { addClassification, getInventoryByItemId, getReviewById } = require("../models/inventory-model");
const invCont = require("../controllers/invController");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/list/:accountId", invController.buildAccountDetails);

router.post("/addClassification", utilities.handleErrors(invController, addClassification));
router.post("/update", utilities.handleErrors(invController.updateInventory));

router.get("/detail/:itemId", utilities.handleErrors(invController.buildClassificationDetails));
router.post("/getInventoryByItemId", utilities.handleErrors(invController, getInventoryByItemId));

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

// Process the review data
router.get("/review/:itemId", utilities.handleErrors(invController.buildReviewDetails));
router.post("/getReviewById", utilities.handleErrors(invController, getReviewById));

router.get("/management", utilities.handleErrors(invController.buildAccountDetails));

router.post(
    "/management",
    regValidate.checkManagementData,
    utilities.handleErrors(invController.buildAccountDetails)
)

router.get("/delete/:inv_id", utilities.handleErrors(invController.deleteView))

router.post("/delete", 
    regValidate.checkDeleteData, 
    utilities.handleErrors(invController.deleteItem)
)

module.exports = router;