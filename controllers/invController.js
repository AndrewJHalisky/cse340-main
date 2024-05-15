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
  const item_id = req.params.itemId
  const data = await invModel.getInventoryByItemId(item_id)
  const detail = await utilities.buildClassificationDetails(data)
  let nav = await utilities.getNav()
  res.render("./inventory/detail", {
    title: `${data[0].inv_make} ${data[0].inv_model}`,
    nav, detail, next
  })
}

module.exports = invCont