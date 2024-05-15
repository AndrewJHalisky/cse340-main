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
    console.error("getInventoryByItemID error " + error)
  }
}

module.exports = {getClassifications,
  getInventoryByClassificationId,
  getInventoryByItemId
}