const pool = require("../database/")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
      JOIN public.classification AS c
      ON i.classification_id = c.classification_id
      WHERE i.classification_id = $1`,
      [classification_id]
    )
    return data.rows
  } catch (error) {
    console.error("getInventoryByClassificationId error " + error)
  }
}

async function getInventoryByItemId(item_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory
      WHERE inventory.inv_id = $1`,
      [item_id]
    )
    return data.rows
  } catch (error) {
    console.error("getInventoryByItemId error " + error)
  }
}

async function getReviewById(review_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.reviews AS r
      WHERE r.review_id = $1`
      [review_id]
    )
    return data.rows
  } catch (error) {
    console.error("getReviewById error " + error)
  }
}

// async function getInventoryById(inv_id) {
//   try {
//     const data = await pool.query(
//       `SELECT * FROM public.inventory
//       WHERE inventory.inv_id = $1`,
//       [inv_id]
//     )
//     return data.rows
//   } catch (error) {
//     console.error("getInventoryByItemID error " + error)
//   }
// }

async function getInventoryByAccountId(account_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.account AS a 
      WHERE a.account_id = $1`,
      [account_id]
    )
    return data.rows
  } catch (error) {
    console.error("getInventoryByAccountId error " + error)
  }
}

async function addClassification(account_firstname, account_lastname, account_email, account_password){
  try {
    const data = 
    `INSERT INTO classification
    (account_firstname, account_lastname, account_email, account_password, account_type)
    VALUES
    ($1, $2, $3, $4, 'Client')
    RETURNING *`
    return await pool.query(data, [account_firstname, account_lastname, account_email, account_password])
  } catch (error) {
    console.error("getInventoryByAccountId error " + error)
  } return error.message
}

/* ***************************
 *  Delete Inventory Item
 * ************************** */
async function deleteInventoryItem(inv_id) {
  try {
    const sql = 'DELETE FROM inventory WHERE inv_id = $1'
    const data = await pool.query(sql, [inv_id])
  return data
  } catch (error) {
    new Error("Delete Inventory Error")
  }
}

module.exports = {getClassifications,
  getInventoryByClassificationId,
  getInventoryByItemId,
  getReviewById,
  getInventoryByAccountId,
  addClassification,
  deleteInventoryItem
}