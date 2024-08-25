const bcrypt = require('bcrypt');
const sql = require('../config/db');
 
 
const os = require('os');
// end
 


// for master gender api 
const getGender = async(req, res)=>{
  try {
      const pool = await sql.connect();
      const request = pool.request()
      const insertQuery = `SELECT * FROM gender;`
      await request.query(insertQuery);
      // Respond with success message
      res.json(records.recordset);
      res.status(200).json({ message: 'Gender details' });

  } catch (error) {
      console.error('Error inserting Gender details: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
  }

}





module.exports = {
  getGender
};
