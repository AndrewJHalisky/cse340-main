const invModel = require("../models/inventory-model")
const acctModel = require("../models/account-model")
const utilities = require("../utilities/")
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
  let nav = await utilities.getNav()
  let login = accountLogin
  res.render("./inventory/management", {
    title: `Logged into: ${data[0].account_firstname} ${data[0].account_lastname}`,
    nav, login, next
  })
}


invCont.buildClassificationList = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByItemId(classification_id)
  const classificationList = await utilities.buildManagementDetails(data)
  invCont.buildManagementView = async function (req, res, next) {
    let nav = await utilities.getNav()
    const classificationSelect = await utilities.buildClassificationList()
    // ... This is the empty space ...
    res.render("./inventory/management", {
      // ... remaining render code is not shown ...
      title: `${data[0].classification_name}`,
      nav, classificationList, next
    })
  }
}

/* ***************************
 *  Build inventory registration view
 * ************************** */
invCont.registerView = async function (res, next) {
  let nav = await utilities.getNav()
  res.render("/inventory/add-inventory", {
    title: "Add Inventory", 
    nav,
    errors: null,
    next
  })
}

invCont.classificationView = async function (res, next) {
  let nav = await utilities.getNav()
  res.render("/inventory/add-classification", {
    title: "Add Classification", 
    nav,
    errors: null,
    next
  })
}

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Edit inventory registration view
 * ************************** */
invCont.editInventoryView = async function (req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryById(inv_id)
  const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}

/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.updateInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body
  const updateResult = await invModel.updateInventory(
    inv_id,  
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )

  if (updateResult) {
    const itemName = updateResult.inv_make + " " + updateResult.inv_model
    req.flash("notice", `The ${itemName} was successfully updated.`)
    res.redirect("/inv/")
  } else {
    const classificationSelect = await utilities.buildClassificationList(classification_id)
    const itemName = `${inv_make} ${inv_model}`
    req.flash("notice", "Sorry, the insert failed.")
    res.status(501).render("inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
    })
  }
}

module.exports = invCont