const conn = require('../config/db.config')

//get all events in db
const getEvents = async () => {
    try {
      const [rows] = await conn.query(`SELECT * FROM events`);
      return rows;
    } catch (error) {
      console.error('Error retrieving events:', error);
    }
};

  //get users events
const getUserEvents = async (userId) => {
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
        const [rows] = await conn.query(`
        SELECT * FROM events AS e
        INNER JOIN users AS u
        ON e.userId = u.userId
        WHERE e.eventId = ?
        `, [eventId]);
        return rows[0];
      } catch (error) {
        console.error('Error retrieving events:', error);
      }    
}

// create event
const createEvent = async (ev) => {
    try {
      const {name, category, venue, description, amount, totalTickets, start, end, imageUrl, userId, eventId, organizer} = ev;
        const [result] = await conn.query(`
        INSERT INTO events
        (name, category, venue, description, amount, totalTickets, start, end, imageUrl, userId, eventId, organizer)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [name, category, venue, description, amount, totalTickets, start, end, imageUrl, userId, eventId, organizer]);
        console.log("Event added to DB")
      } catch (error) {
        console.error('Error adding event to DB:', error);
      }     
}

module.exports = {getEventById, getEvents, createEvent, getUserEvents};