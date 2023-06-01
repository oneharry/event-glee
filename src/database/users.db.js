const conn = require('../config/db.config')

/*
* getUser - get a user object from db by ID
* userId: id of the user
* Returns: an object of user
*/
exports.getUser = async (userId) => {
    try {
      const [rows] = await conn.query(`
      SELECT * FROM users
      WHERE userId = ?
      `, [userId]);
      return rows[0];
    } catch (error) {
      console.error('Error retrieving events:', error);
      return (error)
    }
};


/*
* createUser - add user to database
* id: id of the user
* email: emmail address of the user
* Returns: an array of tickets 
*/
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
        return (error);
      }     
}