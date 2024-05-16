// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")

router.get("/login", utilities.handleErrors(accountController.buildLogin))

module.exports = router;