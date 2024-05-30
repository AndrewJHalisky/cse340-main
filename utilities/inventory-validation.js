const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const invModel = require("../models/inventory-model")

/* *****************************
* Registration Data Validation
* ***************************** */
validate.registrationRules = () => {
    return [
        body("classification_name")
            .trim()
            .isLength({min: 1})
            .isAlpha()
            .withMessage("Please provide a classifcation name")
    ]
}

validate.checkClassificationData = async (req, res, next) => {
    const {  } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inventory/add-classification", {
        errors: null,
        title: "Add New Classification",
        nav,
        
      })
      return
    }
    next()
  }

  validate.checkInventoryData = async (req, res, next) => {
    const { inv_make, inv_model, inv_year, inv_price, inv_miles, inv_color } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inventory/add-inventory", {
        errors: null,
        title: "Add New Inventory",
        nav,
        inv_description,
        inv_make,
        inv_model,
        inv_year,
        inv_price,
        inv_miles,
        inv_color
      })
      return
    }
    next()
  }

  validate.checkManagementData = async (req, res, next) => {
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inventory/managment", {
        errors: null,
        title: "Vehicle Management",
        nav
      })
      return
    }
    next()
  }

validate.checkDeleteData = async (req, res, next) => {
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("inventory/delete", {
      errors: null,
      title: "Delete",
      nav
    })
    return
  }
  next()
}


  module.exports = validate