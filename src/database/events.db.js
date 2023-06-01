const conn = require('../config/db.config')

/*
* getEvents - Fetches all upcoming events from database whose start date is more than now
* Returns: an array of the events
*/

const getEvents = async () => {
    const dateTime = new Date();
    try {
      const [rows] = await conn.query(`SELECT * FROM events`);
      return rows;
    } catch (error) {
      return (error);
    }
};


/*
* getUsersEvents - Fetches events  from database 
* userId: userId of the events creator
* Returns: an array of the event
*/
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


/*
* getEventById - Fetches event by eventId from database 
* eventId: Id of the event
* Returns: an object of the event
*/
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



/*
* createEvent - create an event
* ev: an object of the insert values
* Returns: an aarya of the events
*/
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