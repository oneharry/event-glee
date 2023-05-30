const conn = require('../config/db.config')

//get user by id
exports.getUser = async (userId) => {
    try {
      const [rows] = await conn.query(`
      SELECT * FROM users
      WHERE userId = ?
      `, [userId]);
      return rows[0];
    } catch (error) {
      console.error('Error retrieving events:', error);
    }
};

exports.createUser = async (id, email) => {
    try {
        const [result] = await conn.query(`
        INSERT INTO users
        (userId, email)
        VALUES (?, ?)
        `, [id, email]);
        console.log("User added to DB")
      } catch (error) {
        console.error('Error adding user to DB:', error);
      }     
}