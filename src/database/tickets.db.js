const conn = require('../config/db.config')


/*
* getUserEventTickets - get tickets by a user userid
* userId: id of the user
* Returns: an array of tickets 
*/
exports.getUserEventTickets = async (userId) => {
    try {
        const [rows] = await conn.query(`
        SELECT * FROM tickets AS t
        INNER JOIN events AS e
        ON t.eventId = e.eventId
        WHERE (t.userId = ?)
        `, [userId]);
        return rows;
    } catch (error) {
        console.error('Error retrieving events:', error);
    }    
}


/*
* getTicketById - get tickets by ticketId
* ticketId: id of the a ticket
* Returns: a ticket object 
*/
const getTicketById = async (ticketId) => {
    try {
        const [rows] = await conn.query(`
        SELECT * FROM tickets 
        WHERE ticketId = ?
        `, [ticketId]);
        return rows[0];
      } catch (error) {
        console.error('Error retrieving events:', error);
      }    
}


/*
* createTicket - add ticket to DB
* ticket: an object of the ticket
* Returns: 
*/
exports.createTicket = async (ticket) => {
    try {
        const [result] = await conn.query(`
        INSERT INTO tickets
        (ticketId, eventId, userId)
        VALUES (?, ?, ?)
        `, [ticket.ticketId, ticket.eventId, ticket.userId]);
        // return getTicketById(ticket.ticketId);
      } catch (error) {
        console.error('Error retrieving events:', error);
        return (error)
      }     
}
