// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')

router.get("/register", utilities.handleErrors(accountController.buildRegister))
router.get("/login", utilities.handleErrors(accountController.buildLogin))

// Process the registratizon data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )
// Process the login attempt
router.post(
  "/login",
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin),
  (req, res) => {
    res.status(200).send('login process')
  } // Will use this for the W04 Assignment
  // utilities.handleErrors(accountController.accountLogin),
)

// router.get(
//   "/loggedin",
//   utilities.handleErrors(accountController.buildLoggedIn))

// router.post(
//   "/loggedin",
//   regValidate.checkLoggedInData,
//   utilities.handleErrors(accountController.checkLoggedInData)
// )

router.get(
  "/client-management",
  utilities.handleErrors(accountController.buildClientManagement)
)

router.post(
  "/client-management",
  regValidate.checkClientData,
  utilities.handleErrors(accountController.checkClientData)
)

router.get(
  "/emp-management",
  utilities.handleErrors(accountController.buildEmpManagement)
)

router.post(
  "/emp-management",
  regValidate.checkEmployeeData,
  utilities.handleErrors(accountController.checkEmployeeData)
)

router.get(
  "/edit-account",
  utilities.handleErrors(accountController.buildUpdateAcct)
)

router.post(
  "/edit-account",
  regValidate.checkAcctEditData,
  utilities.handleErrors(accountController.checkAcctEditData)
)

module.exports = router;