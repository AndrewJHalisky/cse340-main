const jwt = require("jsonwebtoken")
require("dotenv").config()
const invModel = require("../models/inventory-model")
const Util = {}
const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}
/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/' + vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$'
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}

/* **************************************
* Build the detail view HTML
* ************************************ */
Util.buildClassificationDetails = async function(data){
  let detail
  if(data.length > 0){
    detail = '<ul id="detail-display">'
    data.forEach(vehicle => { 
      detail += '<div class="vehicleDetails">'
      detail += '<hr />'
      detail += '<p>'
      detail += vehicle.inv_description + ''
      detail += '</p>'
      detail += '<p>'
      detail += 'Color: ' + vehicle.inv_color
      detail += '</p>'
      detail += '<p>'
      detail += 'Miles: <span>'
      + new Intl.NumberFormat('en-US').format(vehicle.inv_miles) + '</span>'
      detail += '</p>'
      detail += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      detail += '</div>'
      detail += '<h1>'
      detail += '<form method="post" href="../../inv/detail/' + vehicle.review_id 
      + '" title="View >'
      detail += 'Write a Review:'
      detail += '</h1>'
      detail += '<label for="desc">'
      detail += 'Description:'
      detail += '</label>'
      detail += '<textarea name="desc" id="revDesc" rows="5" cols="30" placeholder="Write your review here" required>'
      detail += '</textarea>'
      detail += '<input type="submit" name="submit" id="submit" value="Submit">'
      detail += '</form>'
      detail += '<br>'
      detail += '<h2>'
      detail += 'Reviews:'
      detail += '</h2>'
      detail += vehicle.review_id + '<br>'
      detail += vehicle.review_text + '<br>'
      detail += vehicle.review_date + '<br>'
      detail += '<div id="reviewField" style="display: block;">'
      detail += '</div>'
      detail += '<script>'
      detail += 'function displayReview() { var text = document.getElementById("reviewField"); text.style.display = "block" } '
      detail += '</script>'
      console.log(vehicle.review_id);
      console.log(vehicle.review_text);
      console.log(vehicle.review_date);
    })
    detail += '</ul>'
  } else { 
    detail += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return detail
}

Util.buildReviewDetails = async function(data) {
  let reviews
  if (data.length > 0) {
    reviews = '<ul id="review-display">'
    data.forEach(vehicle => {
      reviews += '<div class="review-display">'
      reviews += '<h1>'
      reviews += 'Reviews: '
      reviews += '</h1>'
      reviews += vehicle.review_id + ''
      reviews += vehicle.review_text + ''
      reviews += vehicle.review_date + ''
      reviews += '<div id="reviewField" style="display: none;">'
      reviews += '</div>'
      reviews += '</div>'
  }) 
    reviews += '</ul>'
  } else {
    reviews += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return review
}

// Util.buildReviewDetails = async function(data){
//   let detail = '<ul id="detail-review">'
//   data.forEach(vehicle => {
    
//   })
// }

Util.buildClassificationList = async function (classification_id = null) {
  let data = await invModel.getClassifications()
  let classificationList =
    '<select name="classification_id" id="classificationList" required>'
  classificationList += "<option value=''>Choose a Classification</option>"
  data.rows.forEach((row) => {
    classificationList += '<option value="' + row.classification_id + '"'
    if (
      classification_id != null &&
      row.classification_id == classification_id
    ) {
      classificationList += " selected "
    }
    classificationList += ">" + row.classification_name + "</option>"
  })
  classificationList += "</select>"
  return classificationList
}


/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next)

/* ****************************************
* Middleware to check token validity
**************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
   jwt.verify(
    req.cookies.jwt,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, accountData) {
     if (err) {
      req.flash("Please log in")
      res.clearCookie("jwt")
      return res.redirect("/account/login")
     }
     res.locals.accountData = accountData
     res.locals.loggedin = 1
     next()
    })
  } else {
   next()
  }
 }

/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next()
  } else {
    req.flash("notice", "Please log in.")
    return res.redirect("/account/login")
  }
 }

module.exports = Util