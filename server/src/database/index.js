const { createEvent, getEvents, getUserEvents, getEventById } = require('./events.db.js');
const { createTicket, getUserEventTickets} = require('./tickets.db.js');
const { createUser, getUser } = require('./users.db.js');

module.exports = {createEvent, getEvents, getUserEvents, getUserEventTickets, createTicket, createUser, getEventById, getUser }