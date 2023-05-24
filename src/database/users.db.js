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

exports.createUser = async (email) => {
    try {
        const [result] = await conn.query(`
        INSERT INTO users
        (email)
        VALUES (?)
        `, [email]);
        return this.getUser(result.insertId);
      } catch (error) {
        console.error('Error retrieving events:', error);
      }     
}