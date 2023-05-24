const conn = require('../config/db.config')

//get all events in db
exports.getEvents = async () => {
    try {
      const [rows] = await conn.query(`SELECT * FROM events`);
      return rows;
    } catch (error) {
      console.error('Error retrieving events:', error);
    }
};

  //get users events
exports.getUserEvents = async (userId) => {
    try {
        const [rows] = await conn.query(`
        SELECT * FROM events
        WHERE userId = ?
        `, [userId]);
        return rows;
      } catch (error) {
        console.error('Error retrieving events:', error);
      }    
}

//get event by eventId
const getEventById = async (eventId) => {
    try {
        const rows = await conn.query(`
        SELECT * FROM events
        WHERE eventId = ?
        `, [eventId]);
        return rows[0];
      } catch (error) {
        console.error('Error retrieving events:', error);
      }    
}

// create event
exports.createEvent = async (ev) => {
    try {
        const [result] = await conn.query(`
        INSERT INTO events
        (name, category, venue, description, price, totalTickets, start, end, image, userId)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [ev.name, ev.cat, ev.venue, ev.desc, ev.price, ev.totalTickets, ev.start, ev.end, ev.image, ev.userId]);
        return getEventById(result.insertId);
      } catch (error) {
        console.error('Error retrieving events:', error);
      }     
}
