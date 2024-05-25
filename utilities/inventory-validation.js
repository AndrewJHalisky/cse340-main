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
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inventory/add-classification", {
        errors,
        title: "Add New Classification",
        nav,
        classification_name,
      })
      return
    }
    next()
  }
  module.exports = validate