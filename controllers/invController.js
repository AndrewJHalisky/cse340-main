const invModel = require("../models/inventory-model")
const acctModel = require("../models/account-model")
const utilities = require("../utilities/")
const inventory = require("../inventory/")
const { accountLogin } = require("./accountController")

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

invCont.buildAccountDetails = async function(req, res, next){
  const account_id = req.params.accountId
  const data = await acctModel.getInventoryByAccountId(account_id)
  const list = await inventory.buildClassificationList(data)
  let nav = await utilities.getNav()
  res.render("./account/login", {
    title: `Logged into: ${data[0].account_type}`,
    nav, list, next
  })
}

module.exports = invCont