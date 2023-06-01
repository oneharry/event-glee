const conn = require('../config/db.config')


//get eventsttickets by userId
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

// get ticket by ticketid
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


// create tickets
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
      }     
}
