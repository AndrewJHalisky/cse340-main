const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav, grid, next
  })
}

invCont.buildClassificationDetails = async function(req, res, next){
  const classification_det = req.params.classificationDetails
  const data = await invModel.getInventoryByClassificationDetails(classification_det)
  const detail = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const classDetail = data[0].classification_detail
  res.render("/inventory/detail", {
    title: classDetail + "vehicles",
    nav, detail, next
  })
}

module.exports = invCont