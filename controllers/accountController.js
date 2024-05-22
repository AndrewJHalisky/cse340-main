const utilities = require("../utilities")
const bcrypt = require("bcryptjs")

/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
      next
    })
  }

  /* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/register", {
      title: "Register",
      nav,
      errors: null,
      next
    })
  }
  
  module.exports = { buildLogin, buildRegister }

/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
    let nav = await utilities.getNav()
    const { 
      account_firstname, 
      account_lastname, 
      account_email,
      account_password} = req.body
  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }
  
  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )
  
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations, you\'re registered ${account_firstname}. Please log in.`
      )
      res.status(201).render("account/login", {
        title: "Login",
        nav,
      })
    } else {
      req.flash("notice", "Sorry, the registration failed.")
      res.status(501).render("account/register", {
        title: "Registration",
        nav,
      })
    }
  
  }

/* ****************************************
*  Process Login
* *************************************** */

async function accountLogin(req, res){
  let nav = await utilities.getNav()
  const { 
    account_email, 
    account_password} = req.body
  const accountData = await accountModel.getEmail(account_email)
  if (!accountData) {
    req.flash("notice", 'Sorry, that account is invalid. Please make sure you have the correct email')
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email
    })
  return 
  } 
  const regResult = await accountModel.accountLogin(
    account_email,
    account_password
  )
  
    if (regResult) {
      req.flash(
        "notice",
        `Successful! Logging you in...`
      )
      res.status(201).render("inventory/management", {
        title: "Management",
        nav,
      })
    } else {
      req.flash("notice", "Sorry, the email or password was incorrect.")
      res.status(501).render("account/login", {
        title: "Login",
        nav,
      })
    }
}
module.exports = { accountLogin, registerAccount }
